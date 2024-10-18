import { AttendanceChart } from "@/components/AttendanceChart";
import CourseHeader from "@/components/CourseHeader";
import Document from "@/components/Document";
import GenerateQRCodeButton from "@/components/GenerateQRCodeButton";
import { AttendanceList } from "@/components/modals/AttendanceList";
import NotFound from "@/components/shared/NotFound";
import TopNavbar from "@/components/shared/TopNavbar";
import { Button } from "@/components/ui/button";
// import { getClassDates } from "@/lib/actions/attendance.actions";
import { getCourseById, getStudents } from "@/lib/actions/course.actions";
import { getDocuments } from "@/lib/actions/document.actions";
// import { getQRCode } from "@/lib/actions/qrcode.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { IUser } from "@/lib/database/models/user.model";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const page = async ({ params: { id } }: { params: { id: string } }) => {
	const { userId } = auth();

	const user: IUser = await getUserById(userId!);

	const course = await getCourseById(id!);

	const documents = await getDocuments(id);

	let students;
	let dates;
	let qrcode;

	if (user?.identity === "lecturer") {
		students = await getStudents({ courseId: id, userId: user?._id });
		// dates = await getClassDates({ userId: user?._id, courseId: id });
		// qrcode = await getQRCode({ userId: user?._id, courseId: id });
	}

	if (course.status === 400) return <NotFound message={course.message} />;

	return (
		<main>
			<TopNavbar />
			<div className="container py-4">
				<CourseHeader
					firstName={course?.user.firstName}
					lastName={course?.user?.lastName}
					department={course?.user?.department}
					picture={course?.user?.picture}
					courseTitle={course?.title}
					courseUnit={course?.unit}
					courseCode={course?.code}
					courseId={course?._id}
					userId={user?._id}
					identity={user?.identity}
				>
					{user.identity === "student" && (
						<Button asChild className="w-full md:w-auto">
							<Link href={`/chats/${course?.user._id}`}>
								Message {course?.user.firstName}{" "}
								{course?.user.lastName}
							</Link>
						</Button>
					)}
					{user?.identity === "lecturer" && (
						<Button asChild className="w-full md:w-auto">
							<Link href={`/documents/${course?._id}/new`}>
								Add a document
							</Link>
						</Button>
					)}
				</CourseHeader>
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-6">
					<AttendanceChart identity={user.identity} />
					<div className="border-2 border-dashed border-gray-400 rounded-md flex flex-col items-center justify-center gap-3 text-center p-4 col-span-1">
						<Image
							src={
								user.identity === "student"
									? "/assets/icons/book.svg"
									: "/assets/icons/student.svg"
							}
							alt="Book icon"
							width={1000}
							height={1000}
							className="w-12 h-12 object-cover"
						/>
						<h3 className="font-bold text-base">
							{user.identity === "student"
								? course?.unit
								: students?.length}
						</h3>
						<p className="text-xs text-gray-400">
							{user.identity === "student" ? "Unit" : "Students"}
						</p>
					</div>
					{user.identity === "student" ? (
						<Image
							src={
								course?.user.picture ||
								"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
							}
							alt={"Lecturer"}
							width={1000}
							height={1000}
							className="object-cover w-full h-full overflow-hidden rounded-md border-2 border-dashed border-gray-400 text-center col-span-1"
						/>
					) : (
						<GenerateQRCodeButton
							courseId={course?._id}
							userId={user?._id}
							// qrcode={qrcode?.qrcode}
							qrcode={""}
							title={course?.title}
							// date={qrcode?.date}
							date={""}
						/>
					)}
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<div className="border-2 border-dashed border-gray-400 p-4 rounded-md">
							<h3 className="font-bold text-lg mb-4">
								Documents
							</h3>
							<div className="grid grid-cols-1 gap-4">
								{documents?.map((document: DocumentProps) => (
									<Document
										key={document?._id}
										document={document.document}
										title={document?.title}
										code={document?.course.code}
										_id={document?._id}
										createdAt={document?.createdAt}
									/>
								))}
							</div>
							{documents?.length === 0 && (
								<p className="text-sm italic text-center mb-4">
									This course has no document.
								</p>
							)}
							{documents?.length >= 5 && (
								<div className="text-center mt-4">
									<Button
										size={"sm"}
										asChild
										variant={"ghost"}
									>
										<Link href="/courses">
											Show all documents
										</Link>
									</Button>
								</div>
							)}
						</div>
					</div>
					<div>
						<div className="border-2 border-dashed border-gray-400 p-4 rounded-md">
							<h3 className="font-bold text-lg mb-4">
								Attendances
							</h3>
							<div className="grid grid-cols-1 gap-4">
								{dates?.map((date: any, index: string) => (
									<AttendanceList
										key={index}
										date={date}
										userId={user?._id}
										courseId={course?._id}
									/>
								))}
							</div>
							{dates?.length === 0 && (
								<p className="text-sm italic text-center mb-4">
									There are no classes yet.
								</p>
							)}
							{dates?.length >= 5 && (
								<div className="text-center mt-4">
									<Button
										size={"sm"}
										asChild
										variant={"ghost"}
									>
										<Link href="/courses">
											Show all dates
										</Link>
									</Button>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default page;
