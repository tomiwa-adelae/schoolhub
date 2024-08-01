"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

export function MobileSearchBar({ type }: { type?: string }) {
	const [query, setQuery] = useState("");

	const router = useRouter();

	const searchParams = useSearchParams();

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			let newUrl = "";

			if (query) {
				newUrl = formUrlQuery({
					params: searchParams.toString(),
					key: "query",
					value: query,
				});
			} else {
				newUrl = removeKeysFromQuery({
					params: searchParams.toString(),
					keysToRemove: ["query"],
				});
			}

			router.push(newUrl, { scroll: false });
		}, 3000);
		return () => clearTimeout(delayDebounceFn);
	}, [query, searchParams, router]);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button className="md:hidden" variant={"ghost"} size="icon">
					<Search />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="md:hidden dark:bg-dark dark:border-gray-600 dark:text-white w-96 px-4 mt-4 ">
				<div className="flex items-center justify-end md:justify-center w-full">
					<Search className="md:text-gray-400 w-5 h-5" />
					<Input
						type="text"
						placeholder={`Search ${type}...`}
						onChange={(e) => setQuery(e.target.value)}
						className="md:flex-1 border-none bg-transparent dark:bg-transparent w-full"
					/>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
