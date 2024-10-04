import Colleague from "@/components/Colleague";
import Course from "@/components/Course";
import Document from "@/components/Document";
import Lecturer from "@/components/Lecturer";
import PageHeader from "@/components/PageHeader";
import TopNavbar from "@/components/shared/TopNavbar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { COURSES_LIMITS } from "@/constants";
import { getLecturerCourses } from "@/lib/actions/course.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import { FilePlus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const page = async ({ searchParams }: SearchParamProps) => {
	const page = Number(searchParams?.page) || 1;
	const query = (searchParams?.query as string) || "";

	const { userId } = auth();

	const user = await getUserById(userId!);

	const courses = await getLecturerCourses({
		page,
		query,
		limit: COURSES_LIMITS,
		userId: user?._id,
	});

	console.log(courses);

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
				>
					<Button asChild className="w-full md:w-auto">
						<Link href="/">Apply for exeat</Link>
					</Button>
				</PageHeader>

				{courses?.data.length === 0 && (
					<div className="border-2 border-dashed border-gray-400 rounded-md py-10 px-4 flex flex-col items-center justify-center gap-6 mt-6">
						<Image
							src="/assets/icons/book.svg"
							alt="Book icon"
							width={1000}
							height={1000}
							className="w-14 h-14 object-cover"
						/>
						<Button asChild>
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
					</div>
				)}
				{courses?.data.length !== 0 && (
					<div>
						<div className="grid grid-cols-1 lg:grid-cols-5 gap-4 my-6">
							<div className="col-span-3">
								<div className="border-2 border-dashed rounded-md p-4 border-gray-400">
									<h3 className="font-bold text-lg mb-4">
										My courses
									</h3>
									<div className="grid grid-cols-1 gap-4">
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
													firstName={
														course.user.firstName
													}
													lastName={
														course.user.lastName
													}
													identity={
														course.user.identity
													}
													picture={
														course.user.picture
													}
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
									<div className="text-center mt-4">
										<Button
											size={"sm"}
											asChild
											variant={"ghost"}
										>
											<Link href="/courses">
												Show all courses
											</Link>
										</Button>
									</div>
								</div>
							</div>
							<div className="col-span-3 lg:col-span-2">
								<div className="border-2 border-dashed rounded-md p-4 border-gray-400 ">
									<h3 className="font-bold text-lg mb-4">
										My documents
									</h3>
									<div className="grid grid-cols-1 gap-4">
										<Document />
										<Document />
										<Document />
										<Document />
										<Document />
									</div>
									{/* <p className="text-sm italic text-center mb-4">
									You have no document yet.
								</p> */}
								</div>
								<div className="grid grid-cols-2 gap-4 mt-4">
									<div className="border-2 border-dashed border-gray-400 rounded-md flex flex-col items-center justify-center gap-3 text-center p-4">
										<Image
											src="/assets/icons/book.svg"
											alt="Book icon"
											width={1000}
											height={1000}
											className="w-8 h-8 object-cover"
										/>
										<h3 className="font-bold text-base">
											9
										</h3>
										<p className="text-xs text-gray-400">
											Total courses
										</p>
									</div>
									<Link
										href={
											user?.identity === "student"
												? "/courses/new"
												: "/courses/create"
										}
										className="bg-blue-400 text-white rounded-md flex flex-col items-center justify-center gap-4 text-center p-4 "
									>
										{user?.identity === "student" ? (
											<Plus />
										) : (
											<FilePlus />
										)}
										<h3 className="font-bold text-sm">
											{user?.identity === "student"
												? "Add a course now"
												: "Create a new course"}
										</h3>
									</Link>
								</div>
							</div>
						</div>
						<div className="grid grid-cols-1 lg:grid-cols-5 gap-4 my-10 ">
							<div className="col-span-2">
								<div className="border-2 border-dashed rounded-md p-4 border-gray-400">
									<h3 className="font-bold text-lg mb-4">
										My colleagues
									</h3>
									<div className="grid grid-cols-1 gap-4">
										<Colleague />
										<Colleague />
										<Colleague />
										<Colleague />
									</div>
									{/* <p className="text-sm italic text-center mb-4">
									You have no colleagues yet.
									</p> */}
									<div className="text-center mt-4">
										<Button
											size={"sm"}
											asChild
											variant={"ghost"}
										>
											<Link href="/courses">
												Show all colleagues
											</Link>
										</Button>
									</div>
								</div>
							</div>
							<div className="col-span-2 lg:col-span-3">
								<div className="border-2 border-dashed rounded-md p-4 border-gray-400">
									<h3 className="font-bold text-lg mb-4">
										My lecturers
									</h3>
									<div className="grid grid-cols-1 gap-4">
										<Lecturer />
										<Lecturer />
										<Lecturer />
										<Lecturer />
										<Lecturer />
									</div>
									<p className="text-sm italic text-center mb-4">
										You have no lecturers yet.
									</p>
									<div className="text-center mt-4">
										<Button
											size={"sm"}
											asChild
											variant={"ghost"}
										>
											<Link href="/courses">
												Show all lecturers
											</Link>
										</Button>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</main>
	);
};

export default page;
