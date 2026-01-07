import Roact from "@rbxts/roact";
import { Players, RunService, Workspace } from "@rbxts/services";
import ClassShop from "client/components/class-shop";
import { WaitForPath } from "shared/utils/path";

const SHOP_PART_PATH = "Lobby/Details/ShopPart";

let detectConnection: RBXScriptConnection | undefined;

Players.LocalPlayer.CharacterAdded.Connect((character) => {
	const humanoidRootPart = character.FindFirstChild("HumanoidRootPart") as BasePart;

	const params = new OverlapParams();
	params.FilterType = Enum.RaycastFilterType.Include;
	params.FilterDescendantsInstances = [humanoidRootPart];

	let tree: Roact.Tree | undefined;

	if (detectConnection) {
		detectConnection.Disconnect();
		detectConnection = undefined;
	}

	detectConnection = RunService.Heartbeat.Connect(() => {
		const parts = Workspace.GetPartsInPart(WaitForPath<Part>(Workspace, SHOP_PART_PATH), params);

		if (parts.size() > 0) {
			if (!tree) {
				tree = Roact.mount(
					Roact.createElement(ClassShop),
					game.GetService("Players").LocalPlayer.WaitForChild("PlayerGui") as Instance,
				);
			}
		} else {
			if (tree) {
				Roact.unmount(tree);
				tree = undefined;
			}
		}
	});
});
