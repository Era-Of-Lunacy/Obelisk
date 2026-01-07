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

	public async request<T>(
		method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE",
		path: string,
		body?: object,
		headers?: Record<string, string>,
	): Promise<SupabaseResponse<T>> {
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
			throw {
				success: false,
				status: 0,
				error: tostring(response),
			};
		} else {
			return {
				success: true,
				status: response.StatusCode,
				data: response.Body !== "" ? (HttpService.JSONDecode(response.Body) as T) : undefined,
			};
		}
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
	private subscriptions: Map<string, (event: SupabaseRealtimeEvent<unknown>) => void> = new Map();
	private heartbeatTask: thread | undefined;

	constructor(wsUrl: string, schema = "public") {
		this.client = HttpService.CreateWebStreamClient(Enum.WebStreamClientType.WebSocket, {
			Url: wsUrl,
		});
		this.schema = schema;

		this.startHeartbeat();
		this.client.Opened.Connect(() => print("Supabase WebSocket connected!"));
		this.client.Closed.Connect(() => {
			if (this.heartbeatTask) task.cancel(this.heartbeatTask);
			print("Supabase WebSocket closed!");
		});
		this.client.MessageReceived.Connect((raw) => {
			const data = HttpService.JSONDecode(raw) as SupabaseRealtimeEvent<unknown>;
			const callback = this.subscriptions.get(data.topic);

			if (callback && (data.event === "INSERT" || data.event === "UPDATE" || data.event === "DELETE")) {
				callback(data);
			}
		});
	}

	private startHeartbeat() {
		this.heartbeatTask = task.spawn(() => {
			while (true) {
				task.wait(30);
				if (this.client.ConnectionState === Enum.WebStreamClientState.Open) {
					this.client.Send(
						HttpService.JSONEncode({
							topic: "phoenix",
							event: "heartbeat",
							payload: {},
							ref: "heartbeat",
						}),
					);
				}
			}
		});
	}

	join<T>(tableName: string, callback: (event: SupabaseRealtimeEvent<T>) => void) {
		const topic = `realtime:${this.schema}:${tableName}`;
		const msg = {
			topic: topic,
			event: "phx_join",
			payload: { config: { postgres_changes: [{ event: "*", schema: this.schema, table: tableName }] } },
			ref: HttpService.GenerateGUID(),
		};

		this.subscriptions.set(topic, callback as (event: SupabaseRealtimeEvent<unknown>) => void);
		this.client.Send(HttpService.JSONEncode(msg));
	}
}
