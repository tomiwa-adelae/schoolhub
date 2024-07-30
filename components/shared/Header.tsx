"use client";

import Link from "next/link";
import Image from "next/image";

import { Irish_Grover } from "next/font/google";

import { Theme } from "./Theme";

const irishGrover = Irish_Grover({
	subsets: ["latin"],
	weight: ["400"],
});

const Header = ({ children }: { children: React.ReactNode }) => {
	return (
		<header className="container flex items-center justify-between py-4 ">
			<Link href="/" className="flex items-center justify-start gap-2">
				<Image
					src={"/assets/logo.png"}
					alt={"ACUHUB Logo"}
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
			<div className="flex items-center justify-center gap-4">
				<Theme />
				{children}
			</div>
		</header>
	);
};

export default Header;
