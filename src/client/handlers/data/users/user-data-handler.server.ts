import { ReplicatedStorage } from "@rbxts/services";
import { User } from "shared/types/users";
import { WaitForPath } from "shared/utils/path";
import { setUserData } from "client/handlers/data/users/user-data";
import { DatabaseEvents } from "shared/types/database";

const usersUpdatedEvent = WaitForPath<RemoteEvent<(event: DatabaseEvents, data: User) => void>>(
	ReplicatedStorage,
	"remote-events/user-updated",
);

usersUpdatedEvent.OnClientEvent.Connect((event, data) => {
	if (event === DatabaseEvents.Created || event === DatabaseEvents.Updated) {
		setUserData(data);
	}
});
