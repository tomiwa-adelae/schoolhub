"use client";

import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { MobileSearchBar } from "./MobileSearchBar";

const SearchBar = ({ type }: { type?: string }) => {
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
		<div className="flex-1 flex items-center justify-end md:justify-center">
			<MobileSearchBar type={type} />
			<Search className="hidden md:block md:text-gray-400 w-5 h-5" />
			<Input
				type="text"
				placeholder={`Search ${type}...`}
				onChange={(e) => setQuery(e.target.value)}
				className="hidden md:block md:flex-1 border-none bg-transparent dark:bg-transparent"
			/>
		</div>
	);
};

export default SearchBar;
