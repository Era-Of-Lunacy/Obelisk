import { User } from "shared/types/users";

let userData: User;

export function getUserData() {
	return userData;
}

export function setUserData(data: User) {
	userData = data;
}
