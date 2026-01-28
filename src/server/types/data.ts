export interface DataCache<T> {
	status: "loading" | "saving" | "ready" | "clearing";
	data: T | undefined;
}
