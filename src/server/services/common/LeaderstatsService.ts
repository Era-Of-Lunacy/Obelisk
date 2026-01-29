import { OnStart, Service } from "@flamework/core";
import { Players } from "@rbxts/services";

@Service()
export default class LeaderstatsService implements OnStart {
	private leaderstats: Map<Player, Folder> = new Map();

	onStart(): void {
		Players.PlayerAdded.Connect((player) => {
			this.initializeLeaderstats(player);
		});

		Players.PlayerRemoving.Connect((player) => {
			this.clearLeaderstats(player);
		});
	}

	private initializeLeaderstats(player: Player): void {
		print("Initializing leaderstats for", player.Name);

		const folder = new Instance("Folder");
		folder.Name = "leaderstats";
		folder.Parent = player;

		this.leaderstats.set(player, folder);
	}

	private clearLeaderstats(player: Player): void {
		if (!this.leaderstats.has(player)) return;

		print("Clearing leaderstats for", player.Name);

		this.leaderstats.delete(player);
	}

	registerValue(player: Player, name: string, value: ValueBase): void {
		if (!this.leaderstats.has(player)) return;
		value.Name = name;
		value.Parent = this.leaderstats.get(player)!;
	}
}
