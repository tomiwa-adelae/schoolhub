import Image from "next/image";

interface DocumentHeaderProps {
	firstName: string;
	lastName: string;
	department?: string;
	title?: string;
	picture?: string;
	children?: React.ReactNode;
	courseTitle: string;
	courseCode: string;
	fileType: string;
}

const DocumentHeader = ({
	firstName,
	lastName,
	department,
	title,
	picture,
	children,
	courseTitle,
	courseCode,
	fileType,
}: DocumentHeaderProps) => {
	return (
		<div className="flex items-center justify-between flex-col md:flex-row w-full gap-4">
			<div className="flex items-center justify-start w-full gap-4">
				<Image
					src={
						fileType === "pdf"
							? "/assets/icons/pdf.svg"
							: "/assets/icons/word.svg"
					}
					alt={`Type of ${title} file`}
					width={1200}
					height={1000}
					className="rounded-md w-12 h-12 object-cover"
				/>
				<div className="flex items-start justify-center flex-col space-y-1">
					<h3 className="font-bold text-base">
						{title} - {courseTitle} - {courseCode}
					</h3>
					<small className="text-xs text-gray-400 dark:text-gray-300">
						{firstName} {lastName} - Lecturer of{" "}
						<span className="capitalize">{department}</span>{" "}
						department.
					</small>
				</div>
			</div>

			{children}
		</div>
	);
};

export default DocumentHeader;
