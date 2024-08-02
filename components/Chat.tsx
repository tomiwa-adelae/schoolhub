import Image from "next/image";
import Link from "next/link";
import React from "react";

const Chat = () => {
	return (
		<Link
			href="/chats/12345"
			className="flex items-center justify-start gap-2 transition hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer p-2 rounded-md"
		>
			<Image
				src={"/assets/user.jpg"}
				alt={"User"}
				height={1000}
				width={1000}
				className="rounded-full w-10 h-10 object-cover"
			/>
			<div className="flex flex-col items-start justify-start space-y-1">
				<h4 className="font-bold text-xs">Raymond Reddington</h4>
				<small className="text-gray-400 text-xs line-clamp-1">
					You: No, I have not been to the new part by wall street No,
					I have not been to the new part by wall street
				</small>
			</div>
		</Link>
	);
};

export default Chat;
