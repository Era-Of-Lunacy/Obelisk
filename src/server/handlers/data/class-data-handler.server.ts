import { SupabaseClient } from "@rbxts/roblox-postgrest";
import { $env } from "rbxts-transform-env";
import { SupabaseStream, SupabaseRealtimeEvent } from "server/database/supabase";
import { DatabaseEvents } from "server/types/database";
import { Classes } from "shared/types/classes";
import { cachedClasses, classUpdatedEvent } from "server/handlers/data/class-data";

const client = new SupabaseClient(
	`https://${$env.string("PROJECT_ID")}.supabase.co`,
	$env.string("SECRET_API_KEY", ""),
);

const result = client.from("classes").select("*").execute<Classes[]>();

if (result.success === true && result.data !== undefined) {
	let loadedCount = 0;

	for (const classData of result.data as unknown as Classes[]) {
		if (classData.enabled === true) {
			cachedClasses[classData.class] = classData;
			classUpdatedEvent.Fire(DatabaseEvents.Created, classData);
			loadedCount += 1;
		}
	}
	print(`Loaded ${loadedCount} classes`);
} else {
	warn("Failed to load classes from database");
}

const wsUrl = `wss://${$env.string("PROJECT_ID")}.supabase.co/realtime/v1/websocket?apikey=${$env.string(
	"ANON_API_KEY",
	"",
)}`;
const stream = new SupabaseStream(wsUrl);

stream.join<Classes>("classes", (event: SupabaseRealtimeEvent<Classes>) => {
	const recordType = event.payload.data.type;
	const record = event.payload.data.record;
	const className = record.class;

	switch (recordType) {
		case "INSERT":
			if (record.enabled === true) {
				cachedClasses[className] = record;
				classUpdatedEvent.Fire(DatabaseEvents.Created, record);
				print(`Class added: ${className}`);
			}
			break;

		case "UPDATE":
			if (record.enabled === true && cachedClasses[className] !== undefined) {
				cachedClasses[className] = record;
				classUpdatedEvent.Fire(DatabaseEvents.Updated, record);
				print(`Class updated: ${className}`);
			} else if (record.enabled !== true && cachedClasses[className] !== undefined) {
				delete cachedClasses[className];
				classUpdatedEvent.Fire(DatabaseEvents.Deleted, record);
				print(`Class disabled: ${className}`);
			} else if (record.enabled === true && cachedClasses[className] === undefined) {
				cachedClasses[className] = record;
				classUpdatedEvent.Fire(DatabaseEvents.Created, record);
				print(`Class enabled: ${className}`);
			}
			break;

		case "DELETE":
			if (cachedClasses[className] !== undefined) {
				const deletedClass = cachedClasses[className];
				delete cachedClasses[className];
				classUpdatedEvent.Fire(DatabaseEvents.Deleted, deletedClass);
				print(`Class deleted: ${className}`);
			}
			break;
	}
});
