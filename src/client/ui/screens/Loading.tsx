import React from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { RootState } from "client/producers";

const selectLoading = (state: RootState) => state.loading;

export default function Loading() {
	const loading = useSelector(selectLoading);

	return (
		<screengui IgnoreGuiInset ResetOnSpawn={false} ZIndexBehavior={Enum.ZIndexBehavior.Sibling}>
			{/* Background */}
			<frame Size={new UDim2(1, 0, 1, 0)} BackgroundColor3={Color3.fromRGB(15, 15, 18)} BorderSizePixel={0}>
				{/* Center Container */}
				<frame
					Size={new UDim2(0, 500, 0, 200)}
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={new UDim2(0.5, 0, 0.5, 0)}
					BackgroundColor3={Color3.fromRGB(30, 30, 35)}
					BorderSizePixel={0}
				>
					<uicorner CornerRadius={new UDim(0, 12)} />

					<uipadding
						PaddingTop={new UDim(0, 20)}
						PaddingBottom={new UDim(0, 20)}
						PaddingLeft={new UDim(0, 25)}
						PaddingRight={new UDim(0, 25)}
					/>

					<uigridlayout
						CellSize={new UDim2(1, 0, 0, 50)}
						CellPadding={new UDim2(0, 0, 0, 10)}
						SortOrder={Enum.SortOrder.LayoutOrder}
					/>

					{/* Title */}
					<textlabel
						Text="Loading Game"
						BackgroundTransparency={1}
						TextColor3={Color3.fromRGB(255, 255, 255)}
						TextScaled
						Font={Enum.Font.GothamBold}
					/>

					{/* Progress Bar Container */}
					<canvasgroup
						Size={new UDim2(1, 0, 0, 20)}
						BackgroundColor3={Color3.fromRGB(45, 45, 50)}
						BorderSizePixel={0}
					>
						<uicorner CornerRadius={new UDim(1, 0)} />

						{/* Progress Fill */}
						<frame
							Size={new UDim2(loading.loadedAssets / loading.totalAssets, 0, 1, 0)}
							BackgroundColor3={Color3.fromRGB(0, 200, 120)}
							BorderSizePixel={0}
						></frame>
					</canvasgroup>

					{/* Percent */}
					<textlabel
						Text={`${math.floor((loading.loadedAssets / loading.totalAssets) * 100)}%`}
						BackgroundTransparency={1}
						TextColor3={Color3.fromRGB(200, 200, 200)}
						TextScaled
						Font={Enum.Font.Gotham}
					/>

					{/* Asset Name */}
					<textlabel
						Text={loading.assetName}
						BackgroundTransparency={1}
						TextColor3={Color3.fromRGB(150, 150, 150)}
						TextScaled
						Font={Enum.Font.Gotham}
					/>
				</frame>
			</frame>
		</screengui>
	);
}
