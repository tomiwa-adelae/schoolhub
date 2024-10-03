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
	level: z.string().min(1, { message: "Level is required!" }),
	department: z.string().min(1, { message: "Department is required!" }),
	faculty: z.string().min(1, { message: "Faculty is required!" }),
});

export const LecturerFormSchema = z.object({
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
	department: z.string().min(1, { message: "Department is required!" }),
	faculty: z.string().min(1, { message: "Faculty is required!" }),
});

export const CourseFormSchema = z.object({
	title: z.string().min(2, {
		message: "Course title must be at least 2 characters.",
	}),
	code: z.string().min(3, {
		message: "Course code must be at least 3 characters.",
	}),
	unit: z.string().min(1, {
		message: "Course unit is required!",
	}),
});
