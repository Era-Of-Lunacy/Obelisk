import { ReplicatedStorage } from "@rbxts/services";
import { WaitForPath } from "shared/utils/path";
import { Users } from "shared/types/users";

const usersUpdatedEvent = WaitForPath(ReplicatedStorage, "remote-events/user-updated") as RemoteEvent<
	(data: Partial<Users>) => void
>;

let userData: Partial<Users> = {};

usersUpdatedEvent.OnClientEvent.Connect((data) => {
	userData = data;
});

export function getUserData() {
	return userData;
}
