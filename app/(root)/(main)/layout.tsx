import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "SchoolHub",
};

export default function MainLayout({
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
