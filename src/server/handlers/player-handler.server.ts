import { Players } from "@rbxts/services";
import { upsertUser } from "server/database/users";
import { Class } from "shared/types/users";

Players.PlayerAdded.Connect((player) => {
	upsertUser(player, {
		id: player.UserId,
		owned_classes: [Class.None],
	})
		.andThen(() => {
			print("User created for: " + player.UserId);
		})
		.catch(() => {
			print("Failed to create user for: " + player.UserId);
		});
});
