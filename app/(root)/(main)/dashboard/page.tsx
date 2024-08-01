import Course from "@/components/Course";
import PageHeader from "@/components/PageHeader";
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
			/>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-10 ">
				<div className="border-2 border-dashed rounded-md p-4 border-gray-400 col-span-2">
					<h3 className="font-bold text-xl mb-4">My courses</h3>
					<div className="grid grid-cols-1 gap-4">
						<Course />
						<Course />
					</div>
					<div className="text-center mt-4">
						<Button size={"sm"} asChild variant={"ghost"}>
							<Link href="/courses">Show all courses</Link>
						</Button>
					</div>
				</div>
				<div className="border-2 border-dashed rounded-md p-4 border-gray-400 col-span-2 lg:col-span-1">
					<h3 className="font-bold text-xl mb-4">My documents</h3>
				</div>
			</div>
		</div>
	);
};

export default page;
