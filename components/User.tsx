import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ConfirmSendMailModal } from "./modals/ConfirmSendMailModal";

const User = ({
	picture,
	firstName,
	lastName,
	email,
	id,
}: {
	picture: string;
	lastName: string;
	firstName: string;
	email: string;
	id: string;
}) => {
	return (
		<div className="flex items-center justify-start gap-2">
			<Image
				src={
					picture ||
					"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
				}
				alt={`${firstName} ${lastName}'s picture`}
				width={1000}
				height={1000}
				className="w-10 h-10 object-cover rounded-full"
			/>
			<div className="flex-1 flex flex-col items-start justify-start space-y-1">
				<h4 className="text-xs font-bold">
					{firstName} {lastName}
				</h4>
				<a
					href={`mailto:${email}`}
					target="_blank"
					className="text-gray-400 text-xs hover:underline hover:text-blue-400 transition"
				>
					{email}
				</a>
			</div>
			<div className="flex items-center justify-center gap-4">
				<Link href={`/chats/${id}`}>
					<Image
						src={"/assets/icons/chat.svg"}
						alt="Chat icon"
						width={1000}
						height={1000}
						className="w-6 h-6 object-cover dark:invert"
					/>
				</Link>
				<ConfirmSendMailModal
					email={email}
					firstName={firstName}
					lastName={lastName}
				/>
			</div>
		</div>
	);
};

export default User;
