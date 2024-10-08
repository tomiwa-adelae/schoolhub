import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const handleError = (error: any) => {
	console.log(error);
	return {
		status: error?.status || 400,
		message:
			error?.message || "Oops! Course does not exist! Try again later.",
	};
};

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
	const currentUrl = qs.parse(params);

	currentUrl[key] = value;

	return qs.stringifyUrl(
		{
			url: window.location.pathname,
			query: currentUrl,
		},
		{ skipNull: true }
	);
}

export function removeKeysFromQuery({
	params,
	keysToRemove,
}: RemoveUrlQueryParams) {
	const currentUrl = qs.parse(params);

	keysToRemove.forEach((key: any) => {
		delete currentUrl[key];
	});

	return qs.stringifyUrl(
		{
			url: window.location.pathname,
			query: currentUrl,
		},
		{
			skipNull: true,
		}
	);
}

export function formatDate(dateString: string): string {
	const date = new Date(dateString);

	// Get the day, month and year
	const day = date.getDate();
	const month = date.toLocaleString("default", { month: "long" });
	const year = date.getFullYear();

	// Function to get the ordinal suffix
	const getOrdinalSuffix = (num: number): string => {
		const suffixes = ["th", "st", "nd", "rd"];
		const modulo100 = num % 100;
		const modulo10 = num % 10;
		const suffix =
			modulo10 <= 3 && modulo10 > 0 && modulo100 !== 11
				? suffixes[modulo10]
				: suffixes[0];
		return `${num}${suffix}`;
	};

	// Format the date
	return `${getOrdinalSuffix(day)} of ${month}, ${year}`;
}
