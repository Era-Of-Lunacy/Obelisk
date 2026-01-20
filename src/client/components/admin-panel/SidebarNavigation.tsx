import React from "@rbxts/react";
import { AdminPanelSection, SECTION_COLORS, SECTION_ICONS, SECTION_ORDER } from "./constants";

interface SidebarNavigationProps {
	activeSection: AdminPanelSection;
	onSectionChange: (section: AdminPanelSection) => void;
}

export default function SidebarNavigation({ activeSection, onSectionChange }: SidebarNavigationProps) {
	return (
		<frame
			key="sidebar"
			Size={new UDim2(0.25, 0, 1, 0)}
			Position={new UDim2(0, 0, 0, 0)}
			BackgroundColor3={new Color3(0.07, 0.07, 0.07)}
			BackgroundTransparency={0.3}
			BorderSizePixel={0}
		>
			<uicorner CornerRadius={new UDim(0, 6)} />
			<scrollingframe
				key="sidebar-scroller"
				Size={new UDim2(1, 0, 1, 0)}
				BackgroundTransparency={1}
				BorderSizePixel={0}
				ScrollBarThickness={4}
				ScrollBarImageColor3={new Color3(1, 1, 1)}
				ScrollBarImageTransparency={0.5}
				CanvasSize={new UDim2(0, 0, 0, 0)}
				AutomaticCanvasSize={Enum.AutomaticSize.Y}
			>
				<uipadding
					PaddingTop={new UDim(0, 12)}
					PaddingBottom={new UDim(0, 12)}
					PaddingLeft={new UDim(0, 8)}
					PaddingRight={new UDim(0, 8)}
				/>
				<uilistlayout
					FillDirection={Enum.FillDirection.Vertical}
					HorizontalAlignment={Enum.HorizontalAlignment.Center}
					VerticalAlignment={Enum.VerticalAlignment.Top}
					Padding={new UDim(0, 8)}
					SortOrder={"LayoutOrder"}
				/>

				{SECTION_ORDER.map((section, index) => (
					<frame
						key={`nav-${section}-container`}
						Size={new UDim2(1, 0, 0, 42)}
						BackgroundTransparency={1}
						LayoutOrder={index + 1}
					>
						<textbutton
							key={`nav-${section}`}
							Size={new UDim2(1, 0, 1, 0)}
							Text=""
							BackgroundColor3={new Color3(0.12, 0.12, 0.14)}
							BackgroundTransparency={activeSection === section ? 0.2 : 0.5}
							BorderSizePixel={0}
							Event={{
								MouseButton1Click: () => onSectionChange(section as AdminPanelSection),
							}}
						>
							<uicorner CornerRadius={new UDim(0, 6)} />

							<imagelabel
								key="icon"
								AnchorPoint={new Vector2(0, 0.5)}
								Size={new UDim2(0, 20, 0, 20)}
								Position={new UDim2(0, 12, 0.5, 0)}
								Image={SECTION_ICONS[section]}
								ImageColor3={SECTION_COLORS[section]}
								BackgroundTransparency={1}
							/>

							<textlabel
								Text={section}
								Size={new UDim2(1, -44, 1, 0)}
								Position={new UDim2(0, 40, 0, 0)}
								TextSize={16}
								Font={Enum.Font.Gotham}
								TextColor3={new Color3(1, 1, 1)}
								TextXAlignment={Enum.TextXAlignment.Left}
								BackgroundTransparency={1}
							/>

							<frame
								Size={new UDim2(0, 4, 0.6, 0)}
								Position={new UDim2(0, 0, 0.2, 0)}
								BackgroundColor3={SECTION_COLORS[section]}
								BackgroundTransparency={activeSection === section ? 0 : 0.9}
								BorderSizePixel={0}
							>
								<uicorner CornerRadius={new UDim(0, 2)} />
							</frame>
						</textbutton>
					</frame>
				))}
			</scrollingframe>
		</frame>
	);
}
