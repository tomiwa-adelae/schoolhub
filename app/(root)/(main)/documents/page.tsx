import PageHeader from "@/components/PageHeader";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import Pagination from "@/components/Pagination";
import Image from "next/image";
import TopNavbar from "@/components/shared/TopNavbar";
import SearchBar from "@/components/SearchBar";
import {
	getLecturerDocuments,
	getStudentDocuments,
} from "@/lib/actions/document.actions";
import Link from "next/link";
import { DOCUMENT_LIMITS } from "@/constants";
import NotFound from "@/components/shared/NotFound";

const page = async ({ searchParams }: SearchParamProps) => {
	const page = Number(searchParams?.page) || 1;
	const query = (searchParams?.query as string) || "";

	const { userId } = auth();

	const user = await getUserById(userId!);

	let documents;

	if (user?.identity === "lecturer") {
		documents = await getLecturerDocuments({
			userId: user?._id,
			page,
			query,
			limit: DOCUMENT_LIMITS,
		});
	} else if (user?.identity === "student") {
		documents = await getStudentDocuments({
			page,
			query,
			limit: DOCUMENT_LIMITS,
			userId: user?._id,
		});
	}

	console.log(documents?.data[0].course);

	if (documents?.status === 400)
		return <NotFound message={documents?.message} />;

	return (
		<main>
			<TopNavbar>
				<SearchBar type={"documents"} />
			</TopNavbar>
			<div className="container py-4">
				<PageHeader
					firstName={user.firstName}
					lastName={user.lastName}
					identity={user.identity}
					department={user.department}
					picture={user.picture}
				/>
				<div className="my-6">
					<h3 className="font-bold text-lg mb-4">My documents</h3>
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
							{documents?.data.map((document: DocumentProps) => {
								const fileType = document?.document
									?.split(".")
									.pop();
								return (
									<TableRow key={document?._id}>
										<TableCell className="font-medium">
											<Link
												href={`/documents/${document?._id}`}
												className="flex items-start md:items-center justify-start flex-col md:flex-row"
											>
												<Image
													src={
														fileType === "pdf"
															? "/assets/icons/pdf.svg"
															: "/assets/icons/word.svg"
													}
													alt={`${document?.title} file type is - ${fileType}`}
													width={1000}
													height={1000}
													className="w-6 h-6 object-cover mr-2"
												/>
												{document.title}
											</Link>
										</TableCell>
										<TableCell>
											{document.course.title}
										</TableCell>
										<TableCell>
											{document?.course.code}
										</TableCell>
										<TableCell className="text-right">
											{document.course.user.firstName}{" "}
											{document?.course.user.lastName}
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
					{documents?.data.length === 0 && (
						<p className="text-sm italic text-center mt-4">
							You have no document yet.
						</p>
					)}
				</div>
				{documents?.totalPages! > 1 && (
					<Pagination
						totalPages={documents?.totalPages}
						page={page}
					/>
				)}
			</div>
		</main>
	);
};

export default page;
