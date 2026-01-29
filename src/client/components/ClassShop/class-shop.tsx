import { useFlameworkDependency } from "@rbxts/flamework-react-utils";
import React, { Component, Element, ReactComponent } from "@rbxts/react";
import ClassDataController from "client/controllers/data/ClassDataController";
import UserDataController from "client/controllers/data/UserDataController";
import { ClassType } from "shared/types/database";

interface State {
	selectedClass: ClassType;
	status: "OWNED" | "NOT_OWNED" | "EQUIPPED";
}

const ASSETS = {
	SHOP_BACKGROUND: "rbxassetid://89656385134836",
	BUY_BUTTON: "rbxassetid://72885642612132",
	EQUIP_BUTTON: "rbxassetid://127144135009399",
	UNEQUIP_BUTTON: "rbxassetid://74393977413624",
};

@ReactComponent
export class ClassShop extends Component<object, State> {
	private classDataController = useFlameworkDependency<ClassDataController>();
	private userDataController = useFlameworkDependency<UserDataController>();

	state: State = {
		selectedClass: "None",
		status: "NOT_OWNED",
	};

	render() {
		const classButtons: Element[] = [];
		const classes = this.classDataController.getClasses();

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		for (const [_, value] of pairs(classes)) {
			if (value.enabled !== true) continue;

			classButtons.push(
				<imagebutton
					Image={value.icon_image_id}
					BackgroundTransparency={1}
					Event={{
						Activated: () => {
							if (!this.userDataController.getData().owned_classes?.includes(value.class)) {
								this.setState({
									status: "NOT_OWNED",
								});
							} else if (this.userDataController.getData().class === value.class) {
								this.setState({
									status: "EQUIPPED",
								});
							} else {
								this.setState({
									status: "OWNED",
								});
							}

							if (this.state.selectedClass === value.class) {
								this.setState({
									selectedClass: "None",
								});

								return;
							}

							this.setState({
								selectedClass: value.class,
							});
						},
					}}
					LayoutOrder={value.price}
				>
					<uiaspectratioconstraint AspectRatio={1} DominantAxis="Height" />
				</imagebutton>,
			);
		}

		const { selectedClass, status } = this.state;

		return (
			<screengui ResetOnSpawn={true} IgnoreGuiInset={true}>
				<frame
					Size={new UDim2(0.8, 0, 0.8, 0)}
					Position={new UDim2(0.5, 0, 0.5, 0)}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundTransparency={1}
				>
					<imagelabel
						Size={new UDim2(0.4, 0, 1, 0)}
						Position={new UDim2(0, 0, 0.5, 0)}
						AnchorPoint={new Vector2(0, 0.5)}
						Image={ASSETS.SHOP_BACKGROUND}
						BackgroundTransparency={1}
					>
						<scrollingframe
							Size={new UDim2(0.8, 0, 0.6, 0)}
							Position={new UDim2(0.1, 0, 0.5, 0)}
							AnchorPoint={new Vector2(0, 0.5)}
							BackgroundTransparency={1}
							BorderSizePixel={0}
							AutomaticCanvasSize="Y"
							ScrollBarImageColor3={new Color3(0, 0, 0)}
						>
							<uigridlayout
								CellSize={new UDim2(0.4, 0, 0.4, 0)}
								HorizontalAlignment="Center"
								SortOrder="LayoutOrder"
							/>
							{classButtons}
						</scrollingframe>
					</imagelabel>
					{selectedClass !== "None" &&
					selectedClass !== undefined &&
					this.classDataController.getClass(selectedClass)?.full_image_id !== undefined ? (
						<imagelabel
							Size={new UDim2(0.6, 0, 1.2, 0)}
							Position={new UDim2(1, 0, 0.5, 0)}
							AnchorPoint={new Vector2(1, 0.5)}
							Image={this.classDataController.getClass(selectedClass)?.full_image_id}
							BackgroundTransparency={1}
						>
							<imagebutton
								Size={new UDim2(0.3, 0, 0.15, 0)}
								Position={new UDim2(0.5, 0, 0.92, 0)}
								AnchorPoint={new Vector2(0.5, 1)}
								Image={(() => {
									if (status === "NOT_OWNED") return ASSETS.BUY_BUTTON;
									if (status === "EQUIPPED") return ASSETS.UNEQUIP_BUTTON;
									if (status === "OWNED") return ASSETS.EQUIP_BUTTON;
								})()}
								Event={{
									MouseButton1Click: () => {
										if (status === "NOT_OWNED") {
											if (this.classDataController.buyClass(selectedClass).await()[0]) {
												this.setState({ status: "OWNED" });
											}
										} else if (status === "EQUIPPED") {
											if (this.classDataController.unequipClass().await()[0]) {
												this.setState({ status: "OWNED" });
											}
										} else if (status === "OWNED") {
											if (this.classDataController.equipClass(selectedClass).await()[0]) {
												this.setState({ status: "EQUIPPED" });
											}
										}
									},
								}}
								BackgroundTransparency={1}
							></imagebutton>
						</imagelabel>
					) : undefined}
				</frame>
			</screengui>
		);
	}
}
