"use server";

import { COURSES_LIMITS } from "@/constants";
import { connectToDatabase } from "../database";
import Course from "../database/models/course.model";
import User from "../database/models/user.model";
import { handleError } from "../utils";
import StudentCourse from "../database/models/student.course.model";
import { revalidatePath } from "next/cache";

// Get all the courses the lecturer is taking
export const getLecturerCourses = async ({
	query,
	limit = COURSES_LIMITS,
	page,
	userId,
}: GetLecturerCoursesProps) => {
	try {
		await connectToDatabase();

		const keyword = query
			? {
					$or: [
						{
							title: {
								$regex: query,
								$options: "i",
							},
						},
						{
							code: {
								$regex: query,
								$options: "i",
							},
						},
						{
							unit: {
								$regex: query,
								$options: "i",
							},
						},
					],
			  }
			: {};

		const user = await User.findById(userId);

		if (user.identity !== "lecturer")
			return {
				status: 400,
				message:
					"You are not authorized to access this information. Try again later.",
			};

		const skipAmount = (Number(page) - 1) * limit;

		const courses = await Course.find({ ...keyword, user: userId })
			.populate("user")
			.sort({ createdAt: -1 })
			.skip(skipAmount)
			.limit(limit);

		const allCourses = await Course.find({ user: userId });

		const courseCount = await Course.countDocuments({
			...keyword,
			user: userId,
		});

		// Get the total number of students offering each course
		const coursesWithStudentCount = await Promise.all(
			courses.map(async (course) => {
				// Query the StudentCourse collection to count how many students are offering this course
				const students = await StudentCourse.countDocuments({
					course: course._id,
				});

				return {
					...course.toObject(), // Convert the course to a plain object
					students, // Add the student count to the course object
				};
			})
		);

		return {
			data: JSON.parse(JSON.stringify(coursesWithStudentCount)),
			totalPages: Math.ceil(courseCount / limit),
			allCourses: allCourses.length,
		};
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error?.message ||
				"Oops! Couldn't get courses! Try again later.",
		};
	}
};

// Get all the courses the student is offering
export const getStudentCourses = async ({
	query,
	limit = COURSES_LIMITS,
	page,
	userId,
}: GetStudentCoursesProps) => {
	try {
		await connectToDatabase();

		const skipAmount = (Number(page) - 1) * limit;

		const studentCourses = await StudentCourse.find({ user: userId })
			.populate({
				path: "course",
				populate: { path: "user" },
			})
			.sort({ createdAt: -1 });

		const filteredCourses = studentCourses.filter((studentCourse) => {
			const course = studentCourse.course;
			if (!course) return false;

			const matchesTitle = course.title
				?.toLowerCase()
				.includes(query.toLowerCase());
			const matchesCode = course.code
				?.toLowerCase()
				.includes(query.toLowerCase());
			const matchesUnit = course.unit
				?.toLowerCase()
				.includes(query.toLowerCase());
			const matchesLecturerFirstName = course.user.firstName
				?.toLowerCase()
				.includes(query.toLowerCase());
			const matchesLecturerLastName = course.user.lastName
				?.toLowerCase()
				.includes(query.toLowerCase());
			const matchesLecturerEmail = course.user.email
				?.toLowerCase()
				.includes(query.toLowerCase());
			const matchesLecturerDepartment = course.user.department
				?.toLowerCase()
				.includes(query.toLowerCase());
			const matchesLecturerFaculty = course.user.faculty
				?.toLowerCase()
				.includes(query.toLowerCase());
			const matchesLecturerPhoneNumber = course.user.phoneNumber
				?.toLowerCase()
				.includes(query.toLowerCase());

			return (
				matchesTitle ||
				matchesCode ||
				matchesUnit ||
				matchesLecturerFirstName ||
				matchesLecturerLastName ||
				matchesLecturerEmail ||
				matchesLecturerDepartment ||
				matchesLecturerFaculty ||
				matchesLecturerPhoneNumber
			);
		});

		const paginatedCourses = filteredCourses.slice(
			skipAmount,
			skipAmount + limit
		);

		const courseCount = filteredCourses.length;

		return {
			data: JSON.parse(JSON.stringify(paginatedCourses)),
			totalPages: Math.ceil(courseCount / limit),
			allCourses: studentCourses.length,
		};
	} catch (error: any) {
		return {
			status: error?.status || 400,
			message:
				error?.message ||
				"Oops! Couldn't get courses! Try again later.",
		};
	}
};

