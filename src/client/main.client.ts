import { Flamework } from "@flamework/core";
import { StatusEvent } from "shared/networking/common/Status";

const statusEvent = StatusEvent.createClient({});

Flamework.addPaths("src/client/controllers");
Flamework.ignite();

statusEvent.ready.fire();
