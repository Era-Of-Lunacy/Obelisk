import { HttpService } from "@rbxts/services";

export interface SupabaseRealtimeEvent<T> {
	topic: string;
	event: string;
	payload: {
		data: {
			table: string;
			type: "INSERT" | "UPDATE" | "DELETE";
			record: T;
			old_record?: Partial<T>;
			schema: string;
			commit_timestamp: string;
			columns: { name: string; type: string }[];
		};
	};
	ref: string | undefined;
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

			if (callback && data.event === "postgres_changes") {
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
