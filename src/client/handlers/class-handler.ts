import { Class } from "shared/types/classes";
import { getUserData } from "client/handlers/users-handler";
import { ReplicatedStorage } from "@rbxts/services";
import { WaitForPath } from "shared/utils/path";

const buyClassFunction = WaitForPath<RemoteFunction>(ReplicatedStorage, "remote-functions/buy-class");
const equipClassFunction = WaitForPath<RemoteFunction>(ReplicatedStorage, "remote-functions/equip-class");
const unequipClassFunction = WaitForPath<RemoteFunction>(ReplicatedStorage, "remote-functions/unequip-class");

export function hasClass(classType: Class): boolean {
	return getUserData().owned_classes?.includes(classType) ?? false;
}

export function getEquippedClass(): Class {
	return getUserData().class ?? Class.None;
}

export function buyClass(classType: Class): boolean {
	return buyClassFunction.InvokeServer(classType) as boolean;
}

export function equipClass(classType: Class): boolean {
	return equipClassFunction.InvokeServer(classType) as boolean;
}

export function unequipClass(): boolean {
	return unequipClassFunction.InvokeServer() as boolean;
}
