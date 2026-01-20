import Signal from "@rbxts/signal";
import { DatabaseEvents } from "shared/types/database";
import { User } from "shared/types/users";

const cachedUsers: Record<number, User> = {};

export function setUser(id: number, data: User): boolean {
	if (cachedUsers[id]) return false;

	cachedUsers[id] = data;
	userUpdatedEvent.Fire(DatabaseEvents.Created, data);
	return true;
}

export function getAllUsers(): Record<number, User> {
	return cachedUsers;
}

export function getUser(id: number): User | undefined {
	return cachedUsers[id];
}

export function updateUser(id: number, data: Partial<User>): boolean {
	if (!cachedUsers[id]) return false;

	cachedUsers[id] = { ...cachedUsers[id], ...data };
	userUpdatedEvent.Fire(DatabaseEvents.Updated, cachedUsers[id]);
	return true;
}

export function deleteUser(id: number): boolean {
	if (!cachedUsers[id]) return false;

	delete cachedUsers[id];
	userUpdatedEvent.Fire(DatabaseEvents.Deleted, cachedUsers[id]);
	return true;
}

export const userUpdatedEvent = new Signal<(event: DatabaseEvents, data: User) => void>();
