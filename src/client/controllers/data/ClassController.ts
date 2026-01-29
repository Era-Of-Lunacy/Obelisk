import { Controller } from "@flamework/core";
import { ClassFunctions } from "shared/networking/Class";
import { ClassType } from "shared/types/database";

@Controller()
export default class ClassController {
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
}
