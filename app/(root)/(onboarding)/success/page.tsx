import { Button } from "@/components/ui/button";
import { Irish_Grover } from "next/font/google";
import Link from "next/link";

const irishGrover = Irish_Grover({
	subsets: ["latin"],
	weight: ["400"],
});

const Success = () => {
	return (
		<main className="text-center flex flex-col items-center justify-center gap-4 space-y-4">
			<h1
				className={`${irishGrover.className} text-3xl md:text-5xl lg:text-6xl`}
			>
				You&apos;re all set!
			</h1>
			<p className="text-sm md:text-base md:w-5/6">
				Your setup is complete. Enjoy using SchoolHub to enhance your
				university experience. If you need any help, our support team is
				here for you.
			</p>
			<Button asChild>
				<Link href="/dashboard">Go to dashboard</Link>
			</Button>
		</main>
	);
};

export default Success;
