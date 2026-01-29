import { Controller, OnStart } from "@flamework/core";
import { GlobalDataEvents } from "shared/networking/Data";
import { User } from "shared/types/database";

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
