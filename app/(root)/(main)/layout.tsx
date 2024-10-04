import LeftSideBar from "@/components/shared/LeftSideBar";
import { getUserById } from "@/lib/actions/user.actions";
import { IUser } from "@/lib/database/models/user.model";
import { auth } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "SchoolHub",
};

export default async function MainLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { userId } = auth();

	const user: IUser = await getUserById(userId!);

	return (
		<main className="flex items-center justify-center">
			<LeftSideBar
				firstName={user?.firstName}
				lastName={user?.lastName}
				email={user?.email}
			/>
			<div className="flex-1 md:ml-60">
				<div className="mt-14 md:mt-0">{children}</div>
			</div>
		</main>
	);
}
