import { User } from "shared/types/users";

let userData: User;

export function getUser() {
	return userData;
}

export function setUser(data: User) {
	userData = data;
}
