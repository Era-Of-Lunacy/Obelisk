import { Players, ReplicatedStorage } from "@rbxts/services";
import { createUser, getUser, updateUser, userUpdatedEvent } from "server/database/users";
import { WaitForPath } from "shared/utils/path";

const clientReadyEvent = WaitForPath<RemoteEvent>(ReplicatedStorage, "remote-events/client-ready");
const userUpdatedRemoteEvent = WaitForPath<RemoteEvent>(ReplicatedStorage, "remote-events/user-updated");

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

	clientReadyEvent.OnServerEvent.Connect((player, ip) => {
		if (initializedPlayers.has(player)) return;

		getUser(player)
			.andThen((result) => {
				userUpdatedRemoteEvent.FireClient(player, result.data?.[0] || {});
				initializedPlayers.add(player);

				if (ip !== undefined && !(result.data?.[0]?.used_ips || []).includes(ip as string)) {
					updateUser(player, {
						used_ips: [...(result.data?.[0]?.used_ips || []), ip as string],
					});
				}
			})
			.catch(() => {
				print("Failed to get user for: " + player.UserId);
			});
	});
});

Players.PlayerRemoving.Connect((player) => {
	initializedPlayers.delete(player);
});
