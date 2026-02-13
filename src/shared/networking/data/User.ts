import { Networking } from "@flamework/networking";
import { DatabaseEvents, UserUpdate } from "@shared/types/database";

// Events

interface ClientToServerEvents {}

interface ServerToClientEvents {
	userDataUpdated: (event: DatabaseEvents, data: UserUpdate) => void;
}

export const UserEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
