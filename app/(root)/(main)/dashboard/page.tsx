import Course from "@/components/Course";
import Document from "@/components/Document";
import PageHeader from "@/components/PageHeader";
import TopNavbar from "@/components/shared/TopNavbar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import User from "@/components/User";
import { COURSES_LIMITS, DOCUMENT_LIMITS } from "@/constants";
import {
	getLecturerCourses,
	getStudentCourses,
} from "@/lib/actions/course.actions";
import {
	getLecturerDocuments,
	getStudentDocuments,
} from "@/lib/actions/document.actions";
import {
	getMyColleagues,
	getMyLecturers,
	getMyStudents,
	getUserById,
} from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import { FilePlus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const page = async ({ searchParams }: SearchParamProps) => {
	const page = Number(searchParams?.page) || 1;
	const query = (searchParams?.query as string) || "";

	const { userId } = auth();

	const user = await getUserById(userId!);

	let courses: any;

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

	let documents;

	if (user?.identity === "lecturer") {
		documents = await getLecturerDocuments({
			userId: user?._id,
			page,
			query,
			limit: DOCUMENT_LIMITS,
		});
	} else if (user?.identity === "student") {
		documents = await getStudentDocuments({
			page,
			query,
			limit: DOCUMENT_LIMITS,
			userId: user?._id,
		});
	}

	const students = await getMyStudents({ userId: user?._id });

	let lecturers;
	let colleagues;

	if (user?.identity === "student") {
		lecturers = await getMyLecturers({ userId: user?._id });

		colleagues = await getMyColleagues({ userId: user?._id });
	}

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
											(course: CourseProps) => (
												<Course
													key={course._id}
													title={
														course.title ||
														course?.course.title
													}
													code={
														course.code ||
														course?.course.code
													}
													unit={
														course.unit ||
														course?.course.unit
													}
													firstName={
														course.user.firstName ||
														course.course.user
															.firstName
													}
													lastName={
														course.user.lastName ||
														course.course.user
															.lastName
													}
													identity={user?.identity!}
													picture={
														course.user.picture ||
														course.course.user
															.picture
													}
													_id={
														user?.identity ===
														"student"
															? course.course._id
															: course._id
													}
													students={course.students}
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
									{courses?.data.length >= 3 && (
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
									)}
								</div>
							</div>
							<div className="col-span-3 lg:col-span-2">
								<div className="border-2 border-dashed rounded-md p-4 border-gray-400 ">
									<h3 className="font-bold text-lg mb-4">
										My documents
									</h3>
									<div className="grid grid-cols-1 gap-4">
										{documents?.data.map(
											(document: DocumentProps) => (
												<Document
													key={document._id}
													_id={document?._id}
													code={document.course.code}
													createdAt={
														document.createdAt
													}
													document={document.document}
													title={document.title}
												/>
											)
										)}
									</div>
									{documents?.data.length === 0 && (
										<p className="text-sm italic text-center mb-4">
											You have no document yet.
										</p>
									)}
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
											{courses?.allCourses}
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
										{user?.identity === "student"
											? "My colleagues"
											: "My students"}
									</h3>
									{/* <div className="grid grid-cols-1 gap-4">
										{user?.identity === "student" ? (
											<>
												{colleagues?.map(
													(colleague: {
														_id: string;
														email: string;
														firstName: string;
														lastName: string;
														picture: string;
													}) => (
														<User
															key={colleague._id}
															firstName={
																colleague.firstName
															}
															lastName={
																colleague.lastName
															}
															email={
																colleague.email
															}
															picture={
																colleague.picture
															}
															id={colleague._id}
														/>
													)
												)}
											</>
										) : (
											students?.map(
												(student: {
													user: {
														_id: string;
														email: string;
														firstName: string;
														lastName: string;
														picture: string;
													};
												}) => (
													<User
														key={student.user._id}
														firstName={
															student.user
																.firstName
														}
														lastName={
															student.user
																.lastName
														}
														email={
															student.user.email
														}
														picture={
															student.user.picture
														}
														id={student.user._id}
													/>
												)
											)
										)}
									</div> */}
									{user?.identity === "student" &&
									colleagues.length === 0 ? (
										<p className="text-sm italic text-center mb-4">
											You have no colleagues yet.
										</p>
									) : (
										students.length === 0 && (
											<p className="text-sm italic text-center mb-4">
												You have no student.
											</p>
										)
									)}

									{user?.identity === "student" &&
										colleagues.length !== 0 &&
										colleagues.length > 5 && (
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
										)}

									{user?.identity === "lecturer" &&
										students.length !== 0 &&
										students.length > 5 && (
											<div className="text-center mt-4">
												<Button
													size={"sm"}
													asChild
													variant={"ghost"}
												>
													<Link href="/courses">
														Show all students
													</Link>
												</Button>
											</div>
										)}
								</div>
							</div>
							<div className="col-span-2 lg:col-span-3">
								<div className="border-2 border-dashed rounded-md p-4 border-gray-400">
									<h3 className="font-bold text-lg mb-4">
										My lecturer
									</h3>
									<div className="grid grid-cols-1 gap-4">
										{lecturers?.map(
											(lecturer: {
												_id: string;
												email: string;
												firstName: string;
												lastName: string;
												picture: string;
											}) => (
												<User
													key={lecturer._id}
													firstName={
														lecturer.firstName
													}
													lastName={lecturer.lastName}
													email={lecturer.email}
													picture={lecturer.picture}
													id={lecturer._id}
												/>
											)
										)}
									</div>
									{lecturers?.length === 0 && (
										<p className="text-sm italic text-center mb-4">
											You have no lecturers yet.
										</p>
									)}
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
