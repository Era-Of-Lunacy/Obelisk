import { SupabaseClient } from "@rbxts/roblox-postgrest";
import { $env } from "rbxts-transform-env";
import { SupabaseStream, SupabaseRealtimeEvent } from "server/database/supabase";
import { DatabaseEvents } from "server/types/database";
import { Class } from "shared/types/classes";
import {
	setClass,
	getClass,
	updateClass,
	deleteClass,
	classUpdatedEvent,
} from "server/handlers/data/classes/class-data";

const client = new SupabaseClient(
	`https://${$env.string("PROJECT_ID")}.supabase.co`,
	$env.string("SECRET_API_KEY", ""),
);

const result = client.from("classes").select("*").execute<Class>();

if (result.success === true && result.data !== undefined) {
	for (const classData of result.data) {
		if (classData.enabled === true) {
			setClass(classData.class, classData);
			classUpdatedEvent.Fire(DatabaseEvents.Created, classData);
		}
	}
} else {
	warn("Failed to load classes from database");
}

const wsUrl = `wss://${$env.string("PROJECT_ID")}.supabase.co/realtime/v1/websocket?apikey=${$env.string(
	"SECRET_API_KEY",
	"",
)}`;
const stream = new SupabaseStream(wsUrl);

stream.join<Class>("classes", (event: SupabaseRealtimeEvent<Class>) => {
	const recordType = event.payload.data.type;
	const record = event.payload.data.record;
	const className = record.class;

	switch (recordType) {
		case "INSERT":
			if (record.enabled === true) {
				setClass(className, record);
				classUpdatedEvent.Fire(DatabaseEvents.Created, record);
				print(`Class added: ${className}`);
			}
			break;

		case "UPDATE":
			if (record.enabled === true && getClass(className) !== undefined) {
				updateClass(className, record);
				classUpdatedEvent.Fire(DatabaseEvents.Updated, record);
				print(`Class updated: ${className}`);
			} else if (record.enabled !== true && getClass(className) !== undefined) {
				deleteClass(className);
				classUpdatedEvent.Fire(DatabaseEvents.Deleted, record);
				print(`Class disabled: ${className}`);
			} else if (record.enabled === true && getClass(className) === undefined) {
				setClass(className, record);
				classUpdatedEvent.Fire(DatabaseEvents.Created, record);
				print(`Class enabled: ${className}`);
			}
			break;

		case "DELETE":
			if (getClass(className) !== undefined) {
				deleteClass(className);
				classUpdatedEvent.Fire(DatabaseEvents.Deleted, record);
				print(`Class deleted: ${className}`);
			}
			break;
	}
});
