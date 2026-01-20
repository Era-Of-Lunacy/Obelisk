import React from "@rbxts/react";
import { SECTION_COLORS } from "./constants";

export default function ManagementSection() {
	return (
		<frame
			key="content-management"
			Size={new UDim2(1, 0, 1, 0)}
			Position={new UDim2(0, 0, 0, 0)}
			BackgroundTransparency={1}
		>
			<textlabel
				key="managementTitle"
				Text="User Management"
				Size={new UDim2(1, 0, 0, 30)}
				Position={new UDim2(0, 0, 0, 0)}
				TextSize={18}
				Font={Enum.Font.GothamBold}
				TextColor3={new Color3(1, 1, 1)}
				TextXAlignment={Enum.TextXAlignment.Left}
				BackgroundTransparency={1}
			/>

			<frame
				key="searchContainer"
				Size={new UDim2(1, 0, 0, 40)}
				Position={new UDim2(0, 0, 0, 40)}
				BackgroundTransparency={1}
			>
				<textbox
					key="searchBox"
					Size={new UDim2(1, 0, 1, 0)}
					PlaceholderText="Search users..."
					Text=""
					TextSize={14}
					Font={Enum.Font.Gotham}
					TextColor3={new Color3(1, 1, 1)}
					TextXAlignment={Enum.TextXAlignment.Left}
					BackgroundColor3={new Color3(0.1, 0.1, 0.1)}
					BackgroundTransparency={0.5}
					BorderSizePixel={0}
				>
					<uicorner CornerRadius={new UDim(0, 6)} />
					<uipadding PaddingLeft={new UDim(0, 10)} PaddingRight={new UDim(0, 10)} />
				</textbox>
			</frame>

			<scrollingframe
				key="userList"
				Size={new UDim2(1, 0, 0.7, -50)}
				Position={new UDim2(0, 0, 0, 90)}
				BackgroundTransparency={1}
				BorderSizePixel={0}
				ScrollBarThickness={4}
				ScrollBarImageColor3={SECTION_COLORS.Management}
			>
				<uilistlayout FillDirection={Enum.FillDirection.Vertical} Padding={new UDim(0, 8)} />

				<frame
					key="user1"
					Size={new UDim2(1, 0, 0, 60)}
					BackgroundColor3={new Color3(0.1, 0.1, 0.1)}
					BackgroundTransparency={0.5}
					BorderSizePixel={0}
				>
					<uicorner CornerRadius={new UDim(0, 6)} />

					<frame
						key="avatar"
						Size={new UDim2(0, 40, 0, 40)}
						Position={new UDim2(0, 10, 0.5, 0)}
						AnchorPoint={new Vector2(0, 0.5)}
						BackgroundColor3={SECTION_COLORS.Management}
						BackgroundTransparency={0.2}
						BorderSizePixel={0}
					>
						<uicorner CornerRadius={new UDim(1, 0)} />
						<textlabel
							Text="JD"
							Size={new UDim2(1, 0, 1, 0)}
							TextSize={16}
							Font={Enum.Font.GothamBold}
							TextColor3={new Color3(1, 1, 1)}
							BackgroundTransparency={1}
						/>
					</frame>

					<textlabel
						Text="JohnDoe123"
						Size={new UDim2(0, 150, 0, 20)}
						Position={new UDim2(0, 60, 0, 10)}
						TextSize={14}
						Font={Enum.Font.GothamBold}
						TextColor3={new Color3(1, 1, 1)}
						TextXAlignment={Enum.TextXAlignment.Left}
						BackgroundTransparency={1}
					/>

					<textlabel
						Text="Admin"
						Size={new UDim2(0, 150, 0, 20)}
						Position={new UDim2(0, 60, 0, 30)}
						TextSize={12}
						Font={Enum.Font.Gotham}
						TextColor3={SECTION_COLORS.Management}
						TextXAlignment={Enum.TextXAlignment.Left}
						BackgroundTransparency={1}
					/>

					<textbutton
						key="editButton"
						Size={new UDim2(0, 60, 0, 30)}
						Position={new UDim2(1, -10, 0.5, 0)}
						AnchorPoint={new Vector2(1, 0.5)}
						Text="Edit"
						TextSize={12}
						Font={Enum.Font.GothamBold}
						TextColor3={new Color3(1, 1, 1)}
						BackgroundColor3={SECTION_COLORS.Management}
						BackgroundTransparency={0.2}
						BorderSizePixel={0}
					>
						<uicorner CornerRadius={new UDim(0, 4)} />
					</textbutton>
				</frame>

				<frame
					key="user2"
					Size={new UDim2(1, 0, 0, 60)}
					BackgroundColor3={new Color3(0.1, 0.1, 0.1)}
					BackgroundTransparency={0.5}
					BorderSizePixel={0}
				>
					<uicorner CornerRadius={new UDim(0, 6)} />

					<frame
						key="avatar"
						Size={new UDim2(0, 40, 0, 40)}
						Position={new UDim2(0, 10, 0.5, 0)}
						AnchorPoint={new Vector2(0, 0.5)}
						BackgroundColor3={new Color3(0.2, 0.6, 0.8)}
						BackgroundTransparency={0.2}
						BorderSizePixel={0}
					>
						<uicorner CornerRadius={new UDim(1, 0)} />
						<textlabel
							Text="JS"
							Size={new UDim2(1, 0, 1, 0)}
							TextSize={16}
							Font={Enum.Font.GothamBold}
							TextColor3={new Color3(1, 1, 1)}
							BackgroundTransparency={1}
						/>
					</frame>

					<textlabel
						Text="JaneSmith456"
						Size={new UDim2(0, 150, 0, 20)}
						Position={new UDim2(0, 60, 0, 10)}
						TextSize={14}
						Font={Enum.Font.GothamBold}
						TextColor3={new Color3(1, 1, 1)}
						TextXAlignment={Enum.TextXAlignment.Left}
						BackgroundTransparency={1}
					/>

					<textlabel
						Text="Moderator"
						Size={new UDim2(0, 150, 0, 20)}
						Position={new UDim2(0, 60, 0, 30)}
						TextSize={12}
						Font={Enum.Font.Gotham}
						TextColor3={new Color3(0.2, 0.6, 0.8)}
						TextXAlignment={Enum.TextXAlignment.Left}
						BackgroundTransparency={1}
					/>

					<textbutton
						key="editButton"
						Size={new UDim2(0, 60, 0, 30)}
						Position={new UDim2(1, -10, 0.5, 0)}
						AnchorPoint={new Vector2(1, 0.5)}
						Text="Edit"
						TextSize={12}
						Font={Enum.Font.GothamBold}
						TextColor3={new Color3(1, 1, 1)}
						BackgroundColor3={new Color3(0.2, 0.6, 0.8)}
						BackgroundTransparency={0.2}
						BorderSizePixel={0}
					>
						<uicorner CornerRadius={new UDim(0, 4)} />
					</textbutton>
				</frame>
			</scrollingframe>
		</frame>
	);
}
