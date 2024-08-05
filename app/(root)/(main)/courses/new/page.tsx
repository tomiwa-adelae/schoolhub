import NewCourse from "@/components/NewCourse";
import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
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
				<SearchBar type={"courses"} />
			</TopNavbar>
			<div className="container py-4">
				<PageHeader
					firstName={user.firstName}
					lastName={user.lastName}
					identity={user.identity}
					department={user.department}
					picture={user.picture}
				/>
				<div className="my-6">
					<h3 className="font-bold text-lg mb-4">Add new course</h3>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
						<NewCourse />
						<NewCourse />
						<NewCourse />
						<NewCourse />
						<NewCourse />
						<NewCourse />
						<NewCourse />
						<NewCourse />
						<NewCourse />
						<NewCourse />
					</div>
					{/* <p className="text-sm italic text-center mt-4">
						Unfortunately! There are no courses left for you to add
					</p> */}
				</div>
				<Pagination />
			</div>
		</main>
	);
};

export default page;
