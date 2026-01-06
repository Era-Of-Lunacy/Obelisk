import { SupabaseClient } from "server/database/supabase";
import { $env } from "rbxts-transform-env";
import { Users } from "shared/types/tables/users";

const client = new SupabaseClient(
	`https://${$env.string("PROJECT_ID")}.supabase.co`,
	$env.string("SECRET_API_KEY", ""),
);

export function createUser(player: Player): boolean {
	const result = client.insert<Users>("users", { id: player.UserId });

	if (!result.success) {
		warn("Error while creating user data: " + result.error);
	}

	return result.success;
}

export function getUser(player: Player): Users | undefined {
	const result = client.select<Users>("users", `*&id=eq.${player.UserId}`);

	if (!result.success) {
		warn("Error while getting user data: " + result.error);
	}

	return result.data?.[0];
}

export function updateUser(player: Player, data: Partial<Users>): boolean {
	const result = client.update<Users>("users", `id=eq.${player.UserId}`, data);

	if (!result.success) {
		warn("Error while updating user data: " + result.error);
	}

	return result.success;
}

export function upsertUser(data: Partial<Users>): boolean {
	const result = client.upsert<Users>("users", { data });

	if (!result.success) {
		warn("Error while upserting user data: " + result.error);
	}

	return result.success;
}

export function deleteUser(player: Player): boolean {
	const result = client.delete("users", `id=eq.${player.UserId}`);

	if (!result.success) {
		warn("Error while deleting user data: " + result.error);
	}

	return result.success;
}
