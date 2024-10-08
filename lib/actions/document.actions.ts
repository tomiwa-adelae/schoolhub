"use server";
import { v2 as cloudinary } from "cloudinary";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import Course from "../database/models/course.model";
import Document from "../database/models/document.model";
import { handleError } from "../utils";
import { DOCUMENT_LIMITS } from "@/constants";
import { revalidatePath } from "next/cache";
import StudentCourse from "../database/models/student.course.model";

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
			resource_type: "raw",
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
			documentId: result.public_id,
		});

		if (!newDocument)
			return {
				status: 400,
				message: `An error occurred. Document titled ${title} was created. Try again later.`,
			};

		revalidatePath(`/courses/${courseId}`);
		return {
			document: JSON.parse(JSON.stringify(newDocument)),
			message: `You have successfully created a document titled ${newDocument.title}.`,
		};
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error?.message ||
				"Oops! Couldn't create the document! Try again later.",
		};
	}
};

// Get document by id
export const getDocumentById = async (id: string) => {
	try {
		await connectToDatabase();

		const document = await Document.findById(id).populate({
			path: "course",
			populate: { path: "user" },
		});

		if (!document)
			return {
				status: 400,
				message: "Oops! Document does not exist! Try again later.",
			};

		return JSON.parse(JSON.stringify(document));
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error?.message ||
				"Oops! Couldn't get the document! Try again later.",
		};
	}
};

// Get documents for a particular course
export const getDocuments = async (courseId: string) => {
	try {
		await connectToDatabase();

		const documents = await Document.find({ course: courseId })
			.sort({ createdAt: -1 })
			.populate({ path: "course" });

		return JSON.parse(JSON.stringify(documents));
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error?.message ||
				"Oops! Couldn't get the documents! Try again later.",
		};
	}
};

// Get all documents related to a particular lecturer
export const getLecturerDocuments = async ({
	query,
	limit = DOCUMENT_LIMITS,
	page,
	userId,
}: GetLecturerDocumentProps) => {
	try {
		await connectToDatabase();

		const skipAmount = (Number(page) - 1) * limit;

		const documents = await Document.find({ user: userId })
			.populate({
				path: "course",
				populate: { path: "user" },
			})
			.sort({ createdAt: -1 });

		const filteredDocuments = documents.filter((document) => {
			if (!document) return false;

			const matchesTitle = document.title
				?.toLowerCase()
				.includes(query.toLowerCase());
			const matchesCourse = document.course.title
				?.toLowerCase()
				.includes(query.toLowerCase());
			const matchesCode = document.course.code
				?.toLowerCase()
				.includes(query.toLowerCase());
			return matchesTitle || matchesCourse || matchesCode;
		});

		const paginatedDocuments = filteredDocuments.slice(
			skipAmount,
			skipAmount + limit
		);

		const documentCount = filteredDocuments.length;

		return {
			data: JSON.parse(JSON.stringify(paginatedDocuments)),
			totalPages: Math.ceil(documentCount / limit),
		};
	} catch (error: any) {
		return {
			status: error?.status || 400,
			message:
				error?.message ||
				"Oops! Couldn't get documents! Try again later.",
		};
	}
};

// Delete document by id
export const deleteDocumentById = async ({
	userId,
	documentId,
}: {
	userId: string;
	documentId: string;
}) => {
	try {
		await connectToDatabase();

		const document = await Document.findOne({
			user: userId,
			_id: documentId,
		});

		if (!document)
			return {
				status: 400,
				message: "Oops! Document does not exist! Try again later.",
			};

		// Delete document from cloudinary
		const result = await cloudinary.uploader.destroy(document.documentId, {
			resource_type: "raw",
		});

		if (result.result !== "ok")
			return {
				status: 400,
				message: "Oops! Couldn't delete document! Try again later.",
			};

		const deletedDocument = await Document.findByIdAndDelete(document._id);

		if (!deletedDocument)
			return {
				status: 400,
				message: "Oops! Document not deleted. Try again later.",
			};

		revalidatePath("/documents");
		revalidatePath("/dashboard");

		return { message: `You have successfully deleted the document.` };
	} catch (error: any) {
		return {
			status: error?.status || 400,
			message:
				error?.message ||
				"Oops! Couldn't delete document! Try again later.",
		};
	}
};

// Get all documents related to a particular students
export const getStudentDocuments = async ({
	query,
	limit = DOCUMENT_LIMITS,
	page,
	userId,
}: GetStudentDocumentProps) => {
	try {
		await connectToDatabase();

		const skipAmount = (Number(page) - 1) * limit;

		const courses = await StudentCourse.find({ user: userId }).select(
			"course"
		);

		if (!courses || courses.length === 0)
			return {
				status: 400,
				message: "Oops! You are not offering any course.",
			};

		const courseIds = courses.map((course) => course.course);

		console.log(courseIds);

		const documents = await Document.find({
			course: { $in: courseIds },
		})
			.populate({
				path: "course",
				populate: { path: "user" },
			})
			.sort({ createdAt: -1 });

		if (!documents || documents.length === 0)
			return {
				status: 400,
				message: "Oops! You have no documents.",
			};

		const filteredDocuments = documents.filter((document) => {
			if (!document) return false;

			const matchesTitle = document.title
				?.toLowerCase()
				.includes(query.toLowerCase());
			const matchesCourse = document.course.title
				?.toLowerCase()
				.includes(query.toLowerCase());
			const matchesCode = document.course.code
				?.toLowerCase()
				.includes(query.toLowerCase());
			return matchesTitle || matchesCourse || matchesCode;
		});

		const paginatedDocuments = filteredDocuments.slice(
			skipAmount,
			skipAmount + limit
		);

		const documentCount = filteredDocuments.length;

		return {
			data: JSON.parse(JSON.stringify(paginatedDocuments)),
			totalPages: Math.ceil(documentCount / limit),
		};
	} catch (error: any) {
		return {
			status: error?.status || 400,
			message:
				error?.message ||
				"Oops! Couldn't get documents! Try again later.",
		};
	}
};
