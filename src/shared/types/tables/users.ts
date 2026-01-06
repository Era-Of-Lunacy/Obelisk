export enum Class {
	Healer,
}

export interface Users {
	id: number;
	created_at: string;
	bwambles: number;
	class: Class | undefined;
}
