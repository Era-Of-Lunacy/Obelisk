import Signal from "@rbxts/signal";
import { DatabaseEvents } from "server/types/database";
import { Class } from "shared/types/classes";

export const cachedClasses: Record<string, Class> = {};
export const classUpdatedEvent = new Signal<(event: DatabaseEvents, data: Class) => void>();

export function getAllClassData(): Record<string, Class> {
	return cachedClasses;
}

export function getClassData(className: string): Class | undefined {
	return cachedClasses[className];
}
