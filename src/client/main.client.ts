import { Flamework } from "@flamework/core";
import { GlobalDataEvents } from "shared/networking/Data";

Flamework.addPaths("src/client/controllers");
Flamework.addPaths("src/client/components");
Flamework.ignite();

GlobalDataEvents.createClient({}).clientReady.fire();
