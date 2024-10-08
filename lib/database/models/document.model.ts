import { model, Schema, ObjectId, models } from "mongoose";

export interface IDocument {
	user: ObjectId; // Reference to the User
	course: ObjectId; // Reference to the Course
	title: string; // Title of the document
	document: string; // Path or URL to the document (PDF, etc.)
	createdAt?: Date; // Auto-generated timestamp (optional because Mongoose will handle it)
	updatedAt?: Date; // Auto-generated timestamp (optional because Mongoose will handle it)
}

const documentSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		course: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "Course",
		},
		title: {
			type: String,
			required: true,
		},
		document: {
			type: String,
			required: true,
		},
		documentId: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const Document = models.Document || model("Document", documentSchema);

export default Document;
