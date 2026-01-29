import { BaseComponent, Component } from "@flamework/components";
import { OnStart, OnTick } from "@flamework/core";
import { Players, Workspace } from "@rbxts/services";

@Component({
	tag: "Queue",
})
export default class QueueComponent extends BaseComponent<undefined, BasePart> implements OnStart, OnTick {
	private overlapParams: OverlapParams;

	constructor() {
		super();
		this.overlapParams = new OverlapParams();
		this.overlapParams.FilterType = Enum.RaycastFilterType.Include;
	}

	onStart(): void {
		Players.PlayerAdded.Connect((player) => {
			player.CharacterAdded.Connect((character) => {
				const humanoidRootPart = character.WaitForChild("HumanoidRootPart");

				if (humanoidRootPart.IsA("BasePart")) this.overlapParams.AddToFilter(humanoidRootPart);
			});
		});
	}

	onTick(): void {
		const parts = Workspace.GetPartsInPart(this.instance, this.overlapParams);

		// TODO: Process the parts that are in the queue
	}
}
