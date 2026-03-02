import { Networking } from "@flamework/networking";

export const StatusEvent = Networking.createEvent<{ ready: () => void }, {}>();
