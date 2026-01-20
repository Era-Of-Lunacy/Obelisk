import React from "@rbxts/react";
import { SECTION_COLORS } from "./constants";

export default function SettingsSection() {
	return (
		<frame
			key="content-settings"
			Size={new UDim2(1, 0, 1, 0)}
			Position={new UDim2(0, 0, 0, 0)}
			BackgroundTransparency={1}
		>
			<textlabel
				key="settingsTitle"
				Text="Game Settings"
				Size={new UDim2(1, 0, 0, 30)}
				Position={new UDim2(0, 0, 0, 0)}
				TextSize={18}
				Font={Enum.Font.GothamBold}
				TextColor3={new Color3(1, 1, 1)}
				TextXAlignment={Enum.TextXAlignment.Left}
				BackgroundTransparency={1}
			/>

			<scrollingframe
				key="settingsContainer"
				Size={new UDim2(1, 0, 1, -40)}
				Position={new UDim2(0, 0, 0, 40)}
				BackgroundTransparency={1}
				BorderSizePixel={0}
				ScrollBarThickness={4}
				ScrollBarImageColor3={SECTION_COLORS.Settings}
				CanvasSize={new UDim2(0, 0, 0, 350)}
			>
				<uilistlayout FillDirection={Enum.FillDirection.Vertical} Padding={new UDim(0, 10)} />

				<frame
					key="generalSettings"
					Size={new UDim2(1, 0, 0, 140)}
					BackgroundColor3={new Color3(0.1, 0.1, 0.1)}
					BackgroundTransparency={0.5}
					BorderSizePixel={0}
				>
					<uicorner CornerRadius={new UDim(0, 6)} />

					<textlabel
						Text="General"
						Size={new UDim2(1, -20, 0, 30)}
						Position={new UDim2(0, 10, 0, 10)}
						TextSize={16}
						Font={Enum.Font.GothamBold}
						TextColor3={SECTION_COLORS.Settings}
						TextXAlignment={Enum.TextXAlignment.Left}
						BackgroundTransparency={1}
					/>

					<frame
						key="gameNameSetting"
						Size={new UDim2(1, -20, 0, 36)}
						Position={new UDim2(0, 10, 0, 40)}
						BackgroundTransparency={1}
					>
						<textlabel
							Text="Game Name"
							Size={new UDim2(0.4, 0, 1, 0)}
							TextSize={14}
							Font={Enum.Font.Gotham}
							TextColor3={new Color3(1, 1, 1)}
							TextXAlignment={Enum.TextXAlignment.Left}
							BackgroundTransparency={1}
						/>

						<textbox
							Text="Obelisk Adventure"
							Size={new UDim2(0.6, 0, 1, 0)}
							Position={new UDim2(0.4, 0, 0, 0)}
							TextSize={14}
							Font={Enum.Font.Gotham}
							TextColor3={new Color3(1, 1, 1)}
							TextXAlignment={Enum.TextXAlignment.Left}
							BackgroundColor3={new Color3(0.15, 0.15, 0.15)}
							BackgroundTransparency={0.5}
							BorderSizePixel={0}
						>
							<uicorner CornerRadius={new UDim(0, 4)} />
							<uipadding PaddingLeft={new UDim(0, 8)} PaddingRight={new UDim(0, 8)} />
						</textbox>
					</frame>

					<frame
						key="maxPlayersSetting"
						Size={new UDim2(1, -20, 0, 36)}
						Position={new UDim2(0, 10, 0, 86)}
						BackgroundTransparency={1}
					>
						<textlabel
							Text="Max Players"
							Size={new UDim2(0.4, 0, 1, 0)}
							TextSize={14}
							Font={Enum.Font.Gotham}
							TextColor3={new Color3(1, 1, 1)}
							TextXAlignment={Enum.TextXAlignment.Left}
							BackgroundTransparency={1}
						/>

						<textbox
							Text="50"
							Size={new UDim2(0.6, 0, 1, 0)}
							Position={new UDim2(0.4, 0, 0, 0)}
							TextSize={14}
							Font={Enum.Font.Gotham}
							TextColor3={new Color3(1, 1, 1)}
							TextXAlignment={Enum.TextXAlignment.Left}
							BackgroundColor3={new Color3(0.15, 0.15, 0.15)}
							BackgroundTransparency={0.5}
							BorderSizePixel={0}
						>
							<uicorner CornerRadius={new UDim(0, 4)} />
							<uipadding PaddingLeft={new UDim(0, 8)} PaddingRight={new UDim(0, 8)} />
						</textbox>
					</frame>
				</frame>

				<frame
					key="gameplaySettings"
					Size={new UDim2(1, 0, 0, 180)}
					BackgroundColor3={new Color3(0.1, 0.1, 0.1)}
					BackgroundTransparency={0.5}
					BorderSizePixel={0}
				>
					<uicorner CornerRadius={new UDim(0, 6)} />

					<textlabel
						Text="Gameplay"
						Size={new UDim2(1, -20, 0, 30)}
						Position={new UDim2(0, 10, 0, 10)}
						TextSize={16}
						Font={Enum.Font.GothamBold}
						TextColor3={SECTION_COLORS.Settings}
						TextXAlignment={Enum.TextXAlignment.Left}
						BackgroundTransparency={1}
					/>

					<frame
						key="pvpSetting"
						Size={new UDim2(1, -20, 0, 36)}
						Position={new UDim2(0, 10, 0, 40)}
						BackgroundTransparency={1}
					>
						<textlabel
							Text="Enable PVP"
							Size={new UDim2(0.7, 0, 1, 0)}
							TextSize={14}
							Font={Enum.Font.Gotham}
							TextColor3={new Color3(1, 1, 1)}
							TextXAlignment={Enum.TextXAlignment.Left}
							BackgroundTransparency={1}
						/>

						<frame
							key="toggleBackground"
							Size={new UDim2(0, 44, 0, 24)}
							Position={new UDim2(1, 0, 0.5, 0)}
							AnchorPoint={new Vector2(1, 0.5)}
							BackgroundColor3={new Color3(0.15, 0.15, 0.15)}
							BorderSizePixel={0}
						>
							<uicorner CornerRadius={new UDim(1, 0)} />

							<frame
								key="toggle"
								Size={new UDim2(0, 20, 0, 20)}
								Position={new UDim2(0, 22, 0.5, 0)}
								AnchorPoint={new Vector2(0, 0.5)}
								BackgroundColor3={SECTION_COLORS.Settings}
								BorderSizePixel={0}
							>
								<uicorner CornerRadius={new UDim(1, 0)} />
							</frame>
						</frame>
					</frame>
				</frame>
			</scrollingframe>

			<textbutton
				key="saveButton"
				Size={new UDim2(0, 120, 0, 40)}
				Position={new UDim2(1, -10, 1, -10)}
				AnchorPoint={new Vector2(1, 1)}
				Text="Save Changes"
				TextSize={14}
				Font={Enum.Font.GothamBold}
				TextColor3={new Color3(1, 1, 1)}
				BackgroundColor3={SECTION_COLORS.Settings}
				BackgroundTransparency={0.2}
				BorderSizePixel={0}
			>
				<uicorner CornerRadius={new UDim(0, 6)} />
			</textbutton>
		</frame>
	);
}
