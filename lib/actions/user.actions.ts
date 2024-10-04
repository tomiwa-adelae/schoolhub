"use server";
import { connectToDatabase } from "../database";
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
