import { SupabaseClient } from "@rbxts/roblox-postgrest";
import { $env } from "rbxts-transform-env";
import { SupabaseStream, SupabaseRealtimeEvent } from "server/database/supabase";
import { Class } from "shared/types/classes";
import { setClass, updateClass, deleteClass } from "server/handlers/data/classes/class-data";

const client = new SupabaseClient(
	`https://${$env.string("PROJECT_ID")}.supabase.co`,
	$env.string("SECRET_API_KEY", ""),
);

const result = client.from("classes").select("*").execute<Class>();
if (result.success === true && result.data !== undefined) {
	for (const classData of result.data) {
		if (classData.enabled === true) {
			setClass(classData.class, classData);
		}
	}
} else {
	warn("Failed to load classes from database");
}

const stream = new SupabaseStream(
	`wss://${$env.string("PROJECT_ID")}.supabase.co/realtime/v1/websocket?apikey=${$env.string("SECRET_API_KEY", "")}`,
);

stream.join<Class>("classes", (event: SupabaseRealtimeEvent<Class>) => {
	const recordType = event.payload.data.type;
	const record = event.payload.data.record;
	const className = record.class;

	switch (recordType) {
		case "INSERT":
			setClass(className, record);
			break;

		case "UPDATE":
			updateClass(className, record);
			break;

		case "DELETE":
			deleteClass(className);
			break;
	}
});
