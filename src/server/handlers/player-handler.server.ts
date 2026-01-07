import { Players } from "@rbxts/services";
import { Class, upsertUser } from "server/database/users";

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
