import MessagesList from "@/components/MessagesList";
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
				<SearchBar type={"chats"} />
			</TopNavbar>
			<div className="py-4">
				<div className="container">
					<PageHeader
						firstName={user.firstName}
						lastName={user.lastName}
						identity={user.identity}
						department={user.department}
						picture={user.picture}
					>
						<Button className="w-full md:w-auto" asChild>
							<Link href="/">New chat</Link>
						</Button>
					</PageHeader>
				</div>
				<h3 className="font-bold text-lg mt-6 mb-2 container">
					My messages
				</h3>
				<MessagesList />
				{/* <p className="text-sm italic text-center mt-4">
					You have no chat. Start today
				</p> */}
			</div>
		</main>
	);
};

export default page;
