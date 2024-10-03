import { ExeatForm } from "@/components/forms/ExeatForm";
import TopNavbar from "@/components/shared/TopNavbar";
import { getUserById } from "@/lib/actions/user.actions";
import { IUser } from "@/lib/database/models/user.model";
import { auth } from "@clerk/nextjs";
import { Irish_Grover } from "next/font/google";

const irishGrover = Irish_Grover({
	subsets: ["latin"],
	weight: ["400"],
});

const page = async () => {
	const { userId } = auth();

	const user: IUser = await getUserById(userId!);
	return (
		<main>
			<TopNavbar />
			<div className="container py-4">
				<h1
					className={`${irishGrover.className} text-3xl md:text-5xl lg:text-6xl text-center mb-6`}
				>
					Apply for Exeat Pass
				</h1>
				{/* <ExeatForm
					user={user}
				/> */}
			</div>
		</main>
	);
};

export default page;
