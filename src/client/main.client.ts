import { makeHello } from "shared/module";
import { WaitForPath } from "shared/utils/path";
import { ReplicatedStorage } from "@rbxts/services";

const clientReadyEvent = WaitForPath(ReplicatedStorage, "remote-events/client-ready") as RemoteEvent;

clientReadyEvent.FireServer();

print(makeHello("main.client.ts"));
