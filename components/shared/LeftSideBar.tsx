"use client";

import Image from "next/image";
import Link from "next/link";
import { Irish_Grover } from "next/font/google";
import { navLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";

const irishGrover = Irish_Grover({
	subsets: ["latin"],
	weight: ["400"],
});

const LeftSideBar = () => {
	const pathname = usePathname();

	const { user } = useUser();

	return (
		<aside className="fixed h-screen hidden md:flex items-start justify-center flex-col top-0 left-0 w-60 px-4 py-4 border-r-2 border-dashed border-gray-400">
			<Link href="/" className="flex items-center justify-start gap-2">
				<Image
					src={"/assets/logo.png"}
					alt={"SchoolHub Logo"}
					width={1000}
					height={1000}
					className="w-8 h-8 md:w-10 md:h-10 object-cover"
				/>
				<h1
					className={`hidden sm:block uppercase font-extrabold text-lg md:text-xl lg:text-2xl ${irishGrover.className}`}
				>
					SchoolHub
				</h1>
			</Link>
			<nav className="flex-1 mt-8 w-full flex items-start justify-start gap-2 flex-col pt-4">
				{navLinks.map(({ label, icon, route }, index) => {
					const Icon = icon;

					const isActive =
						pathname === route || pathname.startsWith(`${route}/`);

					return (
						<Link
							href={route}
							key={index}
							className={`flex items-center justify-start w-full rounded-md p-3 text-xs font-bold transition  ${
								isActive
									? "bg-blue-400 text-white"
									: "bg-transparent"
							} hover:bg-blue-200 dark:hover:bg-blue-300`}
						>
							<Icon className="w-4 h-4 mr-2" />
							{label}
						</Link>
					);
				})}
			</nav>

			<SignedIn>
				<div className="flex items-center justify-start gap-2">
					<UserButton afterSignOutUrl="/" />
					<div className="flex items-start flex-col justify-center space-y-0">
						<h3 className="text-sm font-bold">
							{user?.firstName} {user?.lastName}
						</h3>
						<small className="text-xs">
							{user?.emailAddresses[0].emailAddress}
						</small>
					</div>
				</div>
			</SignedIn>
		</aside>
	);
};

export default LeftSideBar;
