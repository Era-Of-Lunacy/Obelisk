import { Networking } from "@flamework/networking";

export const RedirectEvent = Networking.createEvent<{}, { showRedirectGui(msg: string, sec: number): void }>();
