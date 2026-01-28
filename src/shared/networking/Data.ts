import { Networking } from "@flamework/networking";
import { DatabaseEvents } from "shared/types/database";
import { Database } from "shared/types/database.types";

type UserUpdate = Database["public"]["Tables"]["users"]["Update"];
type ClassUpdate = Database["public"]["Tables"]["classes"]["Update"];

interface ClientToServerEvents {
	clientReady(): void;
	userDataUpdated(data: UserUpdate): void;
	classDataUpdated(event: DatabaseEvents, data: ClassUpdate): void;
}

interface ServerToClientEvents {
	clientReady(): void;
	userDataUpdated(data: UserUpdate): void;
	classDataUpdated(event: DatabaseEvents, data: ClassUpdate): void;
}

export const GlobalDataEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
