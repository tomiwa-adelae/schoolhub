import React from "react";
import { Theme } from "./Theme";
import Link from "next/link";
import Image from "next/image";
import { MobileNavbar } from "./MobileNavbar";

const TopNavbar = ({ children }: { children?: React.ReactNode }) => {
	return (
		<div
			className="container fixed md:relative top-0 right-0 w-full border-b-2 border-dashed border-gray-400 h-14 flex items-center justify-between dark:bg-dark bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2]"
			style={{ zIndex: "100" }}
		>
			<Link href="/" className="flex items-center justify-start gap-2">
				<Image
					src={"/assets/logo.png"}
					alt={"SchoolHub Logo"}
					width={1000}
					height={1000}
					className="w-8 h-8 md:hidden"
				/>
			</Link>
			{/* <div className="flex-1"></div> */}
			<div className="md:flex-1 flex items-center justify-end gap-4">
				{children}
				<Theme />
				<MobileNavbar />
			</div>
		</div>
	);
};

export default TopNavbar;
