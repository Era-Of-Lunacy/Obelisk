import { Controller, OnRender, OnStart } from "@flamework/core";
import { UserInputService, Workspace } from "@rbxts/services";

const WALK_SPEED = 16;
const SPRINT_SPEED = 32;
const WALK_FIELD_OF_VIEW = 70;
const SPRINT_FIELD_OF_VIEW = 90;
const FIELD_OF_VIEW_SPEED = 120;

@Controller()
export default class SprintController implements OnStart, OnRender {
	private currentHumanoid: Humanoid | undefined;
	private sprinting = false;
	private camera = Workspace.CurrentCamera;

	onStart(): void {
		UserInputService.InputBegan.Connect((input) => {
			if (!this.currentHumanoid) return;

			if (input.KeyCode === Enum.KeyCode.LeftShift) {
				this.sprinting = true;
				this.currentHumanoid.WalkSpeed = SPRINT_SPEED;
			}
		});

		UserInputService.InputEnded.Connect((input) => {
			if (!this.currentHumanoid) return;

			if (input.KeyCode === Enum.KeyCode.LeftShift) {
				this.sprinting = false;
				this.currentHumanoid.WalkSpeed = WALK_SPEED;
			}
		});
	}

	onRender(dt: number): void {
		if (!this.camera) return;

		if (this.sprinting) {
			this.camera.FieldOfView = math.clamp(
				this.camera.FieldOfView + dt * FIELD_OF_VIEW_SPEED,
				WALK_FIELD_OF_VIEW,
				SPRINT_FIELD_OF_VIEW,
			);
		} else {
			this.camera.FieldOfView = math.clamp(
				this.camera.FieldOfView + dt * -FIELD_OF_VIEW_SPEED,
				WALK_FIELD_OF_VIEW,
				SPRINT_FIELD_OF_VIEW,
			);
		}
	}
}
