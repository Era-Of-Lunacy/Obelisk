export enum Class {
	Healer = "Healer",
}

export interface Users {
	id: number;
	class: Class | undefined;
	owned_classes: Class[];
	bwambles: number;
	created_at: string;
}
