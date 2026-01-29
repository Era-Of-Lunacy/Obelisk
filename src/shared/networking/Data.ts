import { Networking } from "@flamework/networking";
import { DatabaseEvents } from "shared/types/database";
import { Database } from "shared/types/database.types";

type User = Database["public"]["Tables"]["users"]["Row"];
type Class = Database["public"]["Tables"]["classes"]["Row"];

interface ClientToServerEvents {
	clientReady(): void;
	userDataUpdated(data: Partial<User>): void;
	classDataUpdated(event: DatabaseEvents, data: Class): void;
}

interface ServerToClientEvents {
	clientReady(): void;
	userDataUpdated(data: Partial<User>): void;
	classDataUpdated(event: DatabaseEvents, data: Class): void;
}

export const GlobalDataEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
