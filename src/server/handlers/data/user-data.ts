import Signal from "@rbxts/signal";
import { DatabaseEvents } from "server/types/database";
import { Users } from "shared/types/users";

export const cachedUsers: Record<number, Users> = {};
export const userUpdatedEvent = new Signal<(event: DatabaseEvents, id: number, data: Users) => void>();
