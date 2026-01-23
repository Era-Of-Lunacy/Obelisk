import { createElement } from "@rbxts/react";
import { Root, createPortal, createRoot } from "@rbxts/react-roblox";
import { CollectionService, Players, RunService, Workspace } from "@rbxts/services";
import { ClassShop } from "client/components/class-shop";

const shopParts: BasePart[] = [];
const params: OverlapParams = new OverlapParams();

let currentHumanoidRootPart: BasePart;
let root: Root | undefined;

CollectionService.GetTagged("ClassShop")
	.filter((part) => part.IsA("BasePart"))
	.forEach((part) => {
		shopParts.push(part as BasePart);
	});
CollectionService.GetInstanceAddedSignal("ClassShop").Connect((part) => {
	if (!part.IsA("BasePart")) return;

	shopParts.push(part);
});

params.FilterType = Enum.RaycastFilterType.Include;

if (Players.LocalPlayer.Character) {
	const humanoidRootPart = Players.LocalPlayer.Character.WaitForChild("HumanoidRootPart") as BasePart;
	currentHumanoidRootPart = humanoidRootPart;
}
Players.LocalPlayer.CharacterAdded.Connect((character) => {
	const humanoidRootPart = character.WaitForChild("HumanoidRootPart") as BasePart;
	currentHumanoidRootPart = humanoidRootPart;
});

// Maybe I need to refactor this code by using Touched Event IDK
RunService.Heartbeat.Connect(() => {
	if (!currentHumanoidRootPart) return;

	// Keep updating FUCKING FILTER DESCENDANTS INSTANCES EVERY TIME BECAUSE OF SUCK READONLY TABLE
	// THOUGH I PUT NON-READONLY TABLE TO FilterDescendantsInstances IT COPIES TABLE AND MAKE IT READONLY
	params.FilterDescendantsInstances = shopParts;

	const parts = Workspace.GetPartsInPart(currentHumanoidRootPart, params);

	if (parts.size() > 0) {
		if (!root) {
			root = createRoot(new Instance("Folder"));
			root.render(
				createPortal(createElement(ClassShop), Players.LocalPlayer.FindFirstChildOfClass("PlayerGui")!),
			);
		}
	} else {
		if (root) {
			root.unmount();
			root = undefined;
		}
	}
});
