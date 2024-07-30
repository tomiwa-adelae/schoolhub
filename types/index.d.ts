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
	level?: string;
	department?: string;
	faculty?: string;
	identity?: string | any;
}
