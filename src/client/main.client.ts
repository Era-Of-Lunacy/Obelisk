import { Flamework } from "@flamework/core";
import { GlobalEvents } from "@shared/networking/Global";

Flamework.addPaths("src/client/controllers");
Flamework.addPaths("src/client/components");
Flamework.ignite();

GlobalEvents.createClient({}).ready.fire();
