import Signal from "@rbxts/signal";
import { DatabaseEvents } from "server/types/database";
import { User } from "shared/types/users";

export const cachedUsers: Record<number, User> = {};
export const userUpdatedEvent = new Signal<(event: DatabaseEvents, data: User) => void>();

export function getUserData(id: number): User | undefined {
	return cachedUsers[id];
}

export function updateUser(id: number, data: Partial<User>): boolean {
	if (!cachedUsers[id]) return false;

	cachedUsers[id] = { ...cachedUsers[id], ...data };
	userUpdatedEvent.Fire(DatabaseEvents.Updated, cachedUsers[id]);
	return true;
}
