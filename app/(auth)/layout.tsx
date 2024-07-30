import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Auth | SchoolHub",
};

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex items-center justify-center min-h-screen">
			{children}
		</div>
	);
}
