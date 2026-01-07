import { Class } from "shared/types/classes";

export interface Users {
	id: number;
	class: Class;
	owned_classes: Class[];
	bwambles: number;
	used_ips: string[];
	created_at: string;
	updated_at: string;
	deleted_at: string | undefined;
}
