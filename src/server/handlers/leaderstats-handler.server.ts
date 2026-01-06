import { Players } from "@rbxts/services";
import { $env } from "rbxts-transform-env";
import { SupabaseStream } from "server/database/supabase";
import { Users } from "shared/types/tables/users";
import { getUser } from "./data/user-handler";

const stream = new SupabaseStream(
	`wss://${$env.string("PROJECT_ID")}.supabase.co/realtime/v1/websocket?apikey=${$env.string("SECRET_API_KEY")}`,
	"public",
);

const leaderstats = new Map<Player, Instance[]>();

Players.PlayerAdded.Connect((player) => {
	const Leaderstats = new Instance("Folder");
	Leaderstats.Name = "leaderstats";
	Leaderstats.Parent = player;

	const bwambles = new Instance("IntValue");
	bwambles.Name = "Bwambles";
	bwambles.Parent = Leaderstats;
	bwambles.Value = getUser(player)?.bwambles ?? 0;

	leaderstats.set(player, [bwambles]);
});

stream.join<Users>("users", undefined, (event) => {
	if (event.event !== "UPDATE" && event.event !== "DELETE" && event.event !== "INSERT") return;

	const player = Players.GetPlayerByUserId(event.payload.record.id);
	if (player) {
		const bwambles = leaderstats.get(player)?.[0] as IntValue;

		if (bwambles) {
			bwambles.Value = event.payload.record.bwambles ?? 0;
		}
	}
});
