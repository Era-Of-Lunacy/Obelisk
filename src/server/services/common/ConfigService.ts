import { Flamework, Service } from "@flamework/core";
import { $warn } from "rbxts-transform-debug";

@Service()
export default class ConfigService {
  private snapshot: ConfigSnapshot | undefined;

  constructor() {
    // TODO: Retry while success to load config
    try {
      const snapshot = game.GetService("ConfigService").GetConfigAsync();
      this.snapshot = snapshot;

      this.snapshot.UpdateAvailable.Connect(() => {
        snapshot.Refresh()
      })
    } catch {
      $warn("Error while getting config")
    }
  }

  getConfig<T>(name: string):
    | { success: true; value: T }
    | { success: false; value?: undefined } {
    if (!this.snapshot) return { success: false, value: undefined };

    const value = this.snapshot.GetValue(name) as T;
    const guard = Flamework.createGuard<T>();

    if (guard(value)) return { success: true, value: value }

    return { success: false, value: undefined };
  }
}
