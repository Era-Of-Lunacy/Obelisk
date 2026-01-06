import { SupabaseClient } from "server/database/supabase";
import { $env } from "rbxts-transform-env";
import { Users } from "shared/types/tables/users";

const client = new SupabaseClient(
	`https://${$env.string("PROJECT_ID")}.supabase.co`,
	$env.string("SECRET_API_KEY", ""),
);

export function getCurrency(player: Player): number {
	return client.select<Users>("users", `*&id=eq.${player.UserId}`).data?.[0].bwambles ?? 0;
}

export function setCurrency(player: Player, amount: number): boolean {
	return client.update<Users>("users", `id=eq.${player.UserId}`, { bwambles: amount }).success;
}
