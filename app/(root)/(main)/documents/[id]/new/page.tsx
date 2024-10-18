import Attendance from "@/components/Attendee";
import { AttendanceChart } from "@/components/AttendanceChart";
import CourseHeader from "@/components/CourseHeader";
import Document from "@/components/Document";
import { DocumentForm } from "@/components/forms/DocumentForm";
import NotFound from "@/components/shared/NotFound";
import TopNavbar from "@/components/shared/TopNavbar";
import { Button } from "@/components/ui/button";
import { getCourseById, getStudents } from "@/lib/actions/course.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { IUser } from "@/lib/database/models/user.model";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const page = async ({ params: { id } }: { params: { id: string } }) => {
	const { userId } = auth();

	const user: IUser = await getUserById(userId!);

	const course = await getCourseById(id!);

	let students;

	if (user?.identity === "lecturer") {
		students = await getStudents({ courseId: id, userId: user?._id });
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
				/>
				<div className="my-6">
					<h3 className="font-bold text-lg mb-4">
						Create a new document
					</h3>
					<DocumentForm courseId={course?._id} userId={user._id} />
				</div>
			</div>
		</main>
	);
};

export default page;
