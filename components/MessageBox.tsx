import Image from "next/image";

export const MessageBoxLeft = () => {
	return (
		<div className="flex items-start gap-2">
			<Image
				className="w-10 h-10 object-cover rounded-full"
				src={"/assets/user.jpg"}
				alt="Jese image"
				width={1000}
				height={1000}
			/>

			<div>
				<p className="text-sm font-normal p-2 border-gray-200 bg-gray-200 rounded-md rounded-tl-none dark:bg-gray-700 max-w-max w-10/12">
					Hey Amanda. I have not heard from you in a long while. My
					love?❤❤❤❤
				</p>
				<span className="text-xs ml-2 text-gray-500 dark:text-gray-400 font-bold">
					11:46
				</span>
			</div>
		</div>
	);
};

import React from "react";

export const MessageBoxRight = () => {
	return (
		<div className="flex items-start justify-end gap-2">
			<div className="flex items-end flex-col">
				<p className="text-sm font-normal p-2 border-gray-200 bg-blue-100 rounded-md rounded-tr-none dark:bg-blue-900 max-w-max w-10/12">
					Hey Amanda. I have not heard from you in a long while. Hope
					you are doing fine, My love?❤❤❤❤
				</p>
				<span className="text-xs mr-2 text-gray-500 dark:text-gray-400 font-bold">
					11:46
				</span>
			</div>
		</div>
	);
};
