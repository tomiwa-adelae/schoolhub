// import { markAttendance } from "@/lib/actions/attendance.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { IUser } from "@/lib/database/models/user.model";
import { auth } from "@clerk/nextjs";

const page = async ({ searchParams }: SearchParamProps) => {
	const id = (searchParams?.id as string) || "";
	const date = (searchParams?.date as string) || "";

	const { userId } = auth();

	const user: IUser = await getUserById(userId!);

	// const attendance = await markAttendance({
	// 	userId: user?._id,
	// 	courseId: id,
	// 	date,
	// });

	// console.log(attendance);

	return <div>page</div>;
};

export default page;
