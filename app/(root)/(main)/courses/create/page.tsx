import { CourseForm } from "@/components/forms/CourseForm";
import PageHeader from "@/components/PageHeader";
import TopNavbar from "@/components/shared/TopNavbar";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";

const page = async () => {
	const { userId } = auth();

	const user = await getUserById(userId!);
	return (
		<main>
			<TopNavbar />
			<div className="container py-4">
				<PageHeader
					firstName={user?.firstName}
					lastName={user?.lastName}
					identity={user?.identity}
					department={user?.department}
					picture={user?.picture}
				/>
				<div className="my-6">
					<h3 className="font-bold text-lg mb-4">
						Create a new course
					</h3>
					<CourseForm id={userId!} user={user} />
				</div>
			</div>
		</main>
	);
};

export default page;
