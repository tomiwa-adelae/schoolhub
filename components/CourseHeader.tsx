import Image from "next/image";
import { Button } from "./ui/button";

interface CourseHeaderProps {
	firstName: string;
	lastName: string;
	department: string;
	faculty: string;
	title: string;
	picture: string;
	children?: React.ReactNode;
	courseName: string;
	courseCode: string;
}

const CourseHeader = ({
	firstName,
	lastName,
	department,
	faculty,
	title,
	picture,
	children,
	courseName,
	courseCode,
}: CourseHeaderProps) => {
	return (
		<div className="flex items-center justify-between flex-col md:flex-row w-full gap-4">
			<div className="flex items-center justify-start w-full gap-4">
				<Image
					src={picture}
					alt="Test"
					width={1200}
					height={1000}
					className="rounded-full w-12 h-12 object-cover"
				/>
				<div className="flex items-start justify-center flex-col space-y-1">
					<h3 className="font-bold text-base">
						{courseName} - {courseCode}
					</h3>
					<small className="text-xs text-gray-400 dark:text-gray-300">
						{title}. {firstName} {lastName} - Lecturer of{" "}
						<span className="capitalize">{department}</span>{" "}
						department -{" "}
						<span className="capitalize">{faculty}</span>
					</small>
				</div>
			</div>

			{children}
		</div>
	);
};

export default CourseHeader;
