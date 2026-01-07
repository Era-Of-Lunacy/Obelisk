import Roact from "@rbxts/roact";
import { makeHello } from "shared/module";
import ClassShop from "client/components/class-shop";
import { WaitForPath } from "shared/utils/path";
import { ReplicatedStorage } from "@rbxts/services";

const clientReadyEvent = WaitForPath(ReplicatedStorage, "remote-events/client-ready") as RemoteEvent;

clientReadyEvent.FireServer();

Roact.mount(
	Roact.createElement(ClassShop),
	game.GetService("Players").LocalPlayer.WaitForChild("PlayerGui") as Instance,
);

print(makeHello("main.client.ts"));