// Create a new course by the lecturer
export const createNewCourse = async ({
	title,
	code,
	unit,
	userId,
}: CreateNewCourseProps) => {
	try {
		await connectToDatabase();

		if (!title || !code || !unit)
			return {
				status: 400,
				message: "Please enter all fields.",
			};

		const user = await User.findById(userId);

		if (user.identity !== "lecturer")
			return {
				status: 400,
				message:
					"You are not authorized to create a course. Try again later.",
			};

		const courseExist = await Course.findOne({ code });

		if (courseExist)
			return {
				status: 400,
				message: `The course with this code - ${code} already exist!`,
			};

		const course = await Course.create({
			title,
			code,
			unit,
			user: userId,
		});

		if (!course)
			return {
				status: 400,
				message: `An error occurred! ${code} not created. Try again later.`,
			};

		revalidatePath("/courses/new");

		return {
			course: JSON.parse(JSON.stringify(course)),
			message: `You have successfully created ${course.code} - ${course.title}.`,
		};
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error?.message ||
				"Oops! Couldn't created course! Try again later.",
		};
	}
};

// Get course details by id
export const getCourseById = async (id: string) => {
	try {
		await connectToDatabase();

		const course = await Course.findById(id).populate("user");

		if (!course)
			return {
				status: 400,
				message: "Oops! Course does not exist! Try again later.",
			};

		return JSON.parse(JSON.stringify(course));
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error?.message || "Oops! Couldn't get course! Try again later.",
		};
	}
};

// Get all courses by students
// Get all courses by students
export const getAvailableCourses = async ({
	query,
	limit = COURSES_LIMITS,
	page,
	userId,
}: getAvailableCoursesProps) => {
	try {
		await connectToDatabase();

		// Find all courses already taken by the student
		const studentCourses = await StudentCourse.find({
			user: userId,
		}).select("course");

		const takenCourseIds = studentCourses.map((sc) => sc.course);

		// Pagination calculations
		const skipAmount = (Number(page) - 1) * limit;

		// Get total count of available courses for the student (before applying pagination)
		const totalCourseCount = await Course.countDocuments({
			_id: { $nin: takenCourseIds },
		});

		// Fetch courses for the current page
		const availableCourses = await Course.find({
			_id: { $nin: takenCourseIds },
		})
			.populate("user")
			.sort({ createdAt: -1 })
			.skip(skipAmount) // Skip based on the current page
			.limit(limit); // Limit based on pagination size

		// Filter courses based on the query (search criteria)
		const filteredCourses = availableCourses.filter((availableCourse) => {
			if (!availableCourse) return false;

			const matchesTitle = availableCourse.title
				?.toLowerCase()
				.includes(query.toLowerCase());
			const matchesCode = availableCourse.code
				?.toLowerCase()
				.includes(query.toLowerCase());
			const matchesUnit = availableCourse.unit
				?.toLowerCase()
				.includes(query.toLowerCase());
			const matchesLecturerFirstName = availableCourse.user.firstName
				?.toLowerCase()
				.includes(query.toLowerCase());
			const matchesLecturerLastName = availableCourse.user.lastName
				?.toLowerCase()
				.includes(query.toLowerCase());
			const matchesLecturerEmail = availableCourse.user.email
				?.toLowerCase()
				.includes(query.toLowerCase());
			const matchesLecturerDepartment = availableCourse.user.department
				?.toLowerCase()
				.includes(query.toLowerCase());
			const matchesLecturerFaculty = availableCourse.user.faculty
				?.toLowerCase()
				.includes(query.toLowerCase());
			const matchesLecturerPhoneNumber = availableCourse.user.phoneNumber
				?.toLowerCase()
				.includes(query.toLowerCase());

			return (
				matchesTitle ||
				matchesCode ||
				matchesUnit ||
				matchesLecturerFirstName ||
				matchesLecturerLastName ||
				matchesLecturerEmail ||
				matchesLecturerDepartment ||
				matchesLecturerFaculty ||
				matchesLecturerPhoneNumber
			);
		});

		// Calculate total pages based on totalCourseCount
		const totalPages = Math.ceil(totalCourseCount / limit);

		return {
			data: JSON.parse(JSON.stringify(filteredCourses)),
			totalPages: totalPages, // Total number of pages
		};
	} catch (error) {
		throw new Error("Error fetching available courses");
	}
};

