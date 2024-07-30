"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { themes } from "@/constants";
import { useTheme } from "@/context/ThemeProvider";
import { MoonStar, Sun } from "lucide-react";
import { Button } from "../ui/button";

export function Theme() {
	const { mode, setMode } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size={"icon"}>
					{mode === "light" ? <Sun /> : <MoonStar />}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56 bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 dark:border-gray-800 dark:text-white">
				{themes.map(({ icon, value }, index) => {
					const Icon = icon;
					return (
						<DropdownMenuItem
							className={`uppercase cursor-pointer ${
								mode === value && "bg-blue-400 text-white"
							} font-bold text-xs`}
							key={index}
							onClick={() => {
								setMode(value);
								if (value !== "system") {
									localStorage.theme = value;
								} else {
									localStorage.removeItem("theme");
								}
							}}
						>
							<Icon className="mr-2" />
							{value}
						</DropdownMenuItem>
					);
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
