import { makeHello } from "shared/module";
import { WaitForPath } from "shared/utils/path";
import { ReplicatedStorage } from "@rbxts/services";
import { Flamework } from "@flamework/core";

const clientReadyEvent = WaitForPath(ReplicatedStorage, "remote-events/client-ready") as RemoteEvent;

clientReadyEvent.FireServer();

print(makeHello("main.client.ts"));

Flamework.ignite();
