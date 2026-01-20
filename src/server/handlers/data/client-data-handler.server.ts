import { Players, ReplicatedStorage } from "@rbxts/services";
import { getUserData, userUpdatedEvent } from "server/handlers/data/user-data";
import { DatabaseEvents } from "server/types/database";
import { Classes } from "shared/types/classes";
import { Users } from "shared/types/users";
import { WaitForPath } from "shared/utils/path";
import { classUpdatedEvent, getAllClassData } from "./class-data";

const clientReadyEvent = WaitForPath<RemoteEvent>(ReplicatedStorage, "remote-events/client-ready");

const userUpdatedRemoteEvent = WaitForPath<RemoteEvent<(data: Users) => void>>(
	ReplicatedStorage,
	"remote-events/user-updated",
);

const classCreatedRemoteEvent = WaitForPath<RemoteEvent<(data: Classes) => void>>(
	ReplicatedStorage,
	"remote-events/class-created",
);
const classUpdatedRemoteEvent = WaitForPath<RemoteEvent<(data: Classes) => void>>(
	ReplicatedStorage,
	"remote-events/class-updated",
);
const classDeletedRemoteEvent = WaitForPath<RemoteEvent<(data: Classes) => void>>(
	ReplicatedStorage,
	"remote-events/class-deleted",
);

clientReadyEvent.OnServerEvent.Connect((player) => {
	const userData = getUserData(player.UserId);
	const classData = getAllClassData();

	if (userData !== undefined) {
		userUpdatedRemoteEvent.FireClient(player, userData);
	}

	if (classData !== undefined) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		for (const [_, classInfo] of pairs(classData)) {
			classCreatedRemoteEvent.FireClient(player, classInfo);
		}
	}
});

userUpdatedEvent.Connect((event, data) => {
	if (event === DatabaseEvents.Updated) {
		const player = Players.GetPlayerByUserId(data.id);

		if (player) {
			userUpdatedRemoteEvent.FireClient(player, data);
		}
	} else if (event === DatabaseEvents.Created) {
		const player = Players.GetPlayerByUserId(data.id);

		if (player) {
			userUpdatedRemoteEvent.FireClient(player, data);
		}
	} else if (event === DatabaseEvents.Deleted) {
		const player = Players.GetPlayerByUserId(data.id);

		if (player) {
			userUpdatedRemoteEvent.FireClient(player, data);
		}
	}
});

classUpdatedEvent.Connect((event, data) => {
	if (event === DatabaseEvents.Updated) {
		classUpdatedRemoteEvent.FireAllClients(data);
	} else if (event === DatabaseEvents.Created) {
		classCreatedRemoteEvent.FireAllClients(data);
	} else if (event === DatabaseEvents.Deleted) {
		classDeletedRemoteEvent.FireAllClients(data);
	}
});
