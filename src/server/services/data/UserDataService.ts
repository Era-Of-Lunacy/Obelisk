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
	private dirtyFlags: Set<number> = new Set();
	private remoteFunctions = GlobalDataFunctions.createServer({});

	constructor() {
		this.supabase = new SupabaseClient<Database>(
			`https://${$env.string("PROJECT_ID")}.supabase.co`,
			HttpService.GetSecret("SUPABASE_ANON_KEY"),
		);
	}

	private async loadData(player: Player): Promise<void> {
		const cache = this.cachedUserData.get(player.UserId);

		// Skip if cache is in saving
		if (cache?.status === "clearing") return;

		// Wait for cache to be ready
		if (cache) {
			while (cache?.status !== "ready") {
				task.wait();
			}
		}

		// Set cache status to loading
		this.cachedUserData.set(player.UserId, {
			status: "loading",
			data: undefined,
		});

		// Upsert data
		Promise.retryWithDelay(
			() =>
				this.supabase
					.from("users")
					.upsert({ id: player.UserId, is_playing: true }, { returning: "representation" })
					.single()
					.andThen((resolve) => {
						if (resolve.error) return Promise.reject(resolve.error.message);

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
				print("An error occurred while loading user data: ", err);
				player.Kick("Failed to load user data");
			});
	}

	private async saveData(player: Player): Promise<void> {
		const cache = this.cachedUserData.get(player.UserId);

		// Skip if cache is in clearing or doesn't exist
		if (!cache || cache.status === "clearing") return;

		// Skip if no dirty flags
		if (!this.dirtyFlags.has(player.UserId)) {
			print("No dirty flags for player skipping save: ", player.UserId);
			return;
		}

		// Wait for cache to be ready
		while (cache.status !== "ready") {
			task.wait();
		}

		cache.status = "saving";

		// Save data
		Promise.retryWithDelay(
			() =>
				this.supabase
					.from("users")
					.update({ ...cache.data, is_playing: false })
					.eq("id", player.UserId)
					.execute()
					.andThen((response) => {
						if (response.error) return Promise.reject(response.error.message);
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
				cache.status = "ready";
			});
	}

	private async clearData(player: Player): Promise<void> {
		const cache = this.cachedUserData.get(player.UserId);
		if (!cache) return;

		// Wait for cache to be ready
		while (cache.status !== "ready") {
			task.wait();
		}

		cache.status = "clearing";
		this.cachedUserData.delete(player.UserId);
		this.dirtyFlags.delete(player.UserId);
	}

	private async saveAllData(): Promise<void> {
		const savePromises: Promise<void>[] = [];

		for (const [userId] of this.cachedUserData) {
			const player = Players.GetPlayerByUserId(userId);

			if (player) {
				savePromises.push(this.saveData(player));
			}
		}

		await Promise.all(savePromises);
	}

	private async clearAllData(): Promise<void> {
		const clearPromises: Promise<void>[] = [];

		for (const [userId] of this.cachedUserData) {
			const player = Players.GetPlayerByUserId(userId);

			if (player) {
				clearPromises.push(this.clearData(player));
			}
		}

		await Promise.all(clearPromises);
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

		// Mark as dirty
		this.dirtyFlags.add(player.UserId);

		return true;
	}

	onStart(): void {
		Players.PlayerAdded.Connect(async (player) => {
			const isUserValid = await this.checkUserValid(player);

			if (!isUserValid) return;

			await this.loadData(player);
		});

		Players.PlayerRemoving.Connect(async (player) => {
			await this.saveData(player);
			await this.clearData(player);
		});

		game.BindToClose(() => {
			this.saveAllData().then(() => {
				this.clearAllData();
			});
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
	}
}
