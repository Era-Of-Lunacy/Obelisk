import { Players, RunService, Workspace } from "@rbxts/services";
import React from "@rbxts/react";
import { createRoot, createPortal } from "@rbxts/react-roblox";
import { ClassShop } from "client/components/class-shop";
import { WaitForPath } from "shared/utils/path";

const SHOP_PART_PATH = "Lobby/Details/ShopPart";

let shopMounted = false;
let root: ReturnType<typeof createRoot> | undefined;

function handleShop(character: Model) {
	const humanoidRootPart = character.WaitForChild("HumanoidRootPart") as BasePart;

	const params = new OverlapParams();
	params.FilterType = Enum.RaycastFilterType.Include;
	params.FilterDescendantsInstances = [humanoidRootPart];

	RunService.Heartbeat.Connect(() => {
		const parts = Workspace.GetPartsInPart(WaitForPath<Part>(Workspace, SHOP_PART_PATH), params);

		if (parts.size() > 0) {
			if (!shopMounted) {
				const container = new Instance("Folder");
				container.Name = "ClassShopContainer";
				const playerGui = Players.LocalPlayer.FindFirstChildOfClass("PlayerGui");
				if (playerGui) {
					root = createRoot(container);
					root.render(createPortal(React.createElement(ClassShop), playerGui));
					shopMounted = true;
				}
			}
		} else {
			if (shopMounted && root) {
				root.unmount();
				root = undefined;
				shopMounted = false;
			}
		}
	});
}

if (Players.LocalPlayer.Character) handleShop(Players.LocalPlayer.Character);
Players.LocalPlayer.CharacterAdded.Connect((character) => handleShop(character));
