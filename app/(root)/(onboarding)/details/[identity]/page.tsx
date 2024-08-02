import { StudentForm } from "@/components/forms/StudentForm";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";

import { Irish_Grover } from "next/font/google";

const irishGrover = Irish_Grover({
	subsets: ["latin"],
	weight: ["400"],
});

const page = async ({ params: { identity } }: SearchParamProps) => {
	const { userId } = auth();

	const user = await getUserById(userId!);

	return (
		<div>
			<h1
				className={`${irishGrover.className} text-3xl md:text-5xl lg:text-6xl text-center mb-6`}
			>
				Tell us a little about yourself to personalize your experience
			</h1>
			<StudentForm id={userId!} user={user} />
		</div>
	);
};

export default page;
