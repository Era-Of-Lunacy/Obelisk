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

	setValue(player: Player, name: string, value: unknown): void {
		if (!this.leaderstats.has(player)) return;

		const leaderstatsFolder = this.leaderstats.get(player)!;
		const stat = leaderstatsFolder.FindFirstChild(name) as ValueBase;

		if (!stat) {
			warn(`Stat '${name}' does not exist for ${player.Name}`);
			return;
		}

		if (stat.IsA("StringValue") && typeOf(value) === "string") {
			(stat as StringValue).Value = value as string;
		} else if (stat.IsA("NumberValue") && typeOf(value) === "number") {
			(stat as NumberValue).Value = value as number;
		} else if (stat.IsA("BoolValue") && typeOf(value) === "boolean") {
			(stat as BoolValue).Value = value as boolean;
		} else if (stat.IsA("IntValue") && typeOf(value) === "number") {
			(stat as IntValue).Value = math.floor(value as number);
		} else {
			warn(`Cannot set value of type '${typeOf(value)}' to stat '${name}' of type '${stat.ClassName}'`);
		}
	}
}
