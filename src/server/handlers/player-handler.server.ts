import { Players } from "@rbxts/services";
import { $env } from "rbxts-transform-env";
import { SupabaseClient } from "server/database/supabase";

if ($env.boolean("PROJECT_ID") && $env.boolean("SECRET_API_KEY")) {
	const client = new SupabaseClient(
		`https://${$env.string("PROJECT_ID")}.supabase.co`,
		$env.string("SECRET_API_KEY", ""),
	);

	Players.PlayerAdded.Connect((player) => {
		const result = client.upsert("users", {
			id: player.UserId,
		});

		if (!result.success) {
			warn("Error while upserting user data: " + result.error);
		}
	});
} else {
	warn("Supabase credentials not found in environment variables");
}
