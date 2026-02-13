import { Networking } from "@flamework/networking";

interface ClientToServerEvents {
	ready: () => void;
}

interface ServerToClientEvents {}

export const GlobalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
