import Image from "next/image";
import { Progress } from "./ui/progress";
import Link from "next/link";

const Course = () => {
	return (
		<div className="border-2 border-dashed border-gray-400 rounded-md p-3">
			<div className="flex items-start justify-start gap-2">
				<Link href="/">
					<Image
						src="/assets/user.jpg"
						alt="Lecturer"
						width={1000}
						height={1000}
						className="rounded-md w-12 h-12 object-cover"
					/>
				</Link>
				<div className="flex items-start justify-center flex-col space-y-1">
					<Link
						href="/courses/12345"
						className="text-sm font-bold hover:underline hover:text-blue-400 transition"
					>
						Introduction to electronics
					</Link>
					<span className="text-gray-400 dark:text-gray-300 text-xs">
						Dr. Paul Amalu
					</span>
				</div>
			</div>
			<Progress value={33} className="my-3" />
			<div className="flex items-center justify-between gap-2 font-bold text-xs">
				<small>Your attendance</small>
				<small>
					2<span className="text-gray-400">/12 classes</span>
				</small>
			</div>
		</div>
	);
};

export default Course;
