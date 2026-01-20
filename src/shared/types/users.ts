export type Users = Record<number, User>;

export interface User {
	id: number;
	class: string;
	owned_classes: string[];
	bwambles: number;
	created_at: string;
	updated_at: string;
	deleted_at: string | undefined;
	is_playing: boolean;
}
