import Signal from "@rbxts/signal";
import { DatabaseEvents } from "server/types/database";
import { Classes } from "shared/types/classes";

export const cachedClasses: Record<string, Classes> = {};
export const classUpdatedEvent = new Signal<(event: DatabaseEvents, data: Classes) => void>();

export function getAllClassData(): Record<string, Classes> {
	return cachedClasses;
}

export function getClassData(className: string): Classes | undefined {
	return cachedClasses[className];
}
