import Image from "next/image";
import React from "react";

const Colleague = () => {
	return (
		<div className="flex items-center justify-start gap-2">
			<Image
				src={"/assets/user.jpg"}
				alt="User"
				width={1000}
				height={1000}
				className="w-10 h-10 object-cover rounded-full"
			/>
			<div className="flex flex-col items-start justify-start space-y-1">
				<h4 className="text-xs font-bold">Johnson Stevenson</h4>
				<a
					href="mailto:"
					className="text-gray-400 text-xs hover:underline hover:text-blue-400 transition"
				>
					johnsonsteveson@gmail.com
				</a>
			</div>
		</div>
	);
};

export default Colleague;
