export interface DataCache<T> {
	status: "loading" | "saving" | "ready" | "error" | "clearing";
	data: T | undefined;
}
