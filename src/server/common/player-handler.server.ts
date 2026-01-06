import { Players } from "@rbxts/services";
import { $env } from "rbxts-transform-env";
import { SupabaseClient } from "server/database/supabase";

if ($env.boolean("PROJECT_ID") && $env.boolean("API_KEY")) {
	const client = new SupabaseClient($env.string("PROJECT_ID", ""), $env.string("API_KEY", ""));

	Players.PlayerAdded.Connect((player) => {
		const result = client.upsert("users", {
			id: player.UserId,
			username: player.Name,
		});

		if (!result.success) {
			warn("Error while upserting user data: " + result.error);
		}
	});
} else {
	warn("Supabase credentials not found in environment variables");
}
