import { makeHello } from "shared/module";
import { Flamework } from "@flamework/core";
import { GlobalDataEvents } from "shared/networking/Data";

print(makeHello("main.client.ts"));

Flamework.addPaths("src/client/controllers");
Flamework.addPaths("src/client/components");
Flamework.ignite();

GlobalDataEvents.createClient({}).clientReady.fire();
