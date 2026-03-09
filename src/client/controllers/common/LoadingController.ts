import { Controller, OnStart } from "@flamework/core";
import { createElement } from "@rbxts/react";
import { createRoot } from "@rbxts/react-roblox";
import { ReflexProvider } from "@rbxts/react-reflex";
import { ContentProvider, Players, ReplicatedFirst } from "@rbxts/services";
import { StatusEvent } from "shared/networking/common/Status";
import { producer, RootState } from "client/producers";
import Loading from "client/ui/screens/Loading";

type PlayerModule = {
	GetControls(this: PlayerModule): {
		Enable(): void;
		Disable(): void;
	};
};

@Controller()
export default class LoadingController implements OnStart {
	private statusEvent = StatusEvent.createClient({});

	onStart() {
		ReplicatedFirst.RemoveDefaultLoadingScreen();

		const playerScripts = Players.LocalPlayer.WaitForChild("PlayerScripts");
		const playerModule = require(playerScripts.WaitForChild("PlayerModule") as ModuleScript) as PlayerModule;
		const controls = playerModule.GetControls();

		const root = createRoot(Players.LocalPlayer.WaitForChild("PlayerGui"));

		controls.Disable();

		root.render(createElement(ReflexProvider<RootState>, { producer: producer }, createElement(Loading)));

		const assets = game.GetDescendants();
		const total = assets.size();

		producer.setTotalAssets(total);

		for (let i = 0; i < total; i++) {
			const asset = assets[i];

			if (!asset) continue;

			pcall(() => {
				ContentProvider.PreloadAsync([asset]);
			});

			producer.setAssetName(asset.Name);
			producer.setLoadedAssets(i + 1);
		}

		producer.setAssetName("All assets loaded!");

		controls.Enable();

		this.statusEvent.ready.fire();
	}
}
