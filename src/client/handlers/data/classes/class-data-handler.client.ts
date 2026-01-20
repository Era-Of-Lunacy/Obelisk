import { ReplicatedStorage } from "@rbxts/services";
import { Class } from "shared/types/classes";
import { WaitForPath } from "shared/utils/path";
import { setClass } from "client/handlers/data/classes/class-data";
import { DatabaseEvents } from "shared/types/database";

const classesUpdatedEvent = WaitForPath<RemoteEvent<(event: DatabaseEvents, data: Class) => void>>(
	ReplicatedStorage,
	"remote-events/class-updated",
);

classesUpdatedEvent.OnClientEvent.Connect((event, data) => {
	if (event === DatabaseEvents.Created || event === DatabaseEvents.Updated) {
		setClass(data.class, data);
	}
});
