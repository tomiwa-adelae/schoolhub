import DocumentDisplay from "@/components/DocumentDisplay";
import DocumentHeader from "@/components/DocumentHeader";
import { DeleteDocumentModal } from "@/components/modals/DeleteDocumentModal";
import PDFViewer from "@/components/PDFViewer";
import TopNavbar from "@/components/shared/TopNavbar";
import { Button } from "@/components/ui/button";
import { getDocumentById } from "@/lib/actions/document.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { IUser } from "@/lib/database/models/user.model";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

const page = async ({ params: { id } }: { params: { id: string } }) => {
	const { userId } = auth();

	const user: IUser = await getUserById(userId!);

	const document = await getDocumentById(id);

	const fileType = document?.document?.split(".").pop();

	return (
		<main>
			<TopNavbar />
			<div className="container py-4">
				<DocumentHeader
					firstName={document?.course?.user.firstName}
					lastName={document?.course?.user?.lastName}
					department={document?.course?.user?.department}
					picture={document?.course?.user?.picture}
					courseTitle={document?.course?.title}
					title={document?.title}
					courseCode={document?.course?.code}
					fileType={fileType}
				>
					{user.identity === "student" && (
						<Button asChild className="w-full md:w-auto">
							<Link href={`/`}>Document {document?.title}</Link>
						</Button>
					)}
					{user?.identity === "lecturer" && (
						<DeleteDocumentModal
							title={document?.title}
							id={document?._id}
							userId={user?._id}
						/>
					)}
				</DocumentHeader>
				<div className="my-6">
					<DocumentDisplay
						document={document?.document}
						fileType={fileType}
					/>
				</div>
			</div>
		</main>
	);
};

export default page;
