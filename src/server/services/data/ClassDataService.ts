import { OnStart, Service } from "@flamework/core";
import { SupabaseClient } from "@rbxts/roblox-supabase";
import { HttpService } from "@rbxts/services";
import { $env } from "rbxts-transform-env";
import { SupabaseStream, SupabaseRealtimeEvent } from "server/database/supabase";
import { Database } from "shared/types/database.types";
import { DatabaseEvents } from "shared/types/database";
import { GlobalDataEvents } from "shared/networking/Data";
import { Class, ClassType } from "shared/types/database";
import UserDataService from "server/services/data/UserDataService";
import { ClassFunctions } from "shared/networking/Class";

@Service()
export default class ClassDataService implements OnStart {
	private supabase: SupabaseClient<Database>;
	private stream: SupabaseStream;
	private cachedClasses: Map<ClassType, Class> = new Map();
	private remoteEvents = GlobalDataEvents.createServer({});
	private remoteFunctions = ClassFunctions.createServer({});

	constructor(private userDataService: UserDataService) {
		this.supabase = new SupabaseClient<Database>(
			`https://${$env.string("PROJECT_ID")}.supabase.co`,
			HttpService.GetSecret("SUPABASE_ANON_KEY"),
		);

		this.stream = new SupabaseStream(
			`wss://${$env.string("PROJECT_ID")}.supabase.co/realtime/v1/websocket?apikey=${$env.string("SECRET_API_KEY", "")}`,
		);

		this.remoteFunctions.buyClass.setCallback((player, classId) => this.buyClass(player, classId));
		this.remoteFunctions.equipClass.setCallback((player, classId) => this.equipClass(player, classId));
		this.remoteFunctions.unequipClass.setCallback((player) => this.unequipClass(player));
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

	getData(classId: ClassType): Class | undefined {
		return this.cachedClasses.get(classId);
	}

	getAllClasses(): Map<ClassType, Class> {
		return this.cachedClasses;
	}

	buyClass(player: Player, classId: ClassType): boolean {
		const playerData = this.userDataService.getData(player);
		const classData = this.getData(classId);

		if (!playerData || !classData) return false;
		if (playerData.owned_classes?.includes(classId)) return false;
		if (playerData.bwambles < classData.price) return false;

		this.userDataService.updateData(player, {
			owned_classes: playerData.owned_classes ? [...playerData.owned_classes, classId] : [classId],
			bwambles: playerData.bwambles - classData.price,
		});

		return true;
	}

	equipClass(player: Player, classId: ClassType): boolean {
		const playerData = this.userDataService.getData(player);
		const classData = this.getData(classId);

		if (!playerData || !classData) return false;

		if (playerData.class === classId) return false;
		if (!playerData.owned_classes?.includes(classId)) return false;

		this.userDataService.updateData(player, { class: classId });

		return true;
	}

	unequipClass(player: Player): boolean {
		const playerData = this.userDataService.getData(player);

		if (!playerData) return false;
		if (playerData.class === undefined) return false;

		this.userDataService.updateData(player, { class: undefined });

		return true;
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
