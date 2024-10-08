import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const Document = ({
	title,
	document,
	_id,
	code,
	createdAt,
}: {
	document: string;
	title: string;
	_id: string;
	code: string;
	createdAt: string;
}) => {
	const fileType = document?.split(".").pop();

	return (
		<div className="flex items-center justify-start gap-2">
			<Image
				src={
					fileType === "pdf"
						? "/assets/icons/pdf.svg"
						: "/assets/icons/word.svg"
				}
				alt={`${title} file type is - ${fileType}`}
				width={1000}
				height={1000}
				className="w-10 h-10 object-cover rounded-md"
			/>
			<div className="flex flex-col items-start justify-start space-y-1">
				<Link
					href={`/documents/${_id}`}
					className="hover:underline hover:text-blue-400"
				>
					<h4 className="text-xs font-bold">
						{title} - {code}
					</h4>
				</Link>
				<small className="text-gray-400 text-xs">
					{formatDate(createdAt)}
				</small>
			</div>
		</div>
	);
};

export default Document;
