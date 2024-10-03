declare type SearchParamProps = {
	params: { [key: string]: string };
	searchParams: { [key: string]: string | string[] | undefined };
};

declare interface CreateUserParams {
	clerkId: string;
	firstName: string;
	lastName: string;
	email: string;
	picture: string;
}

declare interface UpdateUserParams {
	firstName: string;
	lastName: string;
	picture?: string;
}

declare interface OnboardingUserParams {
	firstName: string;
	lastName: string;
	picture?: string;
	matricNumber?: string;
	phoneNumber?: string;
	parentPhoneNumber?: string;
	level?: string;
	department?: string;
	faculty?: string;
	identity?: string | any;
}

declare interface UrlQueryParams {
	params: string;
	key: string;
	value: string | null;
}

declare interface RemoveUrlQueryParams {
	params: string;
	keysToRemove: string[];
}

declare interface GetLecturerCoursesProps {
	query: string;
	limit: number;
	page: number;
	userId: string;
}

declare interface CreateNewCourseProps {
	code: string;
	title: string;
	unit: string;
	userId: string;
}
