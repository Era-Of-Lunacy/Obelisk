interface DatabaseConfig {
	supabase: {
		project_id: string;
	};
	retry_count: number;
	retry_delay: number;
	save_interval: number;
}
