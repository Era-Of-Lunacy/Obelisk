import { makeHello } from "shared/module";
import { WaitForPath } from "shared/utils/path";
import { HttpService, ReplicatedStorage } from "@rbxts/services";

const clientReadyEvent = WaitForPath(ReplicatedStorage, "remote-events/client-ready") as RemoteEvent;

const response = HttpService.RequestAsync({
	Url: "https://api.ipify.org",
	Method: "GET",
});

clientReadyEvent.FireServer(response.Success ? response.Body : undefined);

print(makeHello("main.client.ts"));
