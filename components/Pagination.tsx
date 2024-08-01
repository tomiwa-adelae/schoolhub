"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const Pagination = () => {
	return (
		<div className="flex items-center justify-between">
			<Button
				variant={"ghost"}
				className="flex justify-center group/modal-btn px-4 py-2 rounded-md text-center relative overflow-hidden"
			>
				<span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
					Previous
				</span>
				<div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 z-20">
					<ArrowLeft />
				</div>
			</Button>
			<Button
				variant={"ghost"}
				className="flex justify-center group/modal-btn px-4 py-2 rounded-md text-center relative overflow-hidden"
			>
				<span className="group-hover/modal-btn:-translate-x-40 text-center transition duration-500">
					Next
				</span>
				<div className="translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 z-20">
					<ArrowRight />
				</div>
			</Button>
		</div>
	);
};

export default Pagination;
