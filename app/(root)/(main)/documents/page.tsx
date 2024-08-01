import PageHeader from "@/components/PageHeader";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import Pagination from "@/components/Pagination";
import Image from "next/image";

const documents = [
	{
		name: "Time Dependent equation",
		courseName: "Quantum Mechanics II",
		courseCode: "PHY4202",
		lecturer: "Mr. A.M. Lasisi",
	},
	{
		name: "Grad, Curl and Div",
		courseName: "Vector and Tensor Analysis",
		courseCode: "PHY4278",
		lecturer: "Dr. C. Ogunkoya",
	},
	{
		name: "Time Independent equation",
		courseName: "Quantum Mechanics II",
		courseCode: "PHY4202",
		lecturer: "Mr. A.M. Lasisi",
	},
	{
		name: "Radiation",
		courseName: "Atomic and Nuclear Physics",
		courseCode: "PHY4222",
		lecturer: "Mr. M. Olatunji",
	},
	{
		name: "Hybrid solar generation",
		courseName: "Project research",
		courseCode: "PHY4297",
		lecturer: "Dr. E.J. Oluwadare",
	},
];

const page = async () => {
	const { userId } = auth();

	const user = await getUserById(userId!);

	return (
		<div>
			<PageHeader
				firstName={user.firstName}
				lastName={user.lastName}
				identity={user.identity}
				department={user.department}
				picture={user.picture}
			/>
			<div className="my-6">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Course</TableHead>
							<TableHead>Course code</TableHead>
							<TableHead className="text-right">
								Lecturer
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{documents.map((document, index) => (
							<TableRow key={index}>
								<TableCell className="font-medium">
									<div className="flex items-center justify-start">
										<Image
											src={"/assets/icons/word.svg"}
											alt="Word file"
											width={1000}
											height={1000}
											className="w-6 h-6 object-cover mr-2"
										/>
										{document.name}
									</div>
								</TableCell>
								<TableCell>{document.courseName}</TableCell>
								<TableCell>{document.courseCode}</TableCell>
								<TableCell className="text-right">
									{document.lecturer}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
			<Pagination />
		</div>
	);
};

export default page;
