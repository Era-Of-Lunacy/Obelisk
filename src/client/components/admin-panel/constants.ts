// Color3 is a global type in the Roblox environment

export type AdminPanelSection = "Home" | "Server" | "Management" | "Settings" | "Commands" | "Advanced" | "Custom";

export interface AdminPanelProps {
	onClose?: () => void;
}

export const SECTION_ICONS = {
	Admin: "rbxassetid://95787975593542",
	Home: "rbxassetid://128880877806998",
	Server: "rbxassetid://72890530744806",
	Management: "rbxassetid://129390731483196",
	Settings: "rbxassetid://135555417296136",
	Commands: "rbxassetid://116176549909146",
	Advanced: "rbxassetid://103214023752154",
	Custom: "rbxassetid://115248026502896",
};

export const SECTION_COLORS = {
	Home: new Color3(0.1, 0.6, 0.9),
	Server: new Color3(0.2, 0.7, 0.4),
	Management: new Color3(0.8, 0.4, 0.2),
	Settings: new Color3(0.6, 0.6, 0.6),
	Commands: new Color3(0.7, 0.3, 0.8),
	Advanced: new Color3(0.9, 0.2, 0.3),
	Custom: new Color3(0.9, 0.7, 0.1),
};

export const SECTION_ORDER: AdminPanelSection[] = [
	"Home",
	"Server",
	"Management",
	"Settings",
	"Commands",
	"Advanced",
	"Custom",
];
