import Signal from "@rbxts/signal";
import { DatabaseEvents } from "server/types/database";
import { Users } from "shared/types/users";

export const cachedUsers: Record<number, Users> = {};
export const userUpdatedEvent = new Signal<(event: DatabaseEvents, id: number, data: Users) => void>();

export function getUserData(id: number): Users | undefined {
	return cachedUsers[id];
}

export function updateUser(id: number, data: Partial<Users>): boolean {
	if (!cachedUsers[id]) return false;

	cachedUsers[id] = { ...cachedUsers[id], ...data };
	userUpdatedEvent.Fire(DatabaseEvents.Updated, id, cachedUsers[id]);
	return true;
}
