import Roact from "@rbxts/roact";
import { buyClass, equipClass, getEquippedClass, hasClass, unequipClass } from "client/handlers/class-handler";
import { Class } from "shared/types/classes";

interface State {
	selectedClass: Class;
	status: "OWNED" | "NOT_OWNED" | "EQUIPPED";
}

interface ClassData {
	buttonAssetId: string;
	menuAssetId: string;
}

const ASSETS = {
	SHOP_BACKGROUND: "rbxassetid://89656385134836",
	BUY_BUTTON: "rbxassetid://72885642612132",
	EQUIP_BUTTON: "rbxassetid://127144135009399",
	UNEQUIP_BUTTON: "rbxassetid://74393977413624",
};

const CLASS_MAP: Record<Class, ClassData> = {
	[Class.None]: {
		buttonAssetId: "",
		menuAssetId: "",
	},
	[Class.Healer]: {
		buttonAssetId: "rbxassetid://136404071020838",
		menuAssetId: "rbxassetid://83674339989895",
	},
	[Class.Coil]: {
		buttonAssetId: "rbxassetid://128754631865960",
		menuAssetId: "rbxassetid://124734743837199",
	},
	[Class.Error]: {
		buttonAssetId: "rbxassetid://100328064637043",
		menuAssetId: "rbxassetid://131890840284064",
	},
};

export default class ClassShop extends Roact.Component<object, State> {
	constructor(props: object) {
		super(props);

		this.state = {
			selectedClass: Class.None,
			status: "NOT_OWNED",
		};
	}

	render() {
		const classButtons: Roact.Element[] = [];

		for (const [classType, item] of pairs(CLASS_MAP)) {
			classButtons.push(
				<imagebutton
					Image={item.buttonAssetId}
					BackgroundTransparency={1}
					Event={{
						Activated: () => {
							if (!hasClass(classType)) {
								this.setState({
									status: "NOT_OWNED",
								});
							} else if (getEquippedClass() === classType) {
								this.setState({
									status: "EQUIPPED",
								});
							} else {
								this.setState({
									status: "OWNED",
								});
							}

							if (this.state.selectedClass === classType) {
								this.setState({
									selectedClass: Class.None,
								});

								return;
							}

							this.setState({
								selectedClass: classType,
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
					{selectedClass !== Class.None && selectedClass !== undefined ? (
						<imagelabel
							Size={new UDim2(0.6, 0, 1.2, 0)}
							Position={new UDim2(1, 0, 0.5, 0)}
							AnchorPoint={new Vector2(1, 0.5)}
							Image={CLASS_MAP[selectedClass].menuAssetId}
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
