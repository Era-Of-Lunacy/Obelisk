import Signal from "@rbxts/signal";
import { DatabaseEvents } from "shared/types/database";
import { Class } from "shared/types/classes";

const cachedClasses: Record<string, Class> = {};

export function setClass(className: string, classData: Class): boolean {
	if (cachedClasses[className]) return false;

	cachedClasses[className] = classData;
	classUpdatedEvent.Fire(DatabaseEvents.Created, classData);
	return true;
}

export function getAllClasses(): Record<string, Class> {
	return cachedClasses;
}

export function getClass(className: string): Class | undefined {
	return cachedClasses[className];
}

export function updateClass(className: string, data: Partial<Class>): boolean {
	if (!cachedClasses[className]) return false;

	cachedClasses[className] = { ...cachedClasses[className], ...data };
	classUpdatedEvent.Fire(DatabaseEvents.Updated, cachedClasses[className]);
	return true;
}

export function deleteClass(className: string): boolean {
	if (!cachedClasses[className]) return false;

	delete cachedClasses[className];
	classUpdatedEvent.Fire(DatabaseEvents.Deleted, cachedClasses[className]);
	return true;
}

export const classUpdatedEvent = new Signal<(event: DatabaseEvents, data: Class) => void>();
