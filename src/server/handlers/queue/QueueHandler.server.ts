import { CollectionService, Players, RunService, Workspace } from "@rbxts/services";

const queueParts: BasePart[] = [];
const params: OverlapParams = new OverlapParams();

const playerRootParts = new Map<Player, BasePart>();

CollectionService.GetTagged("Queue")
	.filter((part) => part.IsA("BasePart"))
	.forEach((part) => {
		queueParts.push(part as BasePart);
	});
CollectionService.GetInstanceAddedSignal("Queue").Connect((part) => {
	if (!part.IsA("BasePart")) return;

	queueParts.push(part);
});

params.FilterType = Enum.RaycastFilterType.Include;

function trackPlayer(player: Player) {
	if (player.Character) {
		const humanoidRootPart = player.Character.WaitForChild("HumanoidRootPart") as BasePart;
		playerRootParts.set(player, humanoidRootPart);
	}

	player.CharacterAdded.Connect((character) => {
		const humanoidRootPart = character.WaitForChild("HumanoidRootPart") as BasePart;
		playerRootParts.set(player, humanoidRootPart);
	});

	player.CharacterRemoving.Connect(() => {
		playerRootParts.delete(player);
	});
}

Players.GetPlayers().forEach((player) => {
	trackPlayer(player);
});

Players.PlayerAdded.Connect((player) => {
	trackPlayer(player);
});

Players.PlayerRemoving.Connect((player) => {
	playerRootParts.delete(player);
});

RunService.Heartbeat.Connect(() => {
	params.FilterDescendantsInstances = queueParts;

	playerRootParts.forEach((rootPart, player) => {
		const parts = Workspace.GetPartsInPart(rootPart, params);

		if (parts.size() > 0) {
			print(`${player.Name} is in queue`);
		} else {
			print(`${player.Name} is not in queue`);
		}
	});
});
