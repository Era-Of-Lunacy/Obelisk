import Signal from "@rbxts/signal";
import { $env } from "rbxts-transform-env";
import { SupabaseClient, SupabaseStream } from "server/database/supabase";

const client = new SupabaseClient(
	`https://${$env.string("PROJECT_ID")}.supabase.co`,
	$env.string("SECRET_API_KEY", ""),
);

const stream = new SupabaseStream(
	`wss://${$env.string("PROJECT_ID")}.supabase.co/realtime/v1/websocket?apikey=${$env.string("SECRET_API_KEY")}`,
	"public",
);

export enum Class {
	None = "None",
	Healer = "Healer",
}

export interface Users {
	id: number;
	class: Class;
	owned_classes: Class[];
	bwambles: number;
	created_at: string;
	updated_at: string;
	deleted_at: string | undefined;
}

export async function createUser(player: Player) {
	return client.request<Users[]>(
		"POST",
		"/rest/v1/users",
		{ id: player.UserId },
		{
			Prefer: "return=representation",
		},
	);
}

export async function upsertUser(
	player: Player,
	data: Partial<Omit<Users, "created_at" | "updated_at" | "deleted_at">>,
) {
	return client.request<Users[]>("POST", `/rest/v1/users?id=eq.${player.UserId}`, data, {
		Prefer: "resolution=merge-duplicates,return=representation",
	});
}

export async function getUser(player: Player) {
	return client.request<Users[]>("GET", `/rest/v1/users?id=eq.${player.UserId}&deleted_at=is.null`);
}

export async function updateUser(
	player: Player,
	data: Partial<Omit<Users, "created_at" | "updated_at" | "deleted_at">>,
) {
	return client.request<Users[]>("PATCH", `/rest/v1/users?id=eq.${player.UserId}&deleted_at=is.null`, data, {
		Prefer: "return=representation",
	});
}

export async function deleteUser(player: Player) {
	return client.request<Users[]>("DELETE", `/rest/v1/users?id=eq.${player.UserId}&deleted_at=is.null`);
}

export const userUpdatedEvent = new Signal<(data: Partial<Users>) => void>();

stream.join<Users>("users", (event) => {
	userUpdatedEvent.Fire(event.payload.data.record);
});
