import { SupabaseClient } from "@rbxts/roblox-postgrest";
import { Players } from "@rbxts/services";
import { $env } from "rbxts-transform-env";
import { Users } from "shared/types/users";
import { cachedUsers, userUpdatedEvent } from "./user-data";
import { DatabaseEvents } from "server/types/database";

const client = new SupabaseClient(
	`https://${$env.string("PROJECT_ID")}.supabase.co`,
	$env.string("SECRET_API_KEY", ""),
);

Players.PlayerAdded.Connect((player) => {
	const result = client.from("users").eq("id", player.UserId).maybeSingle<Users>();

	if (result.success === true) {
		if (result.data !== undefined) {
			if (result.data.is_playing === true) {
				player.Kick("User is already playing");
				return;
			}

			if (result.data.deleted_at === undefined || result.data.deleted_at === "") {
				cachedUsers[player.UserId] = result.data;
				userUpdatedEvent.Fire(DatabaseEvents.Created, player.UserId, result.data);

				if (client.from("users").eq("id", player.UserId).update({ is_playing: true }).success === false) {
					player.Kick("Failed to update user data");
					delete cachedUsers[player.UserId];
					userUpdatedEvent.Fire(DatabaseEvents.Deleted, player.UserId, result.data);
					return;
				}
			} else {
				player.Kick("User is deleted");
				return;
			}
		} else {
			print("User not found Creating...");

			const insertResult = client.from("users").insert<Users[]>({ id: player.UserId, is_playing: true });

			if (insertResult.success === true && insertResult.data?.[0]) {
				print("User created successfully");
				cachedUsers[player.UserId] = insertResult.data[0];
				userUpdatedEvent.Fire(DatabaseEvents.Created, player.UserId, insertResult.data[0]);
				return;
			} else {
				player.Kick("Failed to create user");
				return;
			}
		}
	}
});

Players.PlayerRemoving.Connect((player) => {
	if (cachedUsers[player.UserId]) {
		cachedUsers[player.UserId].is_playing = false;

		if (
			client
				.from("users")
				.eq("id", player.UserId)
				.update({ ...cachedUsers[player.UserId] }).success === false
		) {
			print("Failed to update user data");
		}

		delete cachedUsers[player.UserId];
		userUpdatedEvent.Fire(DatabaseEvents.Deleted, player.UserId, cachedUsers[player.UserId]);
	}
});
