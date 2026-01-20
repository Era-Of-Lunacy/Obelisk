import { DatabaseEvents } from "shared/types/database";
import { userUpdatedEvent } from "server/handlers/data/users/user-data";
import { User } from "shared/types/users";
import { Players } from "@rbxts/services";

const playerLeaderstats = new Map<Player, [IntValue, StringValue]>();

function createLeaderstats(player: Player) {
	const Leaderstats = new Instance("Folder");
	Leaderstats.Name = "leaderstats";
	Leaderstats.Parent = player;

	const bwambles = new Instance("IntValue");
	bwambles.Name = "Bwambles";
	bwambles.Parent = Leaderstats;

	const classType = new Instance("StringValue");
	classType.Name = "Class";
	classType.Parent = Leaderstats;

	playerLeaderstats.set(player, [bwambles, classType]);
}

function updateLeaderstats(player: Player, data: User) {
	if (playerLeaderstats.has(player)) {
		const leaderstats = playerLeaderstats.get(player)!;
		leaderstats[0].Value = data.bwambles;
		leaderstats[1].Value = data.class;
	}
}

userUpdatedEvent.Connect((event, data) => {
	if (event === DatabaseEvents.Created) {
		const player = Players.GetPlayerByUserId(data.id);
		if (!player) return;
		createLeaderstats(player);
		updateLeaderstats(player, data);
	} else if (event === DatabaseEvents.Updated) {
		const player = Players.GetPlayerByUserId(data.id);
		if (!player) return;
		updateLeaderstats(player, data);
	}
});
