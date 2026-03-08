import { Controller, OnStart } from "@flamework/core";
import { createElement } from "@rbxts/react";
import { createRoot } from "@rbxts/react-roblox";
import { Players } from "@rbxts/services";
import Redirect from "client/ui/screens/Redirect";
import { RedirectEvent } from "shared/networking/common/Redirect";

@Controller()
export default class RedirectController implements OnStart {
  private redirectEvent = RedirectEvent.createClient({});

  onStart(): void {
    this.redirectEvent.showRedirectGui.connect((msg, sec) => {
      const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui");
      const root = createRoot(playerGui);

      root.render(createElement(Redirect, { message: msg, seconds: sec }));
    });
  }
}