// Add new course as a student
export const addNewCourse = async ({
	userId,
	courseId,
	path,
}: {
	userId: string;
	courseId: string;
	path: string;
}) => {
	try {
		await connectToDatabase();

		const user = await User.findById(userId);

		if (user.identity !== "student")
			return {
				status: 400,
				message:
					"You are not authorized to add a course. Try again later.",
			};

		const course = await Course.findById(courseId);

		if (!course)
			return {
				status: 400,
				message: "Course not found. An error occurred!",
			};

		const alreadyRegistered = await StudentCourse.findOne({
			user: userId,
			course: courseId,
		});

		if (alreadyRegistered)
			return {
				status: 400,
				message:
					"You are already offering this course. You cannot add it for the second time.",
			};

		const newCourse = await StudentCourse.create({
			user: userId,
			course: courseId,
		});

		if (!newCourse)
			return {
				status: 400,
				message: "Course not successfully created. An error occurred.",
			};

		revalidatePath(path);

		return {
			data: JSON.parse(JSON.stringify(newCourse)),
			message: "Course added successfully!",
		};
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error?.message ||
				"Oops! Course does not exist! Try again later.",
		};
	}
};

// Get students offering a particular course by the lecturer
export const getStudents = async ({
	courseId,
	userId,
}: {
	courseId: string;
	userId: string;
}) => {
	try {
		await connectToDatabase();

		const user = await User.findById(userId);

		if (user.identity !== "lecturer")
			return {
				status: 400,
				message:
					"You are not authorized to access this information a course. Try again later.",
			};

		const students = await StudentCourse.find({ course: courseId })
			.populate("user")
			.populate("course")
			.sort({
				createdAt: -1,
			});

		return JSON.parse(JSON.stringify(students));
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error?.message ||
				"Oops! Couldn't find students! Try again later.",
		};
	}
};

// Edit course details by lecturer
export const editCourseDetails = async ({
	courseId,
	userId,
	title,
	code,
	unit,
}: {
	courseId: string;
	userId: string;
	title: string;
	unit: string;
	code: string;
}) => {
	try {
		await connectToDatabase();

		const user = await User.findById(userId);

		if (user.identity !== "lecturer")
			return {
				status: 400,
				message:
					"You are not authorized to edit this course details. Try again later.",
			};

		const course = await Course.findById(courseId);

		if (!course)
			return {
				status: 400,
				message: "Course not found. An error occurred!",
			};

		course.title = title || course.title;
		course.code = code || course.code;
		course.unit = unit || course.unit;

		await course.save();

		revalidatePath(`/courses/${courseId}`);
		revalidatePath(`/courses`);
		revalidatePath(`/dashboard`);

		return { message: `You have successfully edited the course.` };
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error?.message ||
				"Oops! Couldn't edit course details! Try again later.",
		};
	}
};
