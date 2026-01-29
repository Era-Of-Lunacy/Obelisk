import { Controller } from "@flamework/core";
import { ClassFunctions } from "shared/networking/Class";
import { Database } from "shared/types/database.types";

type ClassEnum = Database["public"]["Enums"]["class"];

@Controller()
export default class ClassController {
	private remoteFunctions = ClassFunctions.createClient({});

	async equipClass(classId: ClassEnum): Promise<boolean> {
		const success = await this.remoteFunctions.equipClass(classId);

		return success;
	}

	async unequipClass(): Promise<boolean> {
		const success = await this.remoteFunctions.unequipClass();

		return success;
	}

	async buyClass(classId: ClassEnum): Promise<boolean> {
		const success = await this.remoteFunctions.buyClass(classId);

		return success;
	}
}
