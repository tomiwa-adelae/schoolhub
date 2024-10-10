"use server";
import { connectToDatabase } from "../database";
import Course from "../database/models/course.model";
import StudentCourse from "../database/models/student.course.model";
import User from "../database/models/user.model";
import { handleError } from "../utils";

export const createUser = async (user: CreateUserParams) => {
	try {
		await connectToDatabase();

		const newUser = await User.create(user);

		return JSON.parse(JSON.stringify(newUser));
	} catch (error) {
		handleError(error);
	}
};

export const updateUser = async (clerkId: string, user: UpdateUserParams) => {
	try {
		await connectToDatabase();

		const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
			new: true,
		});

		if (!updatedUser) throw new Error("User update failed!");

		return JSON.parse(JSON.stringify(updatedUser));
	} catch (error) {
		handleError(error);
	}
};

export const deleteUser = async (clerkId: string) => {
	try {
		await connectToDatabase();

		const userToDelete = await User.findOne({ clerkId });

		if (!userToDelete) throw new Error("User update failed!");

		const deletedUser = await User.findByIdAndDelete(userToDelete._id);

		return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
	} catch (error) {
		handleError(error);
	}
};

export const getUserById = async (clerkId: string) => {
	try {
		await connectToDatabase();

		const user = await User.findOne({ clerkId });

		if (!user)
			return {
				status: 400,
				message: "User not found. An error occurred!",
			};
		return JSON.parse(JSON.stringify(user));
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error?.message || "Oops! Couldn't get user! Try again later.",
		};
	}
};

export const updateIdentity = async (clerkId: string, identity: string) => {
	try {
		await connectToDatabase();

		const updatedIdentity = await User.findOne({ clerkId });

		if (!updatedIdentity)
			return {
				status: 400,
				message: "User not found. An error occurred!",
			};

		updatedIdentity.identity = identity;

		await updatedIdentity.save();

		return JSON.parse(
			JSON.stringify({
				message: "You have successfully updated your identity.",
			})
		);
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error?.message ||
				"Oops! Couldn't update your identity! Try again later.",
		};
	}
};

export const updateBoardingUserDetails = async (clerkId: string, user: any) => {
	try {
		await connectToDatabase();
		const boardingUser = await User.findOne({ clerkId });

		if (!boardingUser)
			return {
				status: 400,
				message: "User not found. An error occurred!",
			};

		const {
			firstName,
			lastName,
			email,
			phoneNumber,
			matricNumber,
			parentPhoneNumber,
			level,
			department,
			faculty,
		} = user;

		if (
			!firstName ||
			!lastName ||
			!email ||
			!phoneNumber ||
			!matricNumber ||
			!parentPhoneNumber ||
			!level ||
			!department ||
			!faculty
		)
			return {
				status: 400,
				message: "Please enter all fields!",
			};

		boardingUser.firstName = firstName;
		boardingUser.lastName = lastName;
		boardingUser.email = email;
		boardingUser.matricNumber = matricNumber;
		boardingUser.phoneNumber = phoneNumber;
		boardingUser.parentPhoneNumber = parentPhoneNumber;
		boardingUser.level = level;
		boardingUser.department = department;
		boardingUser.faculty = faculty;
		boardingUser.successfulBoarding = true;

		await boardingUser.save();

		return JSON.parse(
			JSON.stringify({
				message: "You have successfully updated your profile.",
			})
		);
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error?.message ||
				"Oops! Couldn't update your profile! Try again later.",
		};
	}
};

export const updateBoardingLecturerDetails = async (
	clerkId: string,
	user: any
) => {
	try {
		await connectToDatabase();
		const boardingUser = await User.findOne({ clerkId });

		if (!boardingUser)
			return {
				status: 400,
				message: "User not found. An error occurred!",
			};

		const { firstName, lastName, email, phoneNumber, department, faculty } =
			user;

		if (
			!firstName ||
			!lastName ||
			!email ||
			!phoneNumber ||
			!department ||
			!faculty
		)
			return {
				status: 400,
				message: "Please enter all fields!",
			};

		boardingUser.firstName = firstName;
		boardingUser.lastName = lastName;
		boardingUser.email = email;
		boardingUser.phoneNumber = phoneNumber;
		boardingUser.department = department;
		boardingUser.faculty = faculty;
		boardingUser.successfulBoarding = true;

		await boardingUser.save();

		return JSON.parse(
			JSON.stringify({
				message: "You have successfully updated your profile.",
			})
		);
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error?.message ||
				"Oops! Couldn't update your profile! Try again later.",
		};
	}
};

// Get all the lecturer's students
export const getMyStudents = async ({ userId }: { userId: string }) => {
	try {
		await connectToDatabase();

		const user = await User.findById(userId);

		if (user.identity !== "lecturer")
			return {
				status: 400,
				message:
					"You are not authorized to access this information. Try again later.",
			};

		const courses = await Course.find({ user: userId })
			.select("_id")
			.sort({ createdAt: -1 });

		if (!courses || courses.length === 0)
			return {
				status: 400,
				message: "Nothing was found! Try again later",
			};

		const courseIds = courses.map((course) => course._id);

		const students = await StudentCourse.find({
			course: { $in: courseIds },
		})
			.populate("user")
			.sort({ createdAt: -1 });

		return JSON.parse(JSON.stringify(students));
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error?.message ||
				"Oops! Couldn't get the students! Try again later.",
		};
	}
};

// Get all lecturers of a particular student
export const getMyLecturers = async ({ userId }: { userId: string }) => {
	try {
		await connectToDatabase();

		const user = await User.findById(userId);

		if (user.identity !== "student")
			return {
				status: 400,
				message:
					"You are not authorized to access this information. Try again later.",
			};

		const courses = await StudentCourse.find({ user: userId })
			.sort({ createdAt: -1 })
			.populate({
				path: "course",
				populate: {
					path: "user",
				},
			})
			.exec();
		const lecturers = courses.map((course: any) => course.course.user);

		return JSON.parse(JSON.stringify(lecturers));
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error?.message ||
				"Oops! Couldn't get the lecturers! Try again later.",
		};
	}
};

// Get all colleagues of a particular student
export const getMyColleagues = async ({ userId }: { userId: string }) => {
	try {
		await connectToDatabase();

		const user = await User.findById(userId);

		if (user.identity !== "student")
			return {
				status: 400,
				message:
					"You are not authorized to access this information. Try again later.",
			};

		const colleagues = await User.find({
			department: user.department,
			identity: "student",
			_id: { $ne: userId },
		}).sort({ createdAt: -1 });

		return JSON.parse(JSON.stringify(colleagues));
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error?.message ||
				"Oops! Couldn't get the colleagues! Try again later.",
		};
	}
};
