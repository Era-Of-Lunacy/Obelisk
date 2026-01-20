import React, { useState } from "@rbxts/react";
import { AdminPanelProps, AdminPanelSection } from "client/components/admin-panel/constants";
import AdminPanelHeader from "client/components/admin-panel/AdminPanelHeader";
import SidebarNavigation from "client/components/admin-panel/SidebarNavigation";
import HomeSection from "client/components/admin-panel/HomeSection";
import ServerSection from "client/components/admin-panel/ServerSection";
import ManagementSection from "client/components/admin-panel/ManagementSection";
import SettingsSection from "client/components/admin-panel/SettingsSection";
import CommandsSection from "client/components/admin-panel/CommandsSection";
import AdvancedSection from "client/components/admin-panel/AdvancedSection";
import CustomSection from "client/components/admin-panel/CustomSection";

export default function AdminPanel(props: AdminPanelProps) {
	const [activeSection, setActiveSection] = useState<AdminPanelSection>("Home");

	return (
		<screengui ResetOnSpawn={false} IgnoreGuiInset={true}>
			<frame
				Size={new UDim2(0.5, 0, 0.5, 0)}
				Position={new UDim2(0.5, 0, 0.5, 0)}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor={new BrickColor("Institutional white")}
				BackgroundTransparency={0.1}
				BorderSizePixel={0}
			>
				<uicorner CornerRadius={new UDim(0, 8)} />
				<uigradient
					Color={new ColorSequence(new Color3(0.098, 0.098, 0.098), new Color3(0.196, 0.196, 0.196))}
					Rotation={45}
				/>

				<uistroke Color={new Color3(0, 0, 0)} Transparency={0.7} Thickness={1} />

				<AdminPanelHeader onClose={props.onClose} />

				<frame
					Size={new UDim2(1, -40, 0.9, -20)}
					Position={new UDim2(0, 20, 0.1, 0)}
					BackgroundColor3={new Color3(0, 0, 0)}
					BackgroundTransparency={0.6}
					BorderSizePixel={0}
				>
					<uicorner CornerRadius={new UDim(0, 6)} />

					<SidebarNavigation activeSection={activeSection} onSectionChange={setActiveSection} />

					<frame
						key="contentArea"
						Size={new UDim2(0.75, -16, 1, 0)}
						Position={new UDim2(0.25, 8, 0, 0)}
						BackgroundTransparency={1}
						BorderSizePixel={0}
						ClipsDescendants={true}
					>
						<uipadding
							PaddingTop={new UDim(0, 10)}
							PaddingBottom={new UDim(0, 10)}
							PaddingLeft={new UDim(0, 10)}
							PaddingRight={new UDim(0, 10)}
						/>

						<textlabel
							key="sectionHeader"
							Text={activeSection}
							Size={new UDim2(1, 0, 0, 40)}
							Position={new UDim2(0, 0, 0, 0)}
							TextSize={20}
							Font={Enum.Font.GothamBold}
							TextColor3={new Color3(1, 1, 1)}
							TextXAlignment={Enum.TextXAlignment.Left}
							BackgroundTransparency={1}
						/>

						<scrollingframe
							key="contentScrollArea"
							Size={new UDim2(1, 0, 1, -50)}
							Position={new UDim2(0, 0, 0, 50)}
							BackgroundTransparency={1}
							BorderSizePixel={0}
							ScrollBarThickness={6}
							ScrollBarImageColor3={new Color3(1, 1, 1)}
							ScrollBarImageTransparency={0.7}
							ElasticBehavior={Enum.ElasticBehavior.Always}
							ScrollingEnabled={true}
							HorizontalScrollBarInset={Enum.ScrollBarInset.None}
							VerticalScrollBarInset={Enum.ScrollBarInset.ScrollBar}
							CanvasSize={new UDim2(0, 0, 10, 0)}
						>
							{activeSection === "Home" && <HomeSection />}
							{activeSection === "Server" && <ServerSection />}
							{activeSection === "Management" && <ManagementSection />}
							{activeSection === "Settings" && <SettingsSection />}
							{activeSection === "Commands" && <CommandsSection />}
							{activeSection === "Advanced" && <AdvancedSection />}
							{activeSection === "Custom" && <CustomSection />}
						</scrollingframe>
					</frame>
				</frame>
			</frame>
		</screengui>
	);
}
