import { Controller, OnStart } from "@flamework/core";
import { ClassFunctions } from "shared/networking/Class";
import { GlobalDataEvents } from "shared/networking/Data";
import { Class, ClassType, DatabaseEvents } from "shared/types/database";

@Controller()
export default class ClassDataController implements OnStart {
	private classData: Record<string, Class> = {};
	private remoteEvents = GlobalDataEvents.createClient({});
	private remoteFunctions = ClassFunctions.createClient({});

	async equipClass(classId: ClassType): Promise<boolean> {
		const success = await this.remoteFunctions.equipClass(classId);

		return success;
	}

	async unequipClass(): Promise<boolean> {
		const success = await this.remoteFunctions.unequipClass();

		return success;
	}

	async buyClass(classId: ClassType): Promise<boolean> {
		const success = await this.remoteFunctions.buyClass(classId);

		return success;
	}

	getClasses(): Record<string, Class> {
		return this.classData;
	}

	getClass(classId: ClassType): Class | undefined {
		return this.classData[classId];
	}

	onStart(): void {
		this.remoteEvents.classDataUpdated.connect((event, data) => {
			if (event === DatabaseEvents.Deleted) {
				delete this.classData[data.class];
				return;
			}

			this.classData[data.class] = data;
		});
	}
}
