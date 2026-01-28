import { OnStart, Service } from "@flamework/core";
import { SupabaseClient } from "@rbxts/roblox-supabase";
import { HttpService } from "@rbxts/services";
import { $env } from "rbxts-transform-env";
import { SupabaseStream, SupabaseRealtimeEvent } from "server/database/supabase";
import { Database } from "shared/types/database.types";
import { DatabaseEvents } from "shared/types/database";
import { GlobalDataEvents } from "shared/networking/Data";

export type Class = Database["public"]["Tables"]["classes"]["Row"];
export type ClassUpdate = Database["public"]["Tables"]["classes"]["Update"];
export type ClassEnum = Database["public"]["Enums"]["class"];

@Service()
export default class ClassDataService implements OnStart {
	private supabase: SupabaseClient<Database>;
	private stream: SupabaseStream;
	private cachedClasses: Map<ClassEnum, Class> = new Map();
	private remoteEvents = GlobalDataEvents.createServer({});

	constructor() {
		this.supabase = new SupabaseClient<Database>(
			`https://${$env.string("PROJECT_ID")}.supabase.co`,
			HttpService.GetSecret("SUPABASE_ANON_KEY"),
		);

		this.stream = new SupabaseStream(
			`wss://${$env.string("PROJECT_ID")}.supabase.co/realtime/v1/websocket?apikey=${$env.string("SECRET_API_KEY", "")}`,
		);
	}

	private async loadAllClassData(): Promise<void> {
		try {
			const response = await this.supabase.from("classes").select("*").execute();

			if (response.error) {
				warn(`Failed to load classes from database: ${response.error.message}`);
				return;
			}

			this.cachedClasses.clear();

			for (const classData of response.data) {
				if (classData.enabled === true) {
					this.cachedClasses.set(classData.class, classData);
					this.remoteEvents.classDataUpdated.broadcast(DatabaseEvents.Created, classData);
				}
			}

			print(`Loaded ${this.cachedClasses.size()} classes from database`);
		} catch (err) {
			warn(`Error loading classes: ${err}`);
		}
	}

	getData(classId: ClassEnum): Class | undefined {
		return this.cachedClasses.get(classId);
	}

	getAllClasses(): Map<ClassEnum, Class> {
		return this.cachedClasses;
	}

	onStart(): void {
		this.loadAllClassData();

		this.stream.join<Class>("classes", (event: SupabaseRealtimeEvent<Class>) => {
			const recordType = event.payload.data.type;
			const record = event.payload.data.record;
			const className = record.class;

			switch (recordType) {
				case "INSERT":
					if (record.enabled === true) {
						this.cachedClasses.set(className, record);
						this.remoteEvents.classDataUpdated.broadcast(DatabaseEvents.Created, record);
					}
					break;

				case "UPDATE":
					if (this.cachedClasses.has(className)) {
						const updatedClass = { ...this.cachedClasses.get(className)!, ...record };

						if (updatedClass.enabled === false) {
							this.cachedClasses.delete(className);
							this.remoteEvents.classDataUpdated.broadcast(DatabaseEvents.Deleted, record);
						} else {
							this.cachedClasses.set(className, updatedClass);
							this.remoteEvents.classDataUpdated.broadcast(DatabaseEvents.Updated, updatedClass);
						}
					} else if (record.enabled === true) {
						this.cachedClasses.set(className, record);
						this.remoteEvents.classDataUpdated.broadcast(DatabaseEvents.Created, record);
					}
					break;

				case "DELETE":
					if (this.cachedClasses.has(className)) {
						const data = this.cachedClasses.get(className);
						if (data) {
							this.cachedClasses.delete(className);
							this.remoteEvents.classDataUpdated.broadcast(DatabaseEvents.Deleted, data);
						}
					}
					break;
			}
		});
	}
}
