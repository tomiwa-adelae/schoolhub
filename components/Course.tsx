import Image from "next/image";
import { Progress } from "./ui/progress";
import Link from "next/link";

const Course = () => {
	return (
		<div className="border-2 border-dashed border-gray-400 rounded-md p-4">
			<div className="flex items-start justify-start gap-3">
				<Link href="/">
					<Image
						src="/assets/user.jpg"
						alt="Lecturer"
						width={1000}
						height={1000}
						className="rounded-md w-14 h-14 object-cover"
					/>
				</Link>
				<div className="flex items-start justify-center flex-col space-y-1">
					<Link href="/" className="text-base font-bold">
						Introduction to electronics
					</Link>
					<span className="text-gray-400 dark:text-gray-300 text-xs">
						Dr. Paul Amalu
					</span>
				</div>
			</div>
			<Progress value={33} className="my-4" />
			<div className="flex items-center justify-between gap-2 font-bold text-sm">
				<small>Your attendance</small>
				<small>
					2<span className="text-gray-400">/12 classes</span>
				</small>
			</div>
		</div>
	);
};

export default Course;
