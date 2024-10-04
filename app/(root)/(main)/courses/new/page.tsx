import NewCourse from "@/components/NewCourse";
import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import TopNavbar from "@/components/shared/TopNavbar";
import { Button } from "@/components/ui/button";
import { COURSES_LIMITS } from "@/constants";
import { getAvailableCourses } from "@/lib/actions/course.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

const page = async ({ searchParams }: SearchParamProps) => {
	const page = Number(searchParams?.page) || 1;
	const query = (searchParams?.query as string) || "";

	const { userId } = auth();

	const user = await getUserById(userId!);

	const courses = await getAvailableCourses({
		page,
		query,
		limit: COURSES_LIMITS,
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
				/>
				<div className="my-6">
					<h3 className="font-bold text-lg mb-4">Add new course</h3>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
						{courses?.data?.map((course: CourseProps) => (
							<NewCourse
								key={course._id}
								picture={course.user.picture}
								title={course.title}
								code={course.code}
								unit={course.unit}
								_id={course._id}
								firstName={course.user.firstName}
								lastName={course.user.lastName}
								userId={user?._id}
							/>
						))}
					</div>
					{courses?.data.length === 0 && (
						<p className="text-sm italic text-center mt-4">
							Unfortunately! There are no courses left for you to
							add
						</p>
					)}
				</div>
				{courses?.totalPages! > 1 && (
					<Pagination totalPages={courses?.totalPages} page={page} />
				)}
			</div>
		</main>
	);
};

export default page;
