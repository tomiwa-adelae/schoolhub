declare interface SearchParamsProps {
	params: { id: string };
	searchParams: { [key: string]: string | string[] | undefined | string };
}

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
