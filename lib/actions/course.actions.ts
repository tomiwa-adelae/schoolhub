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
					],
			  }
			: {};

		const skipAmount = (Number(page) - 1) * limit;

		const courses = await Course.find({ ...keyword, user: userId })
			.populate("user")
			.sort({ createdAt: -1 })
			.skip(skipAmount)
			.limit(limit);

		const courseCount = await Course.countDocuments({ ...keyword });

		return {
			data: JSON.parse(JSON.stringify(courses)),
			totalPages: Math.ceil(courseCount / limit),
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
					],
			  }
			: {};

		const skipAmount = (Number(page) - 1) * limit;

		const courses = await StudentCourse.find({ ...keyword, user: userId })
			.populate({
				path: "course",
				populate: { path: "user" },
			})
			.sort({ createdAt: -1 })
			.skip(skipAmount)
			.limit(limit);

		const courseCount = await StudentCourse.countDocuments({ ...keyword });

		return {
			data: JSON.parse(JSON.stringify(courses)),
			totalPages: Math.ceil(courseCount / limit),
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

// Create a new course by the lecturer
export const createNewCourse = async ({
	title,
	code,
	unit,
	userId,
}: CreateNewCourseProps) => {
	try {
		await connectToDatabase();

		const lecturer = await User.findById(userId);

		if (!lecturer)
			return {
				status: 400,
				message: "Lecturer not found so try again later!",
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
				message: `An error occurred! ${code} not created!`,
			};

		return JSON.parse(JSON.stringify(course));
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
export const getAvailableCourses = async ({
	query,
	limit = COURSES_LIMITS,
	page,
	userId,
}: getAvailableCoursesProps) => {
	try {
		await connectToDatabase();

		const studentCourses = await StudentCourse.find({
			user: userId,
		}).select("course");

		const takenCourseIds = studentCourses.map((sc) => sc.course);

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
					],
			  }
			: {};

		const skipAmount = (Number(page) - 1) * limit;

		const availableCourses = await Course.find({
			...keyword,
			_id: { $nin: takenCourseIds },
		})
			.populate("user")
			.sort({ createdAt: -1 })
			.skip(skipAmount)
			.limit(limit);

		const totalCourses = await Course.countDocuments({
			...keyword,
			_id: { $nin: takenCourseIds },
		});

		return {
			data: JSON.parse(JSON.stringify(availableCourses)),
			totalPages: Math.ceil(totalCourses / limit),
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

		if (!user)
			return {
				status: 400,
				message: "User not found. An error occurred!",
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
