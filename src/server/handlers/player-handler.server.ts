import { Players } from "@rbxts/services";
import { upsertUser } from "server/handlers/data/user-handler";

Players.PlayerAdded.Connect((player) => {
	upsertUser({
		id: player.UserId,
	});
});
