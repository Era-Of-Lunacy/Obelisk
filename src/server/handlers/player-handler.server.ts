import { Players, ReplicatedStorage } from "@rbxts/services";
import { createUser, getUser, userUpdatedEvent } from "server/database/users";
import { Users } from "shared/types/users";
import { WaitForPath } from "shared/utils/path";

const clientReadyEvent = WaitForPath(ReplicatedStorage, "remote-events/client-ready") as RemoteEvent;
const userUpdatedRemoteEvent = WaitForPath(ReplicatedStorage, "remote-events/user-updated") as RemoteEvent<
	(data: Partial<Users>) => void
>;

const initializedPlayers = new Set<Player>();

Players.PlayerAdded.Connect((player) => {
	getUser(player)
		.andThen((result) => {
			if (result.data && result.data.size() > 0) {
				print("User already exists for: " + player.UserId);
			} else {
				createUser(player)
					.andThen(() => {
						print("User created for: " + player.UserId);
					})
					.catch(() => {
						print("Failed to create user for: " + player.UserId);
					});
			}
		})
		.catch(() => {
			print("Failed to check user for: " + player.UserId);
		});

	userUpdatedEvent.Connect((data) => {
		if (data.id === undefined || data.id === 0) {
			return;
		}

		const player = Players.GetPlayerByUserId(data.id);
		if (player) {
			userUpdatedRemoteEvent.FireClient(player, data);
		}
	});

	clientReadyEvent.OnServerEvent.Connect((player) => {
		if (initializedPlayers.has(player)) return;

		getUser(player)
			.andThen((result) => {
				userUpdatedRemoteEvent.FireClient(player, result.data?.[0] || {});
				initializedPlayers.add(player);
			})
			.catch(() => {
				print("Failed to get user for: " + player.UserId);
			});
	});
});

Players.PlayerRemoving.Connect((player) => {
	initializedPlayers.delete(player);
});
