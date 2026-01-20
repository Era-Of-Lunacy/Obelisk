import React from "@rbxts/react";
import { SECTION_COLORS } from "./constants";

export default function CommandsSection() {
	return (
		<frame
			key="content-commands"
			Size={new UDim2(1, 0, 1, 0)}
			Position={new UDim2(0, 0, 0, 0)}
			BackgroundTransparency={1}
		>
			<textlabel
				key="commandsTitle"
				Text="Admin Commands"
				Size={new UDim2(1, 0, 0, 30)}
				Position={new UDim2(0, 0, 0, 0)}
				TextSize={18}
				Font={Enum.Font.GothamBold}
				TextColor3={new Color3(1, 1, 1)}
				TextXAlignment={Enum.TextXAlignment.Left}
				BackgroundTransparency={1}
			/>

			<frame
				key="commandConsole"
				Size={new UDim2(1, 0, 0.7, 0)}
				Position={new UDim2(0, 0, 0, 40)}
				BackgroundColor3={new Color3(0.08, 0.08, 0.08)}
				BackgroundTransparency={0.2}
				BorderSizePixel={0}
			>
				<uicorner CornerRadius={new UDim(0, 6)} />

				<scrollingframe
					key="consoleOutput"
					Size={new UDim2(1, -16, 1, -50)}
					Position={new UDim2(0, 8, 0, 8)}
					BackgroundTransparency={1}
					ScrollBarThickness={4}
					ScrollBarImageColor3={SECTION_COLORS.Commands}
					BorderSizePixel={0}
					CanvasSize={new UDim2(0, 0, 0, 200)}
					ScrollingDirection={Enum.ScrollingDirection.Y}
					ClipsDescendants={true}
				>
					<uilistlayout FillDirection={Enum.FillDirection.Vertical} Padding={new UDim(0, 6)} />

					<textlabel
						key="welcomeText"
						Text="Welcome to the Admin Console. Type 'help' for a list of commands."
						Size={new UDim2(1, 0, 0, 20)}
						TextSize={14}
						Font={Enum.Font.Code}
						TextColor3={SECTION_COLORS.Commands}
						TextXAlignment={Enum.TextXAlignment.Left}
						BackgroundTransparency={1}
						RichText={true}
					/>

					<textlabel
						Text="> help"
						Size={new UDim2(1, 0, 0, 20)}
						TextSize={14}
						Font={Enum.Font.Code}
						TextColor3={new Color3(1, 1, 1)}
						TextXAlignment={Enum.TextXAlignment.Left}
						BackgroundTransparency={1}
					/>

					<textlabel
						Text="Available commands:\n- kick <player>: Kick a player from the server\n- ban <player> <reason>: Ban a player\n- teleport <player> <x> <y> <z>: Teleport a player\n- weather <type>: Change the weather\n- time <hour>: Set the time of day"
						Size={new UDim2(1, 0, 0, 90)}
						TextSize={14}
						Font={Enum.Font.Code}
						TextColor3={SECTION_COLORS.Commands}
						TextXAlignment={Enum.TextXAlignment.Left}
						BackgroundTransparency={1}
						TextWrapped={true}
					/>

					<textlabel
						Text="> weather sunny"
						Size={new UDim2(1, 0, 0, 20)}
						TextSize={14}
						Font={Enum.Font.Code}
						TextColor3={new Color3(1, 1, 1)}
						TextXAlignment={Enum.TextXAlignment.Left}
						BackgroundTransparency={1}
					/>

					<textlabel
						Text="[SUCCESS] Weather changed to sunny"
						Size={new UDim2(1, 0, 0, 20)}
						TextSize={14}
						Font={Enum.Font.Code}
						TextColor3={new Color3(0.2, 0.8, 0.2)}
						TextXAlignment={Enum.TextXAlignment.Left}
						BackgroundTransparency={1}
					/>
				</scrollingframe>

				<frame
					key="inputContainer"
					Size={new UDim2(1, -16, 0, 36)}
					Position={new UDim2(0, 8, 1, -42)}
					BackgroundColor3={new Color3(0.1, 0.1, 0.1)}
					BackgroundTransparency={0.5}
					BorderSizePixel={0}
				>
					<uicorner CornerRadius={new UDim(0, 4)} />

					<textbox
						key="commandInput"
						Size={new UDim2(1, -8, 1, -8)}
						Position={new UDim2(0.5, 0, 0.5, 0)}
						AnchorPoint={new Vector2(0.5, 0.5)}
						Text=""
						PlaceholderText="Type command here..."
						TextSize={14}
						Font={Enum.Font.Code}
						TextColor3={new Color3(1, 1, 1)}
						TextXAlignment={Enum.TextXAlignment.Left}
						BackgroundTransparency={1}
						ClearTextOnFocus={false}
					/>
				</frame>
			</frame>

			<frame
				key="commandReference"
				Size={new UDim2(1, 0, 0.25, -50)}
				Position={new UDim2(0, 0, 0.75, 50)}
				BackgroundColor3={new Color3(0.1, 0.1, 0.1)}
				BackgroundTransparency={0.5}
				BorderSizePixel={0}
			>
				<uicorner CornerRadius={new UDim(0, 6)} />

				<textlabel
					Text="Quick Commands"
					Size={new UDim2(1, -20, 0, 30)}
					Position={new UDim2(0, 10, 0, 10)}
					TextSize={16}
					Font={Enum.Font.GothamBold}
					TextColor3={SECTION_COLORS.Commands}
					TextXAlignment={Enum.TextXAlignment.Left}
					BackgroundTransparency={1}
				/>

				<frame
					key="quickCommandButtons"
					Size={new UDim2(1, -20, 0, 40)}
					Position={new UDim2(0, 10, 0, 40)}
					BackgroundTransparency={1}
				>
					<uilistlayout FillDirection={Enum.FillDirection.Horizontal} Padding={new UDim(0, 8)} />

					<textbutton
						key="weatherBtn"
						Size={new UDim2(0, 90, 1, 0)}
						Text="Weather"
						TextSize={14}
						Font={Enum.Font.GothamBold}
						TextColor3={new Color3(1, 1, 1)}
						BackgroundColor3={SECTION_COLORS.Commands}
						BackgroundTransparency={0.2}
						BorderSizePixel={0}
					>
						<uicorner CornerRadius={new UDim(0, 4)} />
					</textbutton>

					<textbutton
						key="timeBtn"
						Size={new UDim2(0, 70, 1, 0)}
						Text="Time"
						TextSize={14}
						Font={Enum.Font.GothamBold}
						TextColor3={new Color3(1, 1, 1)}
						BackgroundColor3={SECTION_COLORS.Commands}
						BackgroundTransparency={0.2}
						BorderSizePixel={0}
					>
						<uicorner CornerRadius={new UDim(0, 4)} />
					</textbutton>

					<textbutton
						key="kickBtn"
						Size={new UDim2(0, 70, 1, 0)}
						Text="Kick"
						TextSize={14}
						Font={Enum.Font.GothamBold}
						TextColor3={new Color3(1, 1, 1)}
						BackgroundColor3={SECTION_COLORS.Commands}
						BackgroundTransparency={0.2}
						BorderSizePixel={0}
					>
						<uicorner CornerRadius={new UDim(0, 4)} />
					</textbutton>

					<textbutton
						key="helpBtn"
						Size={new UDim2(0, 70, 1, 0)}
						Text="Help"
						TextSize={14}
						Font={Enum.Font.GothamBold}
						TextColor3={new Color3(1, 1, 1)}
						BackgroundColor3={SECTION_COLORS.Commands}
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
