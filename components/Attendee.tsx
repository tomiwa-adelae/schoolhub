import Image from "next/image";
import React from "react";

const Attendee = ({ date }: { date: string }) => {
	return (
		<div className="flex items-center justify-start gap-2">
			<Image
				src={"/assets/user.jpg"}
				alt="User"
				width={1000}
				height={1000}
				className="w-10 h-10 object-cover rounded-md"
			/>
			<div className="flex flex-col items-start justify-start space-y-1">
				<h4 className="text-xs font-bold">Ademola Adetomiwa</h4>
				<small className="text-gray-400 text-xs">
					Physics department, Natural Science
				</small>
			</div>
		</div>
	);
};

export default Attendee;
