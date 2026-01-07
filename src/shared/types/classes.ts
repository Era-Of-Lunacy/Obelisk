export enum Class {
	None = "None",
	Healer = "Healer",
	Coil = "Coil",
	Error = "Error",
}

export interface Classes {
	class: Class;
	price: number;
}
