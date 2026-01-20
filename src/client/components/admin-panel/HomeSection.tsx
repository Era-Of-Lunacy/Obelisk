import React from "@rbxts/react";

export default function HomeSection() {
	return (
		<frame
			key="content-home"
			Size={new UDim2(1, 0, 1, 0)}
			Position={new UDim2(0, 0, 0, 0)}
			BackgroundTransparency={1}
		>
			<textlabel
				Text="Welcome to the Admin Panel"
				Size={new UDim2(1, 0, 0, 30)}
				Position={new UDim2(0, 0, 0, 0)}
				TextSize={18}
				Font={Enum.Font.Gotham}
				TextColor3={new Color3(1, 1, 1)}
				TextXAlignment={Enum.TextXAlignment.Left}
				BackgroundTransparency={1}
			/>
			<textlabel
				Text="Select a section from the left sidebar"
				Size={new UDim2(1, 0, 0, 20)}
				Position={new UDim2(0, 0, 0, 30)}
				TextSize={16}
				Font={Enum.Font.Gotham}
				TextColor3={new Color3(0.8, 0.8, 0.8)}
				TextXAlignment={Enum.TextXAlignment.Left}
				BackgroundTransparency={1}
			/>
		</frame>
	);
}
