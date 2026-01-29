import { Controller, OnStart } from "@flamework/core";
import { GlobalDataEvents } from "shared/networking/Data";
import { Database } from "shared/types/database.types";

export type User = Database["public"]["Tables"]["users"]["Row"];

@Controller()
export default class UserDataController implements OnStart {
	private remoteEvents = GlobalDataEvents.createClient({});
	private userData: Partial<User> = {};

	onStart(): void {
		this.remoteEvents.userDataUpdated.connect((userData) => {
			this.userData = { ...this.userData, ...userData };
		});
	}

	getData(): Partial<User> {
		return this.userData;
	}
}
