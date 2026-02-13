import { Networking } from "@flamework/networking";
import { ClassType, ClassUpdate, DatabaseEvents } from "@shared/types/database";

// Functions

interface ClientToServerFunctions {
	buyClass: (classType: ClassType) => boolean;
	equipClass: (classType: ClassType) => boolean;
	unequipClass: () => boolean;
}

interface ServerToClientFunctions {}

// Events

interface ClientToServerEvents {}

interface ServerToClientEvents {
	classDataUpdated: (event: DatabaseEvents, data: ClassUpdate) => void;
}

export const ClassFunctions = Networking.createFunction<ClientToServerFunctions, ServerToClientFunctions>();
export const ClassEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
