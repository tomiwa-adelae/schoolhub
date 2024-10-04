import Course from "@/components/Course";
import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import TopNavbar from "@/components/shared/TopNavbar";
import { Button } from "@/components/ui/button";
import { COURSES_LIMITS } from "@/constants";
import {
	getLecturerCourses,
	getStudentCourses,
} from "@/lib/actions/course.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { IUser } from "@/lib/database/models/user.model";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

const page = async ({ searchParams }: SearchParamProps) => {
	const page = Number(searchParams?.page) || 1;
	const query = (searchParams?.query as string) || "";

	const { userId } = auth();

	const user: IUser = await getUserById(userId!);

	let courses;

	if (user?.identity === "lecturer") {
		courses = await getLecturerCourses({
			page,
			query,
			limit: COURSES_LIMITS,
			userId: user?._id,
		});
	} else if (user?.identity === "student") {
		courses = await getStudentCourses({
			page,
			query,
			limit: COURSES_LIMITS,
			userId: user?._id,
		});
	}

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
						{courses?.data?.map((course: CourseProps) => (
							<Course
								key={course._id}
								title={course.title || course?.course.title}
								code={course.code || course?.course.code}
								unit={course.unit || course?.course.unit}
								firstName={
									course.user.firstName ||
									course.course.user.firstName
								}
								lastName={
									course.user.lastName ||
									course.course.user.lastName
								}
								identity={user?.identity!}
								picture={
									course.user.picture ||
									course.course.user.picture
								}
								_id={
									user?.identity === "student"
										? course.course._id
										: course._id
								}
							/>
						))}
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
