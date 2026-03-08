import { Flamework } from "@flamework/core";
import { createElement } from "@rbxts/react";
import { createRoot } from "@rbxts/react-roblox";
import { Players, ReplicatedFirst } from "@rbxts/services";
import { StatusEvent } from "shared/networking/common/Status";
import Loading from "./ui/screens/Loading";

ReplicatedFirst.RemoveDefaultLoadingScreen();

const statusEvent = StatusEvent.createClient({});

Flamework.addPaths("src/client/controllers");
Flamework.ignite();

statusEvent.ready.fire();

const root = createRoot(Players.LocalPlayer.WaitForChild("PlayerGui"));
root.render(createElement(Loading));
