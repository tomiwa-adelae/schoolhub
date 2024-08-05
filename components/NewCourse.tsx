import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const NewCourse = () => {
	return (
		<div className="border-2 border-dashed border-gray-400 rounded-md p-3">
			<div className="flex items-center justify-start gap-2">
				<Link href="/">
					<Image
						src="/assets/user.jpg"
						alt="Lecturer"
						width={1000}
						height={1000}
						className="rounded-md w-12 h-12 object-cover"
					/>
				</Link>
				<div className="flex-1 flex items-start justify-center flex-col space-y-1">
					<Link
						href="/courses/12345"
						className="text-xs font-bold hover:underline hover:text-blue-400 transition"
					>
						Introduction to electronics - PHY1101
					</Link>
					<span className="text-gray-400 dark:text-gray-300 text-xs">
						Dr. Paul Amalu
					</span>
				</div>
				<Button>Add</Button>
			</div>
		</div>
	);
};

export default NewCourse;
