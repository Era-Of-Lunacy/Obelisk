import React from "@rbxts/react";
import { SECTION_COLORS } from "./constants";

export default function AdvancedSection() {
	return (
		<frame
			key="content-advanced"
			Size={new UDim2(1, 0, 1, 0)}
			Position={new UDim2(0, 0, 0, 0)}
			BackgroundTransparency={1}
		>
			<textlabel
				key="advancedTitle"
				Text="Advanced Settings"
				Size={new UDim2(1, 0, 0, 30)}
				Position={new UDim2(0, 0, 0, 0)}
				TextSize={18}
				Font={Enum.Font.GothamBold}
				TextColor3={new Color3(1, 1, 1)}
				TextXAlignment={Enum.TextXAlignment.Left}
				BackgroundTransparency={1}
			/>

			<frame
				key="tabsContainer"
				Size={new UDim2(1, 0, 0, 40)}
				Position={new UDim2(0, 0, 0, 40)}
				BackgroundTransparency={1}
			>
				<frame
					key="tabButtons"
					Size={new UDim2(1, 0, 1, 0)}
					BackgroundColor3={new Color3(0.1, 0.1, 0.1)}
					BackgroundTransparency={0.5}
					BorderSizePixel={0}
				>
					<uicorner CornerRadius={new UDim(0, 6)} />
					<uilistlayout
						FillDirection={Enum.FillDirection.Horizontal}
						Padding={new UDim(0, 4)}
						VerticalAlignment={Enum.VerticalAlignment.Center}
					/>
					<uipadding PaddingLeft={new UDim(0, 8)} PaddingRight={new UDim(0, 8)} />

					<textbutton
						key="scriptingTab"
						Size={new UDim2(0, 90, 0.8, 0)}
						Text="Scripting"
						TextSize={14}
						Font={Enum.Font.GothamBold}
						TextColor3={new Color3(1, 1, 1)}
						BackgroundColor3={SECTION_COLORS.Advanced}
						BackgroundTransparency={0.2}
						BorderSizePixel={0}
					>
						<uicorner CornerRadius={new UDim(0, 4)} />
					</textbutton>

					<textbutton
						key="performanceTab"
						Size={new UDim2(0, 100, 0.8, 0)}
						Text="Performance"
						TextSize={14}
						Font={Enum.Font.GothamBold}
						TextColor3={new Color3(1, 1, 1)}
						BackgroundColor3={new Color3(0.15, 0.15, 0.15)}
						BackgroundTransparency={0.5}
						BorderSizePixel={0}
					>
						<uicorner CornerRadius={new UDim(0, 4)} />
					</textbutton>

					<textbutton
						key="debugTab"
						Size={new UDim2(0, 70, 0.8, 0)}
						Text="Debug"
						TextSize={14}
						Font={Enum.Font.GothamBold}
						TextColor3={new Color3(1, 1, 1)}
						BackgroundColor3={new Color3(0.15, 0.15, 0.15)}
						BackgroundTransparency={0.5}
						BorderSizePixel={0}
					>
						<uicorner CornerRadius={new UDim(0, 4)} />
					</textbutton>
				</frame>
			</frame>

			<frame
				key="scriptingContent"
				Size={new UDim2(1, 0, 0.7, -40)}
				Position={new UDim2(0, 0, 0, 90)}
				BackgroundColor3={new Color3(0.1, 0.1, 0.1)}
				BackgroundTransparency={0.5}
				BorderSizePixel={0}
				Visible={true}
			>
				<uicorner CornerRadius={new UDim(0, 6)} />

				<textlabel
					key="scriptTitle"
					Text="Lua Script Editor"
					Size={new UDim2(1, -20, 0, 30)}
					Position={new UDim2(0, 10, 0, 10)}
					TextSize={16}
					Font={Enum.Font.GothamBold}
					TextColor3={SECTION_COLORS.Advanced}
					TextXAlignment={Enum.TextXAlignment.Left}
					BackgroundTransparency={1}
				/>

				<frame
					key="codeEditor"
					Size={new UDim2(1, -20, 0.7, -40)}
					Position={new UDim2(0, 10, 0, 40)}
					BackgroundColor3={new Color3(0.08, 0.08, 0.08)}
					BackgroundTransparency={0.2}
					BorderSizePixel={0}
				>
					<uicorner CornerRadius={new UDim(0, 4)} />

					<textbox
						key="codeInput"
						Text={
							'-- Example Lua code\nlocal Players = game:GetService("Players")\n\nlocal function onPlayerAdded(player)\n    print(player.Name .. " joined the game")\n    -- Add your custom logic here\nend\n\nPlayers.PlayerAdded:Connect(onPlayerAdded)'
						}
						Size={new UDim2(1, -8, 1, -8)}
						Position={new UDim2(0.5, 0, 0.5, 0)}
						AnchorPoint={new Vector2(0.5, 0.5)}
						TextSize={14}
						Font={Enum.Font.Code}
						TextColor3={new Color3(0.8, 0.8, 1)}
						TextXAlignment={Enum.TextXAlignment.Left}
						TextYAlignment={Enum.TextYAlignment.Top}
						BackgroundTransparency={1}
						TextEditable={true}
						MultiLine={true}
						ClearTextOnFocus={false}
					>
						<uipadding
							PaddingLeft={new UDim(0, 8)}
							PaddingRight={new UDim(0, 8)}
							PaddingTop={new UDim(0, 8)}
							PaddingBottom={new UDim(0, 8)}
						/>
					</textbox>
				</frame>

				<frame
					key="buttonContainer"
					Size={new UDim2(1, -20, 0, 40)}
					Position={new UDim2(0, 10, 1, -50)}
					BackgroundTransparency={1}
				>
					<textbutton
						key="executeBtn"
						Size={new UDim2(0, 100, 1, 0)}
						Position={new UDim2(1, 0, 0, 0)}
						AnchorPoint={new Vector2(1, 0)}
						Text="Execute"
						TextSize={14}
						Font={Enum.Font.GothamBold}
						TextColor3={new Color3(1, 1, 1)}
						BackgroundColor3={SECTION_COLORS.Advanced}
						BackgroundTransparency={0.2}
						BorderSizePixel={0}
					>
						<uicorner CornerRadius={new UDim(0, 4)} />
					</textbutton>

					<textbutton
						key="clearBtn"
						Size={new UDim2(0, 80, 1, 0)}
						Position={new UDim2(1, -110, 0, 0)}
						AnchorPoint={new Vector2(0, 0)}
						Text="Clear"
						TextSize={14}
						Font={Enum.Font.GothamBold}
						TextColor3={new Color3(1, 1, 1)}
						BackgroundColor3={new Color3(0.3, 0.3, 0.3)}
						BackgroundTransparency={0.2}
						BorderSizePixel={0}
					>
						<uicorner CornerRadius={new UDim(0, 4)} />
					</textbutton>
				</frame>
			</frame>
		</frame>
	);
}
