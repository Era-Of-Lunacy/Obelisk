import { Players } from "@rbxts/services";
import { getUser, userUpdatedEvent } from "server/database/users";
import { Class } from "shared/types/classes";

const leaderstats = new Map<Player, Instance[]>();

Players.PlayerAdded.Connect((player) => {
	const Leaderstats = new Instance("Folder");
	Leaderstats.Name = "leaderstats";
	Leaderstats.Parent = player;

	const bwambles = new Instance("IntValue");
	bwambles.Name = "Bwambles";
	bwambles.Parent = Leaderstats;

	const classType = new Instance("StringValue");
	classType.Name = "Class";
	classType.Parent = Leaderstats;

	getUser(player)
		.andThen((user) => {
			if (user.data?.[0]) {
				bwambles.Value = user.data[0].bwambles;
				classType.Value = user.data[0].class;
			} else {
				bwambles.Value = 0;
				classType.Value = Class.None;
			}
		})
		.catch(() => {
			print("Failed to get user data for: " + player.UserId);
			bwambles.Value = 0;
		});

	leaderstats.set(player, [bwambles, classType]);
});

userUpdatedEvent.Connect((data) => {
	if (data.id !== undefined && data.id !== 0) {
		const player = Players.GetPlayerByUserId(data.id);
		if (player) {
			const bwambles = leaderstats.get(player)?.[0] as IntValue;
			const classType = leaderstats.get(player)?.[1] as StringValue;

			if (bwambles) {
				bwambles.Value = data.bwambles ?? 0;
			}
			if (classType) {
				classType.Value = data.class ?? Class.None;
			}
		}
	}
});
