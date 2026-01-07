export enum Class {
	None = "None",
	Healer = "Healer",
	Coil = "Coil",
	Error = "Error",
}

export interface Users {
	id: number;
	class: Class;
	owned_classes: Class[];
	bwambles: number;
	created_at: string;
	updated_at: string;
	deleted_at: string | undefined;
}
