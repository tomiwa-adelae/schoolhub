import Course from "@/components/Course";
import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import TopNavbar from "@/components/shared/TopNavbar";
import { Button } from "@/components/ui/button";
import { getLecturerCourses } from "@/lib/actions/course.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { IUser } from "@/lib/database/models/user.model";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

const page = async ({ searchParams }: SearchParamProps) => {
	const page = Number(searchParams?.page) || 1;
	const query = (searchParams?.query as string) || "";

	const { userId } = auth();

	const user: IUser = await getUserById(userId!);

	const courses = await getLecturerCourses({
		page,
		query,
		limit: 2,
		userId: user?._id,
	});

	console.log(courses);

	return (
		<main>
			<TopNavbar>
				<SearchBar type={"courses"} />
			</TopNavbar>
			<div className="container py-4">
				<PageHeader
					firstName={user?.firstName}
					lastName={user?.lastName}
					identity={user?.identity}
					department={user?.department}
					picture={user?.picture}
				>
					<Button asChild className="w-full md:w-auto">
						<Link
							href={
								user?.identity === "student"
									? "/courses/new"
									: "/courses/create"
							}
						>
							{user?.identity === "student"
								? "Add a course now"
								: "Create a new course"}
						</Link>
					</Button>
				</PageHeader>
				<div className="my-6">
					<h3 className="font-bold text-lg mb-4">My courses</h3>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
						{courses?.data?.map(
							(course: {
								title: string;
								code: string;
								unit: string;
								_id: string;
								user: {
									email: string;
									firstName: string;
									lastName: string;
									picture: string;
									identity: string;
								};
							}) => (
								<Course
									key={course._id}
									title={course.title}
									code={course.code}
									unit={course.unit}
									firstName={course.user.firstName}
									lastName={course.user.lastName}
									identity={course.user.identity}
									picture={course.user.picture}
									_id={course._id}
								/>
							)
						)}
					</div>
					{courses?.data?.length === 0 && (
						<p className="text-sm italic text-center mt-4">
							You have not{" "}
							{user?.identity === "student"
								? "registered for"
								: "created"}{" "}
							any course yet. Start today
						</p>
					)}
				</div>
				{courses?.totalPages !== 1 && (
					<Pagination totalPages={courses?.totalPages} page={page} />
				)}
			</div>
		</main>
	);
};

export default page;
