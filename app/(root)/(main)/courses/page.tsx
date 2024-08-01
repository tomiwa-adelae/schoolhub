import Course from "@/components/Course";
import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

const page = async () => {
	const { userId } = auth();

	const user = await getUserById(userId!);

	return (
		<div>
			<PageHeader
				firstName={user.firstName}
				lastName={user.lastName}
				identity={user.identity}
				department={user.department}
				picture={user.picture}
			>
				<Button asChild className="w-full md:w-auto">
					<Link href="/">Add new course</Link>
				</Button>
			</PageHeader>
			<div className="my-6">
				<h3 className="font-bold text-lg mb-4">My courses</h3>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
					<Course />
					<Course />
					<Course />
					<Course />
					<Course />
					<Course />
					<Course />
					<Course />
					<Course />
					<Course />
					<Course />
					<Course />
				</div>
			</div>
			<Pagination />
		</div>
	);
};

export default page;
