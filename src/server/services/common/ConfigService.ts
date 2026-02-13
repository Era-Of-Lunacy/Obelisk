import { Flamework, Service } from "@flamework/core";

@Service()
export default class ConfigService {
  private snapshot;

  constructor() {
    this.snapshot = game.GetService("ConfigService").GetConfigAsync();

    this.snapshot.UpdateAvailable.Connect(() => {
      this.snapshot.Refresh();
    });
  }

  getConfig<T>(name: string):
    | { success: true; value: T }
    | { success: false; value?: undefined } {
      const value = this.snapshot.GetValue(name) as T;
      const guard = Flamework.createGuard<T>();

      if (guard(value)) return { success: true, value: value }

      return {success: false, value: undefined};
  }
}
