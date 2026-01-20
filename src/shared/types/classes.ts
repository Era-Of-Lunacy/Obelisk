export type Classes = Record<string, Class>;

export interface Class {
	class: string;
	price: number;
	icon_image_id: string;
	full_image_id: string;
	enabled: boolean;
}
