import React from "@rbxts/react";

export default function CustomSection() {
	return (
		<frame
			key="content-custom"
			Size={new UDim2(1, 0, 1, 0)}
			Position={new UDim2(0, 0, 0, 0)}
			BackgroundTransparency={1}
		>
			<textlabel
				Text="Custom Features"
				Size={new UDim2(1, 0, 0, 30)}
				Position={new UDim2(0, 0, 0, 0)}
				TextSize={18}
				Font={Enum.Font.Gotham}
				TextColor3={new Color3(1, 1, 1)}
				TextXAlignment={Enum.TextXAlignment.Left}
				BackgroundTransparency={1}
			/>
		</frame>
	);
}
