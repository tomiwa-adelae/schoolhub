import type { Metadata } from "next";

import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Onboarding | SchoolHub",
};

export default function OnboardingLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="min-h-screen w-full">
			<Header>
				<SignedIn>
					<UserButton />
				</SignedIn>
				<SignedOut>
					<Button asChild>
						<Link href="/sign-in">Join now</Link>
					</Button>
				</SignedOut>
			</Header>
			<div className="py-10 container">{children}</div>
		</div>
	);
}
