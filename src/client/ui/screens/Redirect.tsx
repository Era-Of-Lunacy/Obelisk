import React from "@rbxts/react";

export default function Redirect() {
	return (
		<screengui ResetOnSpawn={false} IgnoreGuiInset={true}>
			<frame
				AnchorPoint={new Vector2(0.5, 0.5)}
				Size={new UDim2(1, 0, 1, 0)}
				Position={new UDim2(0.5, 0, 0.5, 0)}
			>
				<textlabel
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={new UDim2(0.5, 0, 0.5, 0)}
					Font={Enum.Font.Cartoon}
					Text="The current server is down.\nWe will be redirecting you to another place."
				></textlabel>
			</frame>
		</screengui>
	);
}
