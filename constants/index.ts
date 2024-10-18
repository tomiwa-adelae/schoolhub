import {
	FolderKey,
	FileStack,
	LayoutDashboard,
	MessagesSquare,
	MonitorCog,
	MoonStar,
	Notebook,
	Sun,
} from "lucide-react";

export const themes = [
	{
		value: "light",
		icon: Sun,
	},
	{
		value: "dark",
		icon: MoonStar,
	},
	{
		value: "system",
		icon: MonitorCog,
	},
];

export const identities = [
	{
		value: "student",
		icon: "/assets/icons/student.svg",
		label: "I am a student",
	},
	{
		value: "lecturer",
		icon: "/assets/icons/lecturer.svg",
		label: "I am a lecturer",
	},
];

export const levels = ["100", "200", "300", "400", "500"];
export const departments = [
	"computer science",
	"physics",
	"law",
	"nursing",
	"microbiology",
];

export const faculties = [
	"environmental science",
	"humanities",
	"law",
	"management science",
	"natural science",
];

export const titles = ["Prof.", "Dr.", "Mr.", "Mrs.", "Miss", "Master"];

export const courseUnits = ["0", "1", "2", "3", "4", "6", "8", "10", "12"];

export const navLinks = [
	{
		route: "/dashboard",
		label: "Dashboard",
		icon: LayoutDashboard,
	},
	{
		route: "/courses",
		label: "Courses",
		icon: Notebook,
	},
	{
		route: "/chats",
		label: "Chats",
		icon: MessagesSquare,
	},
	{
		route: "/documents",
		label: "Documents",
		icon: FileStack,
	},
	{
		route: "/exeats",
		label: "Exeats",
		icon: FolderKey,
	},
];

export const COURSES_LIMITS = 2;
export const DOCUMENT_LIMITS = 2;
export const BASE_URL = "http://localhost:3000";
