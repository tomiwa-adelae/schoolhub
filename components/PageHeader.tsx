import Image from "next/image";
import { Button } from "./ui/button";

interface PageHeaderProps {
	firstName: string;
	lastName: string;
	department?: string;
	identity?: string;
	picture?: string;
	children?: React.ReactNode;
}

const PageHeader = ({
	firstName,
	lastName,
	department,
	identity,
	picture,
	children,
}: PageHeaderProps) => {
	return (
		<div className="flex items-center justify-between flex-col md:flex-row w-full gap-4">
			<div className="flex items-center justify-start w-full gap-4">
				<Image
					src={
						picture ||
						"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
					}
					alt="Test"
					width={1200}
					height={1000}
					className="rounded-full w-12 h-12 object-cover"
				/>
				<div className="flex items-start justify-center flex-col space-y-1">
					<h3 className="font-bold text-base">
						Hello, {firstName} {lastName}
					</h3>
					<small className="text-xs text-gray-400 dark:text-gray-300">
						<span className="capitalize">{identity}</span> of{" "}
						<span className="capitalize">{department}</span>{" "}
						department.
					</small>
				</div>
			</div>

			{children}
		</div>
	);
};

export default PageHeader;
