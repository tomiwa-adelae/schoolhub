import * as z from "zod";

export const ExeatFormSchema = z.object({
	reason: z.string().min(2, {
		message: "Reason must be at least 2 characters.",
	}),
	location: z.string().min(2, {
		message: "Location must be at least 2 characters.",
	}),
	departure: z.date({
		required_error: "A date of birth is required.",
	}),
});

export const StudentFormSchema = z.object({
	firstName: z.string().min(2, {
		message: "First name must be at least 2 characters.",
	}),
	lastName: z.string().min(2, {
		message: "Last name must be at least 2 characters.",
	}),
	email: z.string().email(),
	phoneNumber: z
		.string()
		.min(10, {
			message: "Phone number must be at least 10 characters.",
		})
		.max(11, { message: "Phone number must be valid." }),
	parentPhoneNumber: z
		.string()
		.min(10, {
			message: "Phone number must be at least 10 characters.",
		})
		.max(11, { message: "Phone number must be valid." }),
	matricNumber: z
		.string()
		.min(7, {
			message: "Matriculation/Admission must be valid.",
		})
		.max(13, { message: "Matriculation/Admission must be valid." }),
	level: z.string(),
	department: z.string(),
	faculty: z.string(),
});
