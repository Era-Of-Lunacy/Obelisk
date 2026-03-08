import React, { useEffect, useState } from "@rbxts/react";
import { ContentProvider } from "@rbxts/services";

export default function Loading() {
	const [progress, setProgress] = useState(0);
	const [loadingAsset, setLoadingAsset] = useState("Initializing...");

	useEffect(() => {
		const assets = game.GetDescendants();

		task.spawn(() => {
			assets.forEach((asset, i) => {
				ContentProvider.PreloadAsync([asset]);
				setLoadingAsset("Loading: " + asset.Name);
				setProgress((i + 1) / assets.size());
			});

			setLoadingAsset("All assets loaded!");
		});
	}, []);

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
							Size={new UDim2(progress, 0, 1, 0)}
							BackgroundColor3={Color3.fromRGB(0, 200, 120)}
							BorderSizePixel={0}
						></frame>
					</canvasgroup>

					{/* Percent */}
					<textlabel
						Text={`${math.floor(progress * 100)}%`}
						BackgroundTransparency={1}
						TextColor3={Color3.fromRGB(200, 200, 200)}
						TextScaled
						Font={Enum.Font.Gotham}
					/>

					{/* Asset Name */}
					<textlabel
						Text={loadingAsset}
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
