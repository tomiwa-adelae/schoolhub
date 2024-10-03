import NewChat from "@/components/NewChat";
import PageHeader from "@/components/PageHeader";
import SearchBar from "@/components/SearchBar";
import TopNavbar from "@/components/shared/TopNavbar";
import { Button } from "@/components/ui/button";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

const page = async () => {
	const { userId } = auth();

	const user = await getUserById(userId!);

	return (
		<main>
			<TopNavbar>
				<SearchBar type={"names, matric number, phone number"} />
			</TopNavbar>
			<div className="py-4">
				<div className="container">
					<PageHeader
						firstName={user?.firstName}
						lastName={user?.lastName}
						identity={user?.identity}
						department={user?.department}
						picture={user?.picture}
					/>
				</div>
				<h3 className="font-bold text-lg mt-6 mb-2 container">
					New chat
				</h3>
				<div className="grid grid-cols-1 px-2">
					<NewChat />
					<NewChat />
					<NewChat />
					<NewChat />
					<NewChat />
					<NewChat />
					<NewChat />
					<NewChat />
					<NewChat />
					<NewChat />
					<NewChat />
				</div>
				{/* <p className="text-sm italic text-center mt-4">
					There is no one to chat with.
				</p> */}
			</div>
		</main>
	);
};

export default page;
