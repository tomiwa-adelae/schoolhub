import Attendance from "@/components/Attendance";
import { AttendanceChart } from "@/components/AttendanceChart";
import CourseHeader from "@/components/CourseHeader";
import Document from "@/components/Document";
import TopNavbar from "@/components/shared/TopNavbar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const page = async () => {
	return (
		<main>
			<TopNavbar />
			<div className="container py-4">
				<CourseHeader
					firstName={"Paul"}
					lastName={"Amalu"}
					title={"Dr"}
					department={"Physics"}
					faculty={"Natural science"}
					courseName={"Introduction to electronics"}
					courseCode={"PHY1104"}
					picture={"/assets/user.jpg"}
				>
					<Button asChild className="w-full md:w-auto">
						<Link href="/">Message Dr. P. C. Amalu</Link>
					</Button>
				</CourseHeader>
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-6">
					<AttendanceChart />
					<div className="border-2 border-dashed border-gray-400 rounded-md flex flex-col items-center justify-center gap-3 text-center p-4 col-span-1">
						<Image
							src="/assets/icons/book.svg"
							alt="Book icon"
							width={1000}
							height={1000}
							className="w-12 h-12 object-cover"
						/>
						<h3 className="font-bold text-base">6</h3>
						<p className="text-xs text-gray-400">Unit</p>
					</div>
					<Image
						src={"/assets/user.jpg"}
						alt={"Lecturer"}
						width={1000}
						height={1000}
						className="object-cover w-full h-full overflow-hidden rounded-md border-2 border-dashed border-gray-400 text-center col-span-1"
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<div className="border-2 border-dashed border-gray-400 p-4 rounded-md">
							<h3 className="font-bold text-lg mb-4">
								Documents
							</h3>
							<div className="grid grid-cols-1 gap-4">
								<Document />
								<Document />
								<Document />
								<Document />
								<Document />
							</div>
							{/* <p className="text-sm italic text-center mb-4">
									You have no document yet.
                                    </p> */}
							<div className="text-center mt-4">
								<Button size={"sm"} asChild variant={"ghost"}>
									<Link href="/courses">
										Show all documents
									</Link>
								</Button>
							</div>
						</div>
					</div>
					<div>
						<div className="border-2 border-dashed border-gray-400 p-4 rounded-md">
							<h3 className="font-bold text-lg mb-4">
								Attendances
							</h3>
							<div className="grid grid-cols-1 gap-4">
								<Attendance />
								<Attendance />
								<Attendance />
								<Attendance />
								<Attendance />
							</div>
							{/* <p className="text-sm italic text-center mb-4">
									You have no attendance in this course yet.
                                    </p> */}
							<div className="text-center mt-4">
								<Button size={"sm"} asChild variant={"ghost"}>
									<Link href="/courses">
										Show all attendance
									</Link>
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default page;
