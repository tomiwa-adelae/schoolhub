import PageHeader from "@/components/PageHeader";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";

const page = async () => {
	const { userId } = auth();

	const user = await getUserById(userId!);

	return (
		<div>
			<PageHeader
				firstName={user.firstName}
				lastName={user.lastName}
				identity={user.identity}
				department={user.department}
				picture={user.picture}
			/>
		</div>
	);
};

export default page;
