import Image from "next/image";
import React from "react";

const Document = () => {
	return (
		<div className="flex items-center justify-start gap-2">
			<Image
				src={"/assets/icons/word.svg"}
				alt="Word file"
				width={1000}
				height={1000}
				className="w-10 h-10 object-cover rounded-md"
			/>
			<div className="flex flex-col items-start justify-start space-y-1">
				<h4 className="text-xs font-bold">
					Theory of superposition of light - PHY4216
				</h4>
				<small className="text-gray-400 text-xs">
					12th of September, 2024
				</small>
			</div>
		</div>
	);
};

export default Document;
