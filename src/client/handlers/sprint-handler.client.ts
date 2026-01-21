import { Players, RunService, UserInputService, Workspace } from "@rbxts/services";

const BASE_SPEED = 16;
const SPRINT_SPEED = 32;
const BASE_FIELD_OF_VIEW = 70;
const MAX_FIELD_OF_VIEW = 90;
const SPRINT_FIELD_OF_VIEW_MULTIPLIER = 120;

const camera = Workspace.CurrentCamera;

function handleSprint(character: Model) {
	const humanoid = character.WaitForChild("Humanoid") as Humanoid;
	let sprinting = false;

	UserInputService.InputBegan.Connect((input) => {
		if (input.KeyCode === Enum.KeyCode.LeftShift) {
			humanoid.WalkSpeed = SPRINT_SPEED;
			sprinting = true;
		}
	});

	UserInputService.InputEnded.Connect((input) => {
		if (input.KeyCode === Enum.KeyCode.LeftShift) {
			humanoid.WalkSpeed = BASE_SPEED;
			sprinting = false;
		}
	});

	RunService.RenderStepped.Connect((deltaTime) => {
		if (sprinting) {
			if (camera)
				camera.FieldOfView = math.clamp(
					camera.FieldOfView + deltaTime * SPRINT_FIELD_OF_VIEW_MULTIPLIER,
					BASE_FIELD_OF_VIEW,
					MAX_FIELD_OF_VIEW,
				);
		} else {
			if (camera)
				camera.FieldOfView = math.clamp(
					camera.FieldOfView + deltaTime * -SPRINT_FIELD_OF_VIEW_MULTIPLIER,
					BASE_FIELD_OF_VIEW,
					MAX_FIELD_OF_VIEW,
				);
		}
	});
}

if (Players.LocalPlayer.Character) handleSprint(Players.LocalPlayer.Character);
Players.LocalPlayer.CharacterAdded.Connect((character) => handleSprint(character));
