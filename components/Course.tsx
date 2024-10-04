import Image from "next/image";
import { Progress } from "./ui/progress";
import Link from "next/link";

const Course = ({
	title,
	unit,
	code,
	firstName,
	lastName,
	identity,
	picture,
	_id,
}: {
	title: string;
	unit: string;
	code: string;
	lastName: string;
	firstName: string;
	identity: string;
	picture: string;
	_id: string;
}) => {
	return (
		<div className="border-2 border-dashed border-gray-400 rounded-md p-3">
			<div className="flex items-center justify-start gap-2">
				<Link href="/">
					<Image
						src={
							picture ||
							"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
						}
						alt={`${firstName} ${lastName}'s picture`}
						width={1000}
						height={1000}
						className="rounded-md w-12 h-12 object-cover"
					/>
				</Link>
				<div className="flex items-start justify-center flex-col space-y-1">
					<Link
						href={`/courses/${_id}`}
						className="text-xs font-bold hover:underline hover:text-blue-400 transition"
					>
						{title} - {code}
					</Link>
					<span className="text-gray-400 dark:text-gray-300 text-xs">
						{firstName} {lastName}
					</span>
				</div>
			</div>
			{identity === "student" && (
				<div>
					<Progress value={33} className="my-3" />
					<div className="flex items-center justify-between gap-2 font-bold text-xs">
						<small>Your attendance</small>
						<small>
							2<span className="text-gray-400">/12 classes</span>
						</small>
					</div>
				</div>
			)}

			{identity === "lecturer" && (
				<div className="flex items-center justify-between gap-2 font-bold text-xs mt-3">
					<small>Your students</small>
					<small>
						20<span className="text-gray-400"> students</span>
					</small>
				</div>
			)}
		</div>
	);
};

export default Course;
