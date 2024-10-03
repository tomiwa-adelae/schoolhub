import PageHeader from "@/components/PageHeader";
import TopNavbar from "@/components/shared/TopNavbar";
import { Button } from "@/components/ui/button";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const page = async () => {
	const { userId } = auth();

	const user = await getUserById(userId!);

	return (
		<main>
			<TopNavbar />
			<div className="container py-4">
				<PageHeader
					firstName={user?.firstName}
					lastName={user?.lastName}
					identity={user?.identity}
					department={user?.department}
					picture={user?.picture}
				>
					{/* <Button asChild className="w-full md:w-auto">
						<Link href="/">Approve exeat</Link>
					</Button> */}
					<Button className="w-full md:w-auto">Approved</Button>
				</PageHeader>
				<div className="my-6">
					<h3 className="font-bold text-lg mb-4">Exeat details</h3>
					<div className="text-xs text-black dark:text-gray-100 grid grid-cols-1 lg:grid-cols-2 gap-2">
						<h4 className="bg-white border-gray-200 dark:bg-dark border dark:border-gray-700 p-3 rounded-md">
							<span className="text-dark dark:text-white font-bold">
								Name:{" "}
							</span>
							Tomiwa Adelae
						</h4>
						<h4 className="bg-white border-gray-200 dark:bg-dark border dark:border-gray-700 p-3 rounded-md">
							<span className="text-dark dark:text-white font-bold">
								Name:{" "}
							</span>
							Tomiwa Adelae
						</h4>
						<h4 className="bg-white border-gray-200 dark:bg-dark border dark:border-gray-700 p-3 rounded-md">
							<span className="text-dark dark:text-white font-bold">
								Name:{" "}
							</span>
							Tomiwa Adelae
						</h4>
						<h4 className="bg-white border-gray-200 dark:bg-dark border dark:border-gray-700 p-3 rounded-md">
							<span className="text-dark dark:text-white font-bold">
								Name:{" "}
							</span>
							Tomiwa Adelae
						</h4>
						<h4 className="bg-white border-gray-200 dark:bg-dark border dark:border-gray-700 p-3 rounded-md">
							<span className="text-dark dark:text-white font-bold">
								Name:{" "}
							</span>
							Tomiwa Adelae
						</h4>
						<h4 className="bg-white border-gray-200 dark:bg-dark border dark:border-gray-700 p-3 rounded-md">
							<span className="text-dark dark:text-white font-bold">
								Name:{" "}
							</span>
							Tomiwa Adelae
						</h4>
						<h4 className="bg-white border-gray-200 dark:bg-dark border dark:border-gray-700 p-3 rounded-md">
							<span className="text-dark dark:text-white font-bold">
								Name:{" "}
							</span>
							Tomiwa Adelae
						</h4>
						<h4 className="bg-white border-gray-200 dark:bg-dark border dark:border-gray-700 p-3 rounded-md">
							<span className="text-dark dark:text-white font-bold">
								Name:{" "}
							</span>
							Tomiwa Adelae
						</h4>
						<h4 className="bg-white border-gray-200 dark:bg-dark border dark:border-gray-700 p-3 rounded-md">
							<span className="text-dark dark:text-white font-bold">
								Name:{" "}
							</span>
							Tomiwa Adelae
						</h4>
						<h4 className="bg-white border-gray-200 dark:bg-dark border dark:border-gray-700 p-3 rounded-md">
							<span className="text-dark dark:text-white font-bold">
								Name:{" "}
							</span>
							Tomiwa Adelae
						</h4>
						{/* <h4>
							<span className="text-white font-bold">Email:</span>
							tomiwaadelae@gmail.com
						</h4>
						<h4>
							<span className="text-white font-bold">
								Matric number:
							</span>
							20N07001
						</h4>
						<h4>
							<span className="text-white font-bold">
								Phone number:
							</span>
							08027836001
						</h4>
						<h4>
							<span className="text-white font-bold">
								Parent&apos; phone number:
							</span>
							08180009284
						</h4>
						<h4>
							<span className="text-white font-bold">
								Department:
							</span>
							Physics with electronics
						</h4>
						<h4>
							<span className="text-white font-bold">
								Faculty:
							</span>
							Natural Science
						</h4>
						<h4>
							<span className="text-white font-bold">Level:</span>
							200 level
						</h4>
						<h4>
							<span className="text-white font-bold">
								Hostel:
							</span>
							Diocese of Lagos West
						</h4>
						<h4>
							<span className="text-white font-bold">
								Location:
							</span>
							Maitama, Abuja
						</h4>
						<h4>
							<span className="text-white font-bold">
								Departure date:
							</span>
							12th of November, 2024
						</h4>
						<h4>
							<span className="text-white font-bold">
								Reason:
							</span>
							Medical emergency
						</h4> */}
					</div>
				</div>
			</div>
		</main>
	);
};

export default page;
