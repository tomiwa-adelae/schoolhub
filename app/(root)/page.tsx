import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Irish_Grover } from "next/font/google";
import Link from "next/link";

const irishGrover = Irish_Grover({
	subsets: ["latin"],
	weight: ["400"],
});

export default function Home() {
	return (
		<main className="min-h-screen flex items-center justify-between flex-col">
			<Header>
				<SignedIn>
					<UserButton afterSignOutUrl="/" />
				</SignedIn>
				<SignedOut>
					<Button asChild>
						<Link href="/sign-in">Join now</Link>
					</Button>
				</SignedOut>
			</Header>
			<div className="flex-1 text-center flex flex-col items-center justify-center gap-4 space-y-4 container">
				<h1
					className={`${irishGrover.className} text-3xl md:text-5xl lg:text-6xl`}
				>
					One platform,
					<span className="bg-gradient-to-r from-green-700 to-orange-600 bg-clip-text text-transparent">
						endless possibilities
					</span>
				</h1>
				<p className="text-sm md:text-base md:w-5/6">
					Streamline your university experience with our all-in-one
					platform for academic, administrative, and student life
					needs. Everything you need is just a click away.
				</p>
				<Button asChild>
					<Link href="/sign-up">Get started now</Link>
				</Button>
			</div>
		</main>
	);
}
