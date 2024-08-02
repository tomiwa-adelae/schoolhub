import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { Theme } from "./shared/Theme";

const ChatHead = () => {
	return (
		<div className="flex items-center justify-between bg-white dark:bg-dark border-b-2 border-dashed border-gray-400 p-2 w-full">
			<div className="flex items-center justify-start gap-2">
				<Button asChild size={"icon"} variant={"ghost"}>
					<Link href="/chats">
						<ArrowLeft />
					</Link>
				</Button>
				<Image
					src={"/assets/user.jpg"}
					alt={"User"}
					width={1000}
					height={1000}
					className="w-11 h-11 object-cover rounded-full"
				/>
				<h3 className="font-bold text-sm">Raymond Reddington</h3>
			</div>
			<Theme />
		</div>
	);
};

export default ChatHead;
