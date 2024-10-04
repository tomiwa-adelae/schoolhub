import { model, Schema, ObjectId, models } from "mongoose";

export interface ICourse {
	user: ObjectId; // Reference to the User model
	title: string; // Course title
	code: string; // Unique course code
	unit: string; // Course unit
	createdAt?: Date; // Timestamp for creation
	updatedAt?: Date; // Timestamp for last update
}

const courseSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		title: {
			type: String,
			required: true,
		},
		code: {
			type: String,
			required: true,
			unique: true,
		},
		unit: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const Course = models.Course || model("Course", courseSchema);

export default Course;
