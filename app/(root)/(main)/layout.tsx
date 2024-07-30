import LeftSideBar from "@/components/shared/LeftSideBar";
import TopNavbar from "@/components/shared/TopNavBar";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "SchoolHub",
};

export default function MainLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="flex items-center justify-center">
			<LeftSideBar />
			<div className="flex-1 md:ml-60">
				<TopNavbar />
				<div className="mt-14 md:mt-0 container py-10">{children}</div>
			</div>
		</main>
	);
}
