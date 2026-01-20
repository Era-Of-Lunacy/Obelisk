import { ReplicatedStorage } from "@rbxts/services";
import { WaitForPath } from "shared/utils/path";
import { Users } from "shared/types/users";

const usersUpdatedEvent = WaitForPath<RemoteEvent<(data: Users) => void>>(
	ReplicatedStorage,
	"remote-events/user-updated",
);

let userData: Users;

usersUpdatedEvent.OnClientEvent.Connect((data) => {
	userData = data;
});

export function getUserData() {
	return userData;
}
