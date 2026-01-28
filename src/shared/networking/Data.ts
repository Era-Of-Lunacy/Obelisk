import { Networking } from "@flamework/networking";
import { Database } from "shared/types/database.types";

type User = Database["public"]["Tables"]["users"]["Row"];

interface ClientToServerFunctions {
	getUserData(): User | undefined;
}

export const GlobalDataFunctions = Networking.createFunction<ClientToServerFunctions, undefined>();
