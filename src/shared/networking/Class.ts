import { Networking } from "@flamework/networking";
import { ClassType } from "shared/types/database";

interface ClientToServerFunctions {
	buyClass: (classId: ClassType) => boolean;
	equipClass: (classId: ClassType) => boolean;
	unequipClass: () => boolean;
}

interface ServerToClientFunctions {
	buyClass: (classId: ClassType) => boolean;
	equipClass: (classId: ClassType) => boolean;
	unequipClass: () => boolean;
}

export const ClassFunctions = Networking.createFunction<ClientToServerFunctions, ServerToClientFunctions>();
