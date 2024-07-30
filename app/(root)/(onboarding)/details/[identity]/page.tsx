import { StudentForm } from "@/components/forms/StudentForm";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";

const page = async ({ params: { identity } }: SearchParamProps) => {
	const { userId } = auth();

	const user = await getUserById(userId!);

	return (
		<div>
			<StudentForm id={userId!} user={user} />
		</div>
	);
};

export default page;
