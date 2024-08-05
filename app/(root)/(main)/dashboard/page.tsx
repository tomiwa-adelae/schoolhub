import Colleague from "@/components/Colleague";
import Course from "@/components/Course";
import Document from "@/components/Document";
import Lecturer from "@/components/Lecturer";
import PageHeader from "@/components/PageHeader";
import TopNavbar from "@/components/shared/TopNavbar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const page = async () => {
	const { userId } = auth();

	const user = await getUserById(userId!);

	return (
		<main>
			<TopNavbar />
			<div className="container py-4">
				<PageHeader
					firstName={user.firstName}
					lastName={user.lastName}
					identity={user.identity}
					department={user.department}
					picture={user.picture}
				>
					<Button asChild className="w-full md:w-auto">
						<Link href="/">Apply for exeat</Link>
					</Button>
				</PageHeader>
				{/* <div className="border-2 border-dashed border-gray-400 rounded-md py-10 px-4 flex flex-col items-center justify-center gap-6 mt-6">
					<Image
						src="/assets/icons/book.svg"
						alt="Book icon"
						width={1000}
						height={1000}
						className="w-14 h-14 object-cover"
					/>
					<Button asChild>
						<Link href="/courses/new">Add a course now</Link>
					</Button>
				</div> */}
				<div>
					<div className="grid grid-cols-1 lg:grid-cols-5 gap-4 my-6">
						<div className="col-span-3">
							<div className="border-2 border-dashed rounded-md p-4 border-gray-400">
								<h3 className="font-bold text-lg mb-4">
									My courses
								</h3>
								<div className="grid grid-cols-1 gap-4">
									<Course />
									<Course />
									<Course />
								</div>
								<div className="text-center mt-4">
									<Button
										size={"sm"}
										asChild
										variant={"ghost"}
									>
										<Link href="/courses">
											Show all courses
										</Link>
									</Button>
								</div>
							</div>
						</div>
						<div className="col-span-3 lg:col-span-2">
							<div className="border-2 border-dashed rounded-md p-4 border-gray-400 ">
								<h3 className="font-bold text-lg mb-4">
									My documents
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
							</div>
							<div className="grid grid-cols-2 gap-4 mt-4">
								<div className="border-2 border-dashed border-gray-400 rounded-md flex flex-col items-center justify-center gap-3 text-center p-4">
									<Image
										src="/assets/icons/book.svg"
										alt="Book icon"
										width={1000}
										height={1000}
										className="w-8 h-8 object-cover"
									/>
									<h3 className="font-bold text-base">9</h3>
									<p className="text-xs text-gray-400">
										Total courses
									</p>
								</div>
								<Link
									href="/courses/new"
									className="bg-blue-400 text-white rounded-md flex flex-col items-center justify-center gap-4 text-center p-4 "
								>
									<Plus />
									<h3 className="font-bold text-sm">
										Add course
									</h3>
								</Link>
							</div>
						</div>
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-5 gap-4 my-10 ">
						<div className="col-span-2">
							<div className="border-2 border-dashed rounded-md p-4 border-gray-400">
								<h3 className="font-bold text-lg mb-4">
									My colleagues
								</h3>
								<div className="grid grid-cols-1 gap-4">
									<Colleague />
									<Colleague />
									<Colleague />
									<Colleague />
								</div>
								{/* <p className="text-sm italic text-center mb-4">
									You have no colleagues yet.
								</p> */}
								<div className="text-center mt-4">
									<Button
										size={"sm"}
										asChild
										variant={"ghost"}
									>
										<Link href="/courses">
											Show all colleagues
										</Link>
									</Button>
								</div>
							</div>
						</div>
						<div className="col-span-2 lg:col-span-3">
							<div className="border-2 border-dashed rounded-md p-4 border-gray-400">
								<h3 className="font-bold text-lg mb-4">
									My lecturers
								</h3>
								<div className="grid grid-cols-1 gap-4">
									<Lecturer />
									<Lecturer />
									<Lecturer />
									<Lecturer />
									<Lecturer />
								</div>
								<p className="text-sm italic text-center mb-4">
									You have no lecturers yet.
								</p>
								<div className="text-center mt-4">
									<Button
										size={"sm"}
										asChild
										variant={"ghost"}
									>
										<Link href="/courses">
											Show all lecturers
										</Link>
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default page;
