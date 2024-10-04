"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { addNewCourse } from "@/lib/actions/course.actions";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

interface NewCourseProps {
	title: string;
	unit: string;
	code: string;
	firstName: string;
	lastName: string;
	picture: string;
	_id: string;
	userId: string;
}

const NewCourse = ({
	title,
	unit,
	code,
	firstName,
	lastName,
	picture,
	_id,
	userId,
}: NewCourseProps) => {
	const [loading, setLoading] = useState(false);

	const addCourseHandler = async () => {
		setLoading(true);
		try {
			const res = await addNewCourse({
				userId,
				courseId: _id,
				path: "/courses/new",
			});
			if (res.status == 400)
				return toast({
					title: "Error!",
					description: res?.message,
					variant: "destructive",
				});

			toast({
				title: "Success!",
				description: res?.message,
			});

			setLoading(false);
		} catch (error) {
			toast({
				title: "Error!",
				description: "An error occurred!",
				variant: "destructive",
			});
			setLoading(false);
		} finally {
			setLoading(false);
		}
	};

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
				<div className="flex-1 flex items-start justify-center flex-col space-y-1">
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
				<Button onClick={addCourseHandler} disabled={loading}>
					{loading ? "Adding..." : "Add"}
				</Button>
			</div>
		</div>
	);
};

export default NewCourse;
