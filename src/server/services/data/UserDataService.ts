import { OnStart, Service } from "@flamework/core";
import { SupabaseClient } from "@rbxts/roblox-supabase";
import { HttpService, Players } from "@rbxts/services";
import { $env } from "rbxts-transform-env";
import { DataCache } from "server/types/data";
import { GlobalDataFunctions } from "shared/networking/Data";
import { Database } from "shared/types/database.types";

export type User = Database["public"]["Tables"]["users"]["Row"];
export type UserUpdate = Database["public"]["Tables"]["users"]["Update"];

const SAVE_INTERVAL = 60;
const RETRY_COUNT = 10;
const RETRY_DELAY = 0.1;

@Service()
export default class UserDataService implements OnStart {
	private supabase: SupabaseClient<Database>;
	private cachedUserData: Map<number, DataCache<User>> = new Map();
	private remoteFunctions = GlobalDataFunctions.createServer({});

	constructor() {
		this.supabase = new SupabaseClient<Database>(
			`https://${$env.string("PROJECT_ID")}.supabase.co`,
			HttpService.GetSecret("SUPABASE_ANON_KEY"),
		);
	}

	private loadData(player: Player): void {
		let cache = this.cachedUserData.get(player.UserId);

		// Skip if cache is in saving
		if (cache?.status === "saving") return;

		task.spawn(() => {
			// Wait for other process to finish loading
			// We can loop though cache is not exist
			while (cache?.status === "loading") {
				task.wait();
			}

			// Set cache status to loading
			if (cache) {
				cache.status = "loading";
			} else {
				this.cachedUserData.set(player.UserId, {
					status: "loading",
					data: undefined,
				});

				cache = this.cachedUserData.get(player.UserId);
			}

			// Upsert data
			Promise.retryWithDelay(
				() =>
					this.supabase
						.from("users")
						.upsert({ id: player.UserId, is_playing: true }, { returning: "representation" })
						.single()
						.andThen((resolve) => {
							if (resolve.error) return Promise.reject(resolve.error);

							this.cachedUserData.set(player.UserId, {
								status: "ready",
								data: resolve.data,
							});
						}),
				RETRY_COUNT,
				RETRY_DELAY,
			)
				.andThen(() => {
					print("Loaded user data for player: ", player.UserId);
				})
				.catch((err) => {
					this.cachedUserData.get(player.UserId)!.status = "error";

					print("An error occurred while loading user data: ", err);
					player.Kick("Failed to load user data");
				});
		});
	}

	private saveData(player: Player): void {
		const cache = this.cachedUserData.get(player.UserId);

		// Skip if cache is already in saving or doesn't exist
		if (!cache || cache.status === "saving") return;

		task.spawn(() => {
			// Wait for cache to be loaded
			while (cache.status === "loading") {
				task.wait();
			}

			// Set cache status to saving
			cache.status = "saving";

			// Don't have to save data if it doesn't exist
			if (cache.data === undefined) {
				this.cachedUserData.delete(player.UserId);
				return;
			}

			// Save data
			Promise.retryWithDelay(
				() =>
					this.supabase
						.from("users")
						// We've already checked if cache.data exists in line 84
						// And cache.data cannot be undefined due to "loading" flag
						.update({ ...cache.data!, is_playing: false })
						.eq("id", player.UserId)
						.execute()
						.andThen((response) => {
							if (response.error) return Promise.reject(response.error);
						}),
				RETRY_COUNT,
				RETRY_DELAY,
			)
				.andThen(() => {
					print("Saved user data for player: ", player.UserId);
				})
				.catch((err) => {
					print("Error occurred while saving user data: ", err);
				})
				.finally(() => {
					// Clear cache
					// WARN | This will cause data loss if player is not saved
					this.cachedUserData.delete(player.UserId);
				});
		});
	}

	private saveAllData() {
		for (const [userId] of this.cachedUserData) {
			const player = Players.GetPlayerByUserId(userId);

			if (player) {
				this.saveData(player);
			}
		}
	}

	private async checkUserValid(player: Player): Promise<boolean> {
		const response = await this.supabase
			.from("users")
			.select(["is_playing", "deleted_at"])
			.eq("id", player.UserId)
			.maybeSingle();

		if (response.data?.is_playing === true || response.data?.deleted_at !== undefined) return false;

		return true;
	}

	getData(player: Player): User | undefined {
		return this.cachedUserData.get(player.UserId)?.data;
	}

	updateData(player: Player, data: UserUpdate): boolean {
		const cache = this.cachedUserData.get(player.UserId);

		if (cache === undefined || cache.data === undefined || cache.status !== "ready") return false;

		cache.data = {
			...cache.data,
			...data,
		};

		return true;
	}

	onStart(): void {
		Players.PlayerAdded.Connect(async (player) => {
			if (!(await this.checkUserValid(player))) return;

			this.loadData(player);
		});

		Players.PlayerRemoving.Connect((player) => {
			this.saveData(player);
		});

		this.remoteFunctions.getUserData.setCallback((player) => {
			return this.getData(player);
		});

		task.spawn(() => {
			while (true) {
				task.wait(SAVE_INTERVAL);

				this.saveAllData();
			}
		});

		game.BindToClose(() => {
			this.saveAllData();

			while (this.cachedUserData.size() > 0) {
				task.wait();
			}
		});
	}
}
