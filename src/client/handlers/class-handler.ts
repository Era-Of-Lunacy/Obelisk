import { getUserData } from "client/handlers/users-handler";
import { ReplicatedStorage } from "@rbxts/services";
import { WaitForPath } from "shared/utils/path";
import { Classes } from "shared/types/classes";

const buyClassFunction = WaitForPath<RemoteFunction>(ReplicatedStorage, "remote-functions/buy-class");
const equipClassFunction = WaitForPath<RemoteFunction>(ReplicatedStorage, "remote-functions/equip-class");
const unequipClassFunction = WaitForPath<RemoteFunction>(ReplicatedStorage, "remote-functions/unequip-class");

const classCreatedRemoteEvent = WaitForPath(ReplicatedStorage, "remote-events/class-created") as RemoteEvent<
	(data: Partial<Classes> & { class: string }) => void
>;
const classUpdatedRemoteEvent = WaitForPath(ReplicatedStorage, "remote-events/class-updated") as RemoteEvent<
	(data: Partial<Classes> & { class: string }) => void
>;
const classDeletedRemoteEvent = WaitForPath(ReplicatedStorage, "remote-events/class-deleted") as RemoteEvent<
	(data: Partial<Classes> & { class: string }) => void
>;

const classData: Record<string, Partial<Classes>> = {};

classCreatedRemoteEvent.OnClientEvent.Connect((data) => {
	if (data && data.class) {
		classData[data.class] = data;
	}
});

classUpdatedRemoteEvent.OnClientEvent.Connect((data) => {
	if (data && data.class) {
		classData[data.class] = { ...classData[data.class], ...data };
	}
});

classDeletedRemoteEvent.OnClientEvent.Connect((data) => {
	if (data && data.class) {
		delete classData[data.class];
	}
});

export function getClassData(): Record<string, Partial<Classes>> {
	return classData;
}

export function getClass(className: string): Partial<Classes> | undefined {
	return classData[className];
}

export function hasClass(classType: string): boolean {
	return getUserData().owned_classes?.includes(classType) ?? false;
}

export function getEquippedClass(): string {
	return getUserData().class ?? "None";
}

export function buyClass(classType: string): boolean {
	return buyClassFunction.InvokeServer(classType) as boolean;
}

export function equipClass(classType: string): boolean {
	return equipClassFunction.InvokeServer(classType) as boolean;
}

export function unequipClass(): boolean {
	return unequipClassFunction.InvokeServer() as boolean;
}
