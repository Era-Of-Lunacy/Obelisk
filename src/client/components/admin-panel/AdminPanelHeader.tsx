import React from "@rbxts/react";
import { AdminPanelProps, SECTION_ICONS } from "./constants";

interface HeaderProps {
	onClose?: AdminPanelProps["onClose"];
}

export default function AdminPanelHeader({ onClose }: HeaderProps) {
	return (
		<frame
			Size={new UDim2(1, 0, 0.1, 0)}
			Position={new UDim2(0, 0, 0, 0)}
			BackgroundTransparency={1}
			BorderSizePixel={0}
		>
			<frame
				Size={new UDim2(0.9, 0, 1, 0)}
				Position={new UDim2(0, 10, 0, 0)}
				BackgroundTransparency={1}
				BorderSizePixel={0}
			>
				<imagelabel
					key="adminHeaderIcon"
					Size={new UDim2(0, 24, 0, 24)}
					Position={new UDim2(0, 0, 0.5, 0)}
					AnchorPoint={new Vector2(0, 0.5)}
					Image={SECTION_ICONS.Admin}
					ImageColor3={new Color3(1, 1, 1)}
					BackgroundTransparency={1}
				/>
				<textlabel
					Text="Admin Panel"
					Size={new UDim2(0, 0, 0, 0)}
					Position={new UDim2(0, 34, 0.5, 0)}
					AnchorPoint={new Vector2(0, 0.5)}
					AutomaticSize={Enum.AutomaticSize.XY}
					TextSize={24}
					Font={Enum.Font.GothamMedium}
					TextColor3={new Color3(1, 1, 1)}
					TextXAlignment={Enum.TextXAlignment.Left}
					BackgroundTransparency={1}
				/>
			</frame>

			<frame
				key="exitButtonContainer"
				Size={new UDim2(0, 32, 0, 32)}
				Position={new UDim2(1, -10, 0.5, 0)}
				AnchorPoint={new Vector2(1, 0.5)}
				BackgroundTransparency={1}
			>
				<textbutton
					key="exitButton"
					Size={new UDim2(1, 0, 1, 0)}
					Text="X"
					TextSize={18}
					Font={Enum.Font.GothamBold}
					TextColor3={new Color3(1, 1, 1)}
					BackgroundColor3={new Color3(0.8, 0.2, 0.2)}
					BackgroundTransparency={0.2}
					BorderSizePixel={0}
					Event={{
						MouseButton1Click: () => {
							if (onClose) {
								onClose();
							}
						},
						MouseEnter: (rbx) => {
							rbx.BackgroundColor3 = new Color3(0.9, 0.2, 0.2);
						},
						MouseLeave: (rbx) => {
							rbx.BackgroundColor3 = new Color3(0.8, 0.2, 0.2);
						},
					}}
				>
					<uicorner CornerRadius={new UDim(0, 4)} />
					<uistroke Color={new Color3(0, 0, 0)} Transparency={0.7} Thickness={1} />
				</textbutton>
				<uiaspectratioconstraint AspectRatio={1} />
			</frame>
		</frame>
	);
}
