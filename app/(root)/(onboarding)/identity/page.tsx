import Identity from "@/components/Identity";
import { auth } from "@clerk/nextjs";
import { Irish_Grover } from "next/font/google";

const irishGrover = Irish_Grover({
	subsets: ["latin"],
	weight: ["400"],
});

const page = () => {
	const { userId } = auth();

	return (
		<div className="text-center flex flex-col items-center justify-center gap-4 space-y-4">
			<h1
				className={`${irishGrover.className} text-3xl md:text-5xl lg:text-6xl`}
			>
				Who are you?
			</h1>
			<Identity id={userId!} />
		</div>
	);
};

export default page;
