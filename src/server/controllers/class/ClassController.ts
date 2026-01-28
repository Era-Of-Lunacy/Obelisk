import { Controller } from "@flamework/core";
import ClassDataService, { ClassEnum } from "server/services/data/ClassDataService";
import UserDataService from "server/services/data/UserDataService";
import { ClassFunctions } from "shared/networking/Class";

@Controller()
export default class ClassController {
	private remoteFunctions = ClassFunctions.createServer({});

	constructor(
		private userDataService: UserDataService,
		private classDataService: ClassDataService,
	) {
		this.remoteFunctions.buyClass.setCallback(this.buyClass);
		this.remoteFunctions.equipClass.setCallback(this.equipClass);
		this.remoteFunctions.unequipClass.setCallback(this.unequipClass);
	}

	private buyClass(player: Player, classId: ClassEnum): boolean {
		const playerData = this.userDataService.getData(player);
		const classData = this.classDataService.getData(classId);

		if (!playerData || !classData) return false;
		if (playerData.owned_classes?.includes(classId)) return false;
		if (playerData.bwambles < classData.price) return false;

		this.userDataService.updateData(player, {
			owned_classes: playerData.owned_classes ? [...playerData.owned_classes, classId] : [classId],
			bwambles: playerData.bwambles - classData.price,
		});

		return true;
	}

	private equipClass(player: Player, classId: ClassEnum): boolean {
		const playerData = this.userDataService.getData(player);
		const classData = this.classDataService.getData(classId);

		if (!playerData || !classData) return false;

		if (playerData.class === classId) return false;
		if (!playerData.owned_classes?.includes(classId)) return false;

		this.userDataService.updateData(player, { class: classId });

		return true;
	}

	private unequipClass(player: Player): boolean {
		const playerData = this.userDataService.getData(player);

		if (!playerData) return false;
		if (playerData.class === undefined) return false;

		this.userDataService.updateData(player, { class: undefined });

		return true;
	}
}
