"use server";

import { connectToDatabase } from "../database";
import Course from "../database/models/course.model";
import User from "../database/models/user.model";
import { handleError } from "../utils";

// Get all the courses the lecturer is taking
export const getLecturerCourses = async ({
	query,
	limit = 10,
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
	} catch (error) {
		handleError(error);
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
			throw new Error("Lecturer not found so try again later!");

		const courseExist = await Course.findOne({ code });

		if (courseExist)
			throw new Error("The course with this code already exist!");

		const course = await Course.create({
			title,
			code,
			unit,
			user: userId,
		});

		if (!course) throw new Error(`An error occurred! ${code} not created!`);

		return JSON.parse(JSON.stringify(course));
	} catch (error: any) {
		handleError(error);
		return {
			status: error.status || 400,
			message:
				error.message || "Oops! Course not created. Try again later.",
		};
	}
};

// Get course details by id
export const getCourseById = async (id: string) => {
	try {
		await connectToDatabase();

		const course = await Course.findById(id);

		if (!course)
			throw new Error("Oops! Course does not exist! Try again later.");

		return JSON.parse(JSON.stringify(course));
	} catch (error: any) {
		handleError(error);
		return {
			status: error.status || 400,
			message:
				error.message ||
				"Oops! Course does not exist! Try again later.",
		};
	}
};
