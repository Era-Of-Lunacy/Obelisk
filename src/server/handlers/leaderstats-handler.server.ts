import { Players } from "@rbxts/services";
import { getUser, userUpdatedEvent } from "server/database/users";

const leaderstats = new Map<Player, Instance[]>();

Players.PlayerAdded.Connect((player) => {
	const Leaderstats = new Instance("Folder");
	Leaderstats.Name = "leaderstats";
	Leaderstats.Parent = player;

	const bwambles = new Instance("IntValue");
	bwambles.Name = "Bwambles";
	bwambles.Parent = Leaderstats;
	getUser(player)
		.andThen((user) => {
			if (user.data?.[0]) {
				bwambles.Value = user.data[0].bwambles;
			}
		})
		.catch(() => {
			print("Failed to get user data for: " + player.UserId);
			bwambles.Value = 0;
		});

	leaderstats.set(player, [bwambles]);
});

userUpdatedEvent.Connect((data) => {
	if (data.id !== undefined && data.id !== 0) {
		const player = Players.GetPlayerByUserId(data.id);
		if (player) {
			const bwambles = leaderstats.get(player)?.[0] as IntValue;

			if (bwambles) {
				bwambles.Value = data.bwambles ?? 0;
			}
		}
	}
});
