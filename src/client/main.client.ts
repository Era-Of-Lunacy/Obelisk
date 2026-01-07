import { makeHello } from "shared/module";
import { WaitForPath } from "shared/utils/path";
import { HttpService, ReplicatedStorage } from "@rbxts/services";

const clientReadyEvent = WaitForPath(ReplicatedStorage, "remote-events/client-ready") as RemoteEvent;

HttpService.CreateWebStreamClient(Enum.WebStreamClientType.WebSocket, {
	Url: "ws://ip.waffly.xyz:8080",
}).MessageReceived.Connect((ip) => {
	clientReadyEvent.FireServer(ip);
});

print(makeHello("main.client.ts"));
