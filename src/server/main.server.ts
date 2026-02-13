import { Flamework } from "@flamework/core";
import { $git } from "rbxts-transform-debug";

Flamework.addPaths("src/server/services");
Flamework.addPaths("src/server/components");
Flamework.ignite();

print("Server Version: ", $git().Commit)
