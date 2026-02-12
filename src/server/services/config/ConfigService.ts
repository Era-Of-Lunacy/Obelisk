import { Service } from "@flamework/core";

@Service()
export default class ConfigService {
	private snapshot;

	constructor() {
		this.snapshot = game.GetService("ConfigService").GetConfigAsync();

		this.snapshot.UpdateAvailable.Connect(() => {
			this.snapshot.Refresh();
		});
	}

	getConfig<T>(name: string): T {
		return this.snapshot.GetValue(name) as T;
	}
}
