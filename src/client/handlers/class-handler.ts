import { ReplicatedStorage } from "@rbxts/services";
import { WaitForPath } from "shared/utils/path";
import { getUser } from "./data/users/user-data";

const buyClassFunction = WaitForPath<RemoteFunction<(classType: string) => boolean>>(
	ReplicatedStorage,
	"remote-functions/buy-class",
);
const equipClassFunction = WaitForPath<RemoteFunction<(classType: string) => boolean>>(
	ReplicatedStorage,
	"remote-functions/equip-class",
);
const unequipClassFunction = WaitForPath<RemoteFunction<() => boolean>>(
	ReplicatedStorage,
	"remote-functions/unequip-class",
);

export function hasClass(classType: string): boolean {
	return getUser().owned_classes?.includes(classType) ?? false;
}

export function getEquippedClass(): string {
	return getUser().class ?? "None";
}

export function buyClass(classType: string): boolean {
	return buyClassFunction.InvokeServer(classType);
}

export function equipClass(classType: string): boolean {
	return equipClassFunction.InvokeServer(classType);
}

export function unequipClass(): boolean {
	return unequipClassFunction.InvokeServer();
}
