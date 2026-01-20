import React from "@rbxts/react";
import { SECTION_COLORS } from "./constants";

export default function ServerSection() {
	return (
		<frame
			key="content-server"
			Size={new UDim2(1, 0, 1, 0)}
			Position={new UDim2(0, 0, 0, 0)}
			BackgroundTransparency={1}
		>
			<textlabel
				key="serverTitle"
				Text="Server Management"
				Size={new UDim2(1, 0, 0, 30)}
				Position={new UDim2(0, 0, 0, 0)}
				TextSize={18}
				Font={Enum.Font.GothamBold}
				TextColor3={new Color3(1, 1, 1)}
				TextXAlignment={Enum.TextXAlignment.Left}
				BackgroundTransparency={1}
			/>

			<frame
				key="serverStats"
				Size={new UDim2(1, 0, 0, 80)}
				Position={new UDim2(0, 0, 0, 40)}
				BackgroundColor3={new Color3(0.1, 0.1, 0.1)}
				BackgroundTransparency={0.5}
				BorderSizePixel={0}
			>
				<uicorner CornerRadius={new UDim(0, 6)} />
				<uigradient
					Color={new ColorSequence(new Color3(0.1, 0.4, 0.2), new Color3(0.1, 0.3, 0.2))}
					Rotation={90}
				/>

				<textlabel
					Text="Status: Online"
					Size={new UDim2(0.5, 0, 0, 24)}
					Position={new UDim2(0, 10, 0, 10)}
					TextSize={16}
					Font={Enum.Font.Gotham}
					TextColor3={new Color3(0.4, 1, 0.4)}
					TextXAlignment={Enum.TextXAlignment.Left}
					BackgroundTransparency={1}
				/>

				<textlabel
					Text="Players: 12/50"
					Size={new UDim2(0.5, 0, 0, 24)}
					Position={new UDim2(0, 10, 0, 34)}
					TextSize={16}
					Font={Enum.Font.Gotham}
					TextColor3={new Color3(1, 1, 1)}
					TextXAlignment={Enum.TextXAlignment.Left}
					BackgroundTransparency={1}
				/>

				<textlabel
					Text="Uptime: 3h 42m"
					Size={new UDim2(0.5, 0, 0, 24)}
					Position={new UDim2(0.5, 0, 0, 10)}
					TextSize={16}
					Font={Enum.Font.Gotham}
					TextColor3={new Color3(1, 1, 1)}
					TextXAlignment={Enum.TextXAlignment.Left}
					BackgroundTransparency={1}
				/>

				<textlabel
					Text="CPU: 28%"
					Size={new UDim2(0.5, 0, 0, 24)}
					Position={new UDim2(0.5, 0, 0, 34)}
					TextSize={16}
					Font={Enum.Font.Gotham}
					TextColor3={new Color3(1, 1, 1)}
					TextXAlignment={Enum.TextXAlignment.Left}
					BackgroundTransparency={1}
				/>
			</frame>

			<frame
				key="serverControls"
				Size={new UDim2(1, 0, 0, 140)}
				Position={new UDim2(0, 0, 0, 130)}
				BackgroundColor3={new Color3(0.1, 0.1, 0.1)}
				BackgroundTransparency={0.5}
				BorderSizePixel={0}
			>
				<uicorner CornerRadius={new UDim(0, 6)} />

				<textlabel
					Text="Server Controls"
					Size={new UDim2(1, -20, 0, 30)}
					Position={new UDim2(0, 10, 0, 10)}
					TextSize={16}
					Font={Enum.Font.GothamBold}
					TextColor3={new Color3(1, 1, 1)}
					TextXAlignment={Enum.TextXAlignment.Left}
					BackgroundTransparency={1}
				/>

				<frame
					key="buttonContainer"
					Size={new UDim2(1, -20, 0, 80)}
					Position={new UDim2(0, 10, 0, 50)}
					BackgroundTransparency={1}
				>
					<uilistlayout
						FillDirection={Enum.FillDirection.Horizontal}
						Padding={new UDim(0, 10)}
						VerticalAlignment={Enum.VerticalAlignment.Center}
					/>

					<textbutton
						key="restartBtn"
						Size={new UDim2(0, 100, 0, 36)}
						Text="Restart"
						TextSize={14}
						Font={Enum.Font.GothamBold}
						TextColor3={new Color3(1, 1, 1)}
						BackgroundColor3={SECTION_COLORS.Server}
						BackgroundTransparency={0.2}
						BorderSizePixel={0}
					>
						<uicorner CornerRadius={new UDim(0, 6)} />
					</textbutton>

					<textbutton
						key="shutdownBtn"
						Size={new UDim2(0, 100, 0, 36)}
						Text="Shutdown"
						TextSize={14}
						Font={Enum.Font.GothamBold}
						TextColor3={new Color3(1, 1, 1)}
						BackgroundColor3={new Color3(0.8, 0.2, 0.2)}
						BackgroundTransparency={0.2}
						BorderSizePixel={0}
					>
						<uicorner CornerRadius={new UDim(0, 6)} />
					</textbutton>

					<textbutton
						key="configBtn"
						Size={new UDim2(0, 100, 0, 36)}
						Text="Config"
						TextSize={14}
						Font={Enum.Font.GothamBold}
						TextColor3={new Color3(1, 1, 1)}
						BackgroundColor3={new Color3(0.3, 0.3, 0.3)}
						BackgroundTransparency={0.2}
						BorderSizePixel={0}
					>
						<uicorner CornerRadius={new UDim(0, 6)} />
					</textbutton>
				</frame>
			</frame>
		</frame>
	);
}
