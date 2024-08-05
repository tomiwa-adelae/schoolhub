"use client";
import { Button } from "./ui/button";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { Theme } from "./shared/Theme";
import { useRouter } from "next/navigation";

const ChatHead = () => {
	const router = useRouter();

	return (
		<div className="flex items-center justify-between bg-white dark:bg-dark border-b-2 border-dashed border-gray-400 p-2 w-full">
			<div className="flex items-center justify-start gap-2">
				<Button asChild size={"icon"} variant={"ghost"}>
					<div onClick={() => router.back()}>
						<ArrowLeft />
					</div>
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
