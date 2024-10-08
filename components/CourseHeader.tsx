import Image from "next/image";
import { Button } from "./ui/button";
import { EditCourseDetailsModal } from "./modals/EditCourseDetailsModal";

interface CourseHeaderProps {
	firstName: string;
	lastName: string;
	department?: string;
	picture?: string;
	children?: React.ReactNode;
	courseTitle: string;
	courseUnit: string;
	courseCode: string;
	userId: string;
	identity?: string;
	courseId: string;
}

const CourseHeader = ({
	firstName,
	lastName,
	department,
	picture,
	children,
	courseTitle,
	courseUnit,
	courseCode,
	userId,
	identity,
	courseId,
}: CourseHeaderProps) => {
	return (
		<div className="flex items-center justify-between flex-col md:flex-row w-full gap-4">
			<div className="flex items-center justify-start w-full gap-4">
				<Image
					src={
						picture ||
						"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
					}
					alt={`${firstName} ${lastName}'s picture`}
					width={1200}
					height={1000}
					className="rounded-full w-12 h-12 object-cover"
				/>
				<div className="flex items-start justify-center flex-col space-y-1">
					<h3 className="font-bold text-base flex items-center gap-1">
						{courseTitle} - {courseCode} - {courseUnit} unit{" "}
						{identity === "lecturer" && (
							<EditCourseDetailsModal
								title={courseTitle}
								unit={courseUnit}
								code={courseCode}
								courseId={courseId}
								userId={userId}
							/>
						)}
					</h3>
					<small className="text-xs text-gray-400 dark:text-gray-300">
						{firstName} {lastName} - Lecturer of{" "}
						<span className="capitalize">{department}</span>{" "}
						department.
					</small>
				</div>
			</div>

			{children}
		</div>
	);
};

export default CourseHeader;
