import { Class, Classes } from "shared/types/classes";
import { SupabaseClient } from "server/database/supabase";
import { $env } from "rbxts-transform-env";

const client = new SupabaseClient(
	`https://${$env.string("PROJECT_ID")}.supabase.co`,
	$env.string("SECRET_API_KEY", ""),
);

export function getClass(classType: Class) {
	return client.request<Classes>("GET", `/rest/v1/classes?class=eq.${classType}`);
}
