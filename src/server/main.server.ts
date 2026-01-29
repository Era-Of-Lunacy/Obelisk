import { Flamework } from "@flamework/core";
import { makeHello } from "shared/module";

print(makeHello("main.server.ts"));

Flamework.addPaths("src/server/services");
Flamework.addPaths("src/server/controllers");
Flamework.addPaths("src/server/components");
Flamework.ignite();
