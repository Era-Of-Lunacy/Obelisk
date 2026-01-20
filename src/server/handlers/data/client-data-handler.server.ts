import { Players, ReplicatedStorage } from "@rbxts/services";
import { getUser, userUpdatedEvent } from "server/handlers/data/users/user-data";
import { DatabaseEvents } from "shared/types/database";
import { Class } from "shared/types/classes";
import { User } from "shared/types/users";
import { WaitForPath } from "shared/utils/path";
import { getAllClasses, classUpdatedEvent } from "server/handlers/data/classes/class-data";

const clientReadyEvent = WaitForPath<RemoteEvent>(ReplicatedStorage, "remote-events/client-ready");

const userUpdatedRemoteEvent = WaitForPath<RemoteEvent<(event: DatabaseEvents, data: User) => void>>(
	ReplicatedStorage,
	"remote-events/user-updated",
);
const classUpdatedRemoteEvent = WaitForPath<RemoteEvent<(event: DatabaseEvents, data: Class) => void>>(
	ReplicatedStorage,
	"remote-events/class-updated",
);

clientReadyEvent.OnServerEvent.Connect((player) => {
	const userData = getUser(player.UserId);
	const classData = getAllClasses();

	if (userData !== undefined) {
		userUpdatedRemoteEvent.FireClient(player, DatabaseEvents.Created, userData);
	}

	if (classData !== undefined) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		for (const [_, classInfo] of pairs(classData)) {
			classUpdatedRemoteEvent.FireClient(player, DatabaseEvents.Created, classInfo);
		}
	}
});

userUpdatedEvent.Connect((event, data) => {
	const player = Players.GetPlayerByUserId(data.id);

	if (player) {
		userUpdatedRemoteEvent.FireClient(player, event, data);
	}
});

classUpdatedEvent.Connect((event, data) => {
	classUpdatedRemoteEvent.FireAllClients(event, data);
});
