export interface DataCache<T> {
	status: "loading" | "saving" | "ready";
	data: T;
}
