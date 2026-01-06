import { HttpService } from "@rbxts/services";

export interface SupabaseResponse<T> {
	success: boolean;
	status: number;
	data?: T;
	error?: string;
}

export class SupabaseClient {
	private readonly Url: string;
	private readonly ApiKey: string;

	constructor(supabaseUrl: string, apiKey: string) {
		this.Url = supabaseUrl;
		this.ApiKey = apiKey;
	}

	private request<T>(
		method: "GET" | "POST" | "PATCH" | "DELETE",
		path: string,
		body?: object,
		headers?: Record<string, string>,
	): SupabaseResponse<T> {
		const [success, response] = pcall(() =>
			HttpService.RequestAsync({
				Url: `${this.Url}${path}`,
				Method: method,
				Headers: {
					"Content-Type": "application/json",
					apikey: this.ApiKey,
					Authorization: `Bearer ${this.ApiKey}`,
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
