import { useFlameworkDependency } from "@rbxts/flamework-react-utils";
import React, { Element, useState } from "@rbxts/react";
import ClassDataController from "client/controllers/data/ClassDataController";
import UserDataController from "client/controllers/data/UserDataController";
import { ClassType } from "shared/types/database";

const ASSETS = {
	SHOP_BACKGROUND: "rbxassetid://89656385134836",
	BUY_BUTTON: "rbxassetid://72885642612132",
	EQUIP_BUTTON: "rbxassetid://127144135009399",
	UNEQUIP_BUTTON: "rbxassetid://74393977413624",
};

export function ClassShop() {
	const classDataController = useFlameworkDependency<ClassDataController>();
	const userDataController = useFlameworkDependency<UserDataController>();

	const [state, setState] = useState({
		selectedClass: "None" as ClassType,
		status: "NOT_OWNED" as "OWNED" | "NOT_OWNED" | "EQUIPPED",
	});

	const updateStatus = (selectedClass: ClassType) => {
		if (!userDataController.getData().owned_classes?.includes(selectedClass)) {
			setState((prev) => ({ ...prev, status: "NOT_OWNED" }));
		} else if (userDataController.getData().class === selectedClass) {
			setState((prev) => ({ ...prev, status: "EQUIPPED" }));
		} else {
			setState((prev) => ({ ...prev, status: "OWNED" }));
		}
	};

	const handleClassSelection = (classType: ClassType) => {
		// Toggle selection if already selected
		if (state.selectedClass === classType) {
			setState((prev) => ({ ...prev, selectedClass: "None" }));
			return;
		}

		// Otherwise select the class and update status
		setState((prev) => ({ ...prev, selectedClass: classType }));
		updateStatus(classType);
	};

	const handleButtonClick = async () => {
		const { selectedClass, status } = state;

		if (status === "NOT_OWNED") {
			const [success] = await classDataController.buyClass(selectedClass).await();
			if (success) {
				setState((prev) => ({ ...prev, status: "OWNED" }));
			}
		} else if (status === "EQUIPPED") {
			const [success] = await classDataController.unequipClass().await();
			if (success) {
				setState((prev) => ({ ...prev, status: "OWNED" }));
			}
		} else if (status === "OWNED") {
			const [success] = await classDataController.equipClass(selectedClass).await();
			if (success) {
				setState((prev) => ({ ...prev, status: "EQUIPPED" }));
			}
		}
	};

	const classButtons: Element[] = [];
	const classes = classDataController.getClasses();

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	for (const [_, value] of pairs(classes)) {
		if (value.enabled !== true) continue;

		classButtons.push(
			<imagebutton
				Image={value.icon_image_id}
				BackgroundTransparency={1}
				Event={{
					Activated: () => {
						handleClassSelection(value.class);
					},
				}}
				LayoutOrder={value.price}
			>
				<uiaspectratioconstraint AspectRatio={1} DominantAxis="Height" />
			</imagebutton>,
		);
	}

	const { selectedClass, status } = state;

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
				classDataController.getClass(selectedClass)?.full_image_id !== undefined ? (
					<imagelabel
						Size={new UDim2(0.6, 0, 1.2, 0)}
						Position={new UDim2(1, 0, 0.5, 0)}
						AnchorPoint={new Vector2(1, 0.5)}
						Image={classDataController.getClass(selectedClass)?.full_image_id}
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
								MouseButton1Click: handleButtonClick,
							}}
							BackgroundTransparency={1}
						></imagebutton>
					</imagelabel>
				) : undefined}
			</frame>
		</screengui>
	);
}
