"use client";

// import { generateQRCode } from "@/lib/actions/qrcode.actions";
import { toast } from "@/components/ui/use-toast";
import { ExpandQRCode } from "./modals/ExpandQRCode";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

const GenerateQRCodeButton = ({
	courseId,
	userId,
	qrcode,
	date,
	title,
}: {
	courseId: string;
	userId: string;
	qrcode: string;
	date: string;
	title: string;
}) => {
	const [loading, setLoading] = useState(false);

	const handleGenerate = async () => {
		try {
			setLoading(true);

			const date = new Date();

			// Get day, month and year from the date object
			const day = date.getDate();
			const month = date.toLocaleString("default", { month: "long" });
			const year = date.getFullYear();

			// Format the date as "day month, year"
			const formattedDate = `${day} ${month}, ${year}`;

			// const res = await generateQRCode({
			// 	courseId,
			// 	userId,
			// 	date: formattedDate,
			// });

			// if (res?.status == 400)
			// 	return toast({
			// 		title: "Error!",
			// 		description: res?.message,
			// 		variant: "destructive",
			// 	});

			// toast({
			// 	title: "Success!",
			// 	description: res?.message,
			// });
			setLoading(false);
		} catch (error) {
			setLoading(false);
			toast({
				title: "Error!",
				description: "An error occurred!",
				variant: "destructive",
			});
		} finally {
			setLoading(false);
		}
	};
	return (
		<>
			{qrcode ? (
				<ExpandQRCode qrcode={qrcode} date={date} title={title} />
			) : (
				<div
					className="flex flex-col items-center justify-center gap-4 border-2 border-dashed border-gray-400 rounded-md"
					onClick={handleGenerate}
				>
					{loading && <LoaderCircle className="animate-spin" />}
					{!loading && (
						<h3 className="font-bold text-base">Generate QRCode</h3>
					)}
				</div>
			)}
		</>
	);
};

export default GenerateQRCodeButton;
