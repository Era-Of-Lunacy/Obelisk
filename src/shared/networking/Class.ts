import { Networking } from "@flamework/networking";
import { Database } from "shared/types/database.types";

type ClassEnum = Database["public"]["Enums"]["class"];

interface ClientToServerFunctions {
	buyClass(classId: ClassEnum): boolean;
	equipClass(classId: ClassEnum): boolean;
	unequipClass(): boolean;
}

interface ServerToClientEvents {
	buyClass(classId: ClassEnum): boolean;
	equipClass(classId: ClassEnum): boolean;
	unequipClass(): boolean;
}

export const ClassFunctions = Networking.createFunction<ClientToServerFunctions, ServerToClientEvents>();
