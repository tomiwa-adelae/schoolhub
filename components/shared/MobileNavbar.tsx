"use client";

import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks } from "@/constants";
import { SignedIn, useUser, UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";

import { Irish_Grover } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const irishGrover = Irish_Grover({
	subsets: ["latin"],
	weight: ["400"],
});

export function MobileNavbar() {
	const pathname = usePathname();

	const { user } = useUser();

	return (
		<Sheet>
			<SheetTrigger asChild className="md:hidden">
				<Button variant="ghost" size="icon">
					<Menu />
				</Button>
			</SheetTrigger>
			<SheetContent
				side={"left"}
				className="flex items-center justify-center flex-col"
				style={{ zIndex: "20000" }}
			>
				<SheetHeader className="w-full">
					<SheetClose asChild>
						<Link
							href="/"
							className="flex items-center justify-start gap-2"
						>
							<Image
								src={"/assets/logo.png"}
								alt={"SchoolHub Logo"}
								width={1000}
								height={1000}
								className="w-8 h-8 md:w-10 md:h-10 object-cover"
							/>
							<h1
								className={`uppercase font-bold text-lg ${irishGrover.className}`}
							>
								SchoolHub
							</h1>
						</Link>
					</SheetClose>
				</SheetHeader>
				<nav className="flex-1 mt-4 w-full flex items-start justify-start gap-2 flex-col pt-4">
					{navLinks.map(({ label, icon, route }, index) => {
						const Icon = icon;

						const isActive =
							pathname === route ||
							pathname.startsWith(`${route}/`);

						return (
							<SheetClose asChild key={index}>
								<Link
									href={route}
									className={`flex items-center justify-start w-full rounded-md p-3 text-xs font-bold transition  ${
										isActive
											? "bg-blue-400 text-white"
											: "bg-transparent"
									} hover:bg-blue-200 dark:hover:bg-blue-300`}
								>
									<Icon className="w-4 h-4 mr-2" />
									{label}
								</Link>
							</SheetClose>
						);
					})}
				</nav>
				<SignedIn>
					<div className="w-full flex items-center justify-start gap-2">
						<UserButton afterSignOutUrl="/" />
						<div className="flex items-start flex-col justify-center space-y-1">
							<h3 className="text-sm font-bold">
								{user?.firstName} {user?.lastName}
							</h3>
							<small className="text-xs">
								{user?.emailAddresses[0].emailAddress}
							</small>
						</div>
					</div>
				</SignedIn>
			</SheetContent>
		</Sheet>
	);
}
