import { Players, RunService, UserInputService, Workspace } from "@rbxts/services";

const camera = Workspace.CurrentCamera;

const WALK_SPEED = 16;
const SPRINT_SPEED = 32;
const WALK_FIELD_OF_VIEW = 70;
const SPRINT_FIELD_OF_VIEW = 90;
const FIELD_OF_VIEW_SPEED = 120;

let currentHumanoid: Humanoid;
let sprinting = false;

if (Players.LocalPlayer.Character) {
	const humanoid = Players.LocalPlayer.Character.WaitForChild("Humanoid") as Humanoid;
	currentHumanoid = humanoid;
}
Players.LocalPlayer.CharacterAdded.Connect((character) => {
	const humanoid = character.WaitForChild("Humanoid") as Humanoid;
	currentHumanoid = humanoid;
});

UserInputService.InputBegan.Connect((input) => {
	if (input.KeyCode === Enum.KeyCode.LeftShift) {
		if (!currentHumanoid) return;

		currentHumanoid.WalkSpeed = SPRINT_SPEED;
		sprinting = true;
	}
});

UserInputService.InputEnded.Connect((input) => {
	if (input.KeyCode === Enum.KeyCode.LeftShift) {
		if (!currentHumanoid) return;

		currentHumanoid.WalkSpeed = WALK_SPEED;
		sprinting = false;
	}
});

RunService.RenderStepped.Connect((deltaTime) => {
	if (sprinting) {
		if (!camera) return;

		camera.FieldOfView = math.clamp(
			camera.FieldOfView + deltaTime * FIELD_OF_VIEW_SPEED,
			WALK_FIELD_OF_VIEW,
			SPRINT_FIELD_OF_VIEW,
		);
	} else {
		if (!camera) return;

		camera.FieldOfView = math.clamp(
			camera.FieldOfView + deltaTime * -FIELD_OF_VIEW_SPEED,
			WALK_FIELD_OF_VIEW,
			SPRINT_FIELD_OF_VIEW,
		);
	}
});
