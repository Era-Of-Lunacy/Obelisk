import Roact from "@rbxts/roact";
import {
	buyClass,
	equipClass,
	getEquippedClass,
	getClassData,
	hasClass,
	unequipClass,
} from "client/handlers/class-handler";

interface State {
	selectedClass: string;
	status: "OWNED" | "NOT_OWNED" | "EQUIPPED";
}

const ASSETS = {
	SHOP_BACKGROUND: "rbxassetid://89656385134836",
	BUY_BUTTON: "rbxassetid://72885642612132",
	EQUIP_BUTTON: "rbxassetid://127144135009399",
	UNEQUIP_BUTTON: "rbxassetid://74393977413624",
};

export default class ClassShop extends Roact.Component<object, State> {
	constructor(props: object) {
		super(props);

		this.state = {
			selectedClass: "None",
			status: "NOT_OWNED",
		};
	}

	render() {
		const classButtons: Roact.Element[] = [];
		const classes = getClassData();

		const classesArray = [];
		for (const [className, classInfo] of pairs(classes)) {
			classesArray.push({
				...classInfo,
				className: className,
			});
		}

		table.sort(classesArray, (a, b) => {
			return (a?.price ?? 0) < (b?.price ?? 0);
		});

		for (const classInfo of classesArray) {
			if (classInfo.icon_image_id === undefined || classInfo.enabled === false) continue;

			classButtons.push(
				<imagebutton
					Image={classInfo.icon_image_id}
					BackgroundTransparency={1}
					Event={{
						Activated: () => {
							if (!hasClass(classInfo.className)) {
								this.setState({
									status: "NOT_OWNED",
								});
							} else if (getEquippedClass() === classInfo.className) {
								this.setState({
									status: "EQUIPPED",
								});
							} else {
								this.setState({
									status: "OWNED",
								});
							}

							if (this.state.selectedClass === classInfo.className) {
								this.setState({
									selectedClass: "None",
								});

								return;
							}

							this.setState({
								selectedClass: classInfo.className,
							});
						},
					}}
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
							<uigridlayout CellSize={new UDim2(0.4, 0, 0.4, 0)} HorizontalAlignment="Center" />
							{classButtons}
						</scrollingframe>
					</imagelabel>
					{selectedClass !== "None" &&
					selectedClass !== undefined &&
					getClassData()[selectedClass]?.full_image_id !== undefined ? (
						<imagelabel
							Size={new UDim2(0.6, 0, 1.2, 0)}
							Position={new UDim2(1, 0, 0.5, 0)}
							AnchorPoint={new Vector2(1, 0.5)}
							Image={getClassData()[selectedClass].full_image_id}
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
											if (buyClass(selectedClass)) {
												this.setState({ status: "OWNED" });
											}
										} else if (status === "EQUIPPED") {
											if (unequipClass()) {
												this.setState({ status: "OWNED" });
											}
										} else if (status === "OWNED") {
											if (equipClass(selectedClass)) {
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
