import { Networking } from "@flamework/networking";
import { Database } from "shared/types/database.types";

type UserUpdate = Database["public"]["Tables"]["users"]["Update"];

interface ClientToServerEvents {
	clientReady(): void;
	userDataUpdated(data: UserUpdate): void;
}

interface ServerToClientEvents {
	clientReady(): void;
	userDataUpdated(data: UserUpdate): void;
}

export const GlobalDataEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
