export interface DataCache<T> {
	status: "loading" | "saving" | "ready" | "error";
	data: T | undefined;
}
