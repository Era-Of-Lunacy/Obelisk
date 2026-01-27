import { Flamework } from "@flamework/core";
import { makeHello } from "shared/module";

print(makeHello("main.server.ts"));

Flamework.ignite();
