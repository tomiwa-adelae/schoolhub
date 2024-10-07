"use server";
import { v2 as cloudinary } from "cloudinary";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import Course from "../database/models/course.model";
import Document from "../database/models/document.model";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const createDocument = async ({
	document,
	title,
	userId,
	courseId,
}: {
	document: any;
	title: string;
	userId: string;
	courseId: string;
}) => {
	try {
		await connectToDatabase();

		const user = await User.findById(userId);

		if (user.identity !== "lecturer")
			return {
				status: 400,
				message:
					"You are not authorized to create a document. Try again later.",
			};

		const course = await Course.findOne({
			_id: courseId,
			user: userId,
		});

		if (!course)
			return {
				status: 400,
				message: "Course not found. Try again later.",
			};

		if (!title || !document)
			return {
				status: 400,
				message: "Please enter all fields",
			};

		const result = await cloudinary.uploader.upload(document, {
			folder: "schoolhub",
		});

		if (!result)
			return {
				status: 400,
				message: "Document not created. Try again later.",
			};

		const newDocument = await Document.create({
			user: userId,
			course: courseId,
			title,
			document: result.secure_url,
		});

		if (!newDocument)
			return {
				status: 400,
				message: `An error occurred. Document titled ${title} was created. Try again later.`,
			};

		return {
			document: JSON.parse(JSON.stringify(newDocument)),
			message: `You have successfully created a document titled ${newDocument.title}.`,
		};
	} catch (error) {
		console.log("ERROR:", error);
	}
};
