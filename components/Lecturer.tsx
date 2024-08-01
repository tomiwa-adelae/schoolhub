import Image from "next/image";
import Link from "next/link";
import React from "react";

const Lecturer = () => {
	return (
		<div className="flex items-center justify-start gap-2">
			<Image
				src={"/assets/user.jpg"}
				alt="User"
				width={1000}
				height={1000}
				className="w-10 h-10 object-cover rounded-full"
			/>
			<div className="flex-1 flex flex-col items-start justify-start space-y-1">
				<h4 className="text-xs font-bold">Dr. Paul Amalu</h4>
				<a
					href="mailto:"
					className="text-gray-400 text-xs hover:underline hover:text-blue-400 transition"
				>
					pc.amalu@acu.edu.ng
				</a>
			</div>
			<div className="flex items-center justify-center gap-4">
				<Link href="/">
					<Image
						src={"/assets/icons/chat.svg"}
						alt="Chat icon"
						width={1000}
						height={1000}
						className="w-6 h-6 object-cover dark:invert"
					/>
				</Link>
				<Link href="/">
					<Image
						src={"/assets/icons/mail.svg"}
						alt="Mail icon"
						width={1000}
						height={1000}
						className="w-6 h-6 object-cover dark:invert"
					/>
				</Link>
			</div>
		</div>
	);
};

export default Lecturer;
