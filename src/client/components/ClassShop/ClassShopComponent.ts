import { BaseComponent, Component } from "@flamework/components";
import { OnStart, OnTick } from "@flamework/core";
import { Root, createRoot } from "@rbxts/react-roblox";
import { Players, Workspace } from "@rbxts/services";
import React from "@rbxts/react";
import { ClassShop } from "./class-shop";

@Component({
	tag: "ClassShop",
})
export default class ClassShopComponent extends BaseComponent<undefined, BasePart> implements OnStart, OnTick {
	private overlapParams: OverlapParams;
	private root: Root | undefined;
	private shopAttached = false;

	constructor() {
		super();
		this.overlapParams = new OverlapParams();
		this.overlapParams.FilterType = Enum.RaycastFilterType.Include;
	}

	onStart(): void {
		Players.LocalPlayer.CharacterAdded.Connect((character) => {
			const humanoidRootPart = character.WaitForChild("HumanoidRootPart");

			if (humanoidRootPart.IsA("BasePart")) this.overlapParams.AddToFilter(humanoidRootPart);
		});

		const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui");
		this.root = createRoot(playerGui);
	}

	onTick(): void {
		const parts = Workspace.GetPartsInPart(this.instance, this.overlapParams);

		if (parts.size() > 0) {
			if (!this.shopAttached && this.root) {
				this.root.render(React.createElement(ClassShop));
				this.shopAttached = true;
			}
		} else {
			if (this.shopAttached && this.root) {
				this.root.render(undefined);
				this.shopAttached = false;
			}
		}
	}
}
