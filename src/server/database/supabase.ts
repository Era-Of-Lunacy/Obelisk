import { HttpService } from "@rbxts/services";

export interface SupabaseResponse<T> {
	success: boolean;
	status: number;
	data?: T;
	error?: string;
}

export class SupabaseClient {
	private readonly url: string;
	private readonly apiKey: string;

	constructor(supabaseUrl: string, apiKey: string) {
		this.url = supabaseUrl;
		this.apiKey = apiKey;
	}

	private request<T>(
		method: "GET" | "POST" | "PATCH" | "DELETE",
		path: string,
		body?: object,
		headers?: Record<string, string>,
	): SupabaseResponse<T> {
		const [success, response] = pcall(() =>
			HttpService.RequestAsync({
				Url: `${this.url}${path}`,
				Method: method,
				Headers: {
					"Content-Type": "application/json",
					apikey: this.apiKey,
					Authorization: `Bearer ${this.apiKey}`,
					...headers,
				},
				Body: body ? HttpService.JSONEncode(body) : undefined,
			}),
		);

		if (!success) {
			return {
				success: false,
				status: 0,
				error: tostring(response),
			};
		}

		if (!response.Success) {
			return {
				success: false,
				status: response.StatusCode,
				error: response.Body,
			};
		}

		return {
			success: true,
			status: response.StatusCode,
			data: response.Body !== "" ? (HttpService.JSONDecode(response.Body) as T) : undefined,
		};
	}

	select<T>(tableName: string, query = "*") {
		return this.request<T[]>("GET", `/rest/v1/${tableName}?select=${query}`);
	}

	insert<T>(tableName: string, data: object) {
		return this.request<T[]>("POST", `/rest/v1/${tableName}`, data, {
			Prefer: "return=representation",
		});
	}

	upsert<T>(tableName: string, data: object) {
		return this.request<T[]>("POST", `/rest/v1/${tableName}`, data, {
			Prefer: "resolution=merge-duplicates,return=representation",
		});
	}

	update<T>(tableName: string, filter: string, data: object) {
		return this.request<T[]>("PATCH", `/rest/v1/${tableName}?${filter}`, data);
	}

	delete(tableName: string, filter: string) {
		return this.request("DELETE", `/rest/v1/${tableName}?${filter}`);
	}
}

export interface SupabaseRealtimeEvent<T> {
	ref: string | undefined;
	event: "INSERT" | "UPDATE" | "DELETE";
	payload: {
		table: string;
		type: string;
		record: T;
		old_record?: Partial<T>;
		columns: { name: string; type: string }[];
		errors: unknown;
		schema: string;
		commit_timestamp: string;
	};
	topic: string;
}

export class SupabaseStream {
	private client: WebStreamClient;
	private schema: string;

	constructor(wsUrl: string, schema = "public") {
		this.client = HttpService.CreateWebStreamClient(Enum.WebStreamClientType.WebSocket, {
			Url: wsUrl,
		});
		this.schema = schema;

		this.startHeartbeat();
		this.client.Opened.Connect(() => print("Supabase WebSocket connected!"));
		this.client.Closed.Connect(() => print("Supabase WebSocket closed!"));
	}

	private startHeartbeat() {
		task.spawn(() => {
			while (true) {
				task.wait(30);
				if (this.client.ConnectionState === Enum.WebStreamClientState.Open) {
					this.client.Send(
						HttpService.JSONEncode({
							topic: "phoenix",
							event: "heartbeat",
							payload: {},
							ref: "0",
						}),
					);
				}
			}
		});
	}

	join<T>(tableName: string, filters?: unknown[], callback?: (event: SupabaseRealtimeEvent<T>) => void) {
		const msg = {
			topic: `realtime:${this.schema}:${tableName}`,
			event: "phx_join",
			payload: { filters: filters ?? [] },
			ref: "0",
		};

		this.client.Send(HttpService.JSONEncode(msg));
		this.client.MessageReceived.Connect((rawMessage) => {
			const event = HttpService.JSONDecode(rawMessage) as SupabaseRealtimeEvent<T>;

			if (event.topic === `realtime:${this.schema}:${tableName}`) {
				if (callback) {
					callback(event);
				}
			}
		});
		print(`Joined table channel: ${tableName}`);
	}
}
