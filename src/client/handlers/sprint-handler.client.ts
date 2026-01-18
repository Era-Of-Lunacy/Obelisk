import { Players, RunService, UserInputService, Workspace } from "@rbxts/services";

const camera = Workspace.CurrentCamera;

Players.LocalPlayer.CharacterAdded.Connect((character) => {
	const humanoid = character.WaitForChild("Humanoid") as Humanoid;
	let sprinting = false;

	UserInputService.InputBegan.Connect((input) => {
		if (input.KeyCode === Enum.KeyCode.LeftShift) {
			humanoid.WalkSpeed = 32;
			sprinting = true;
		}
	});

	UserInputService.InputEnded.Connect((input) => {
		if (input.KeyCode === Enum.KeyCode.LeftShift) {
			humanoid.WalkSpeed = 16;
			sprinting = false;
		}
	});

	RunService.RenderStepped.Connect((deltaTime) => {
		if (sprinting) {
			if (camera) camera.FieldOfView = math.clamp(camera.FieldOfView + deltaTime * 80, 70, 90);
		} else {
			if (camera) camera.FieldOfView = math.clamp(camera.FieldOfView + deltaTime * -80, 70, 90);
		}
	});
});
