import { Schema, model, ObjectId, models } from "mongoose";

export interface IStudentCourse {
	user: ObjectId; // Reference to the User model
	course: ObjectId; // Reference to the Course model
	createdAt?: Date; // Timestamp for creation
	updatedAt?: Date; // Timestamp for last update
}

const studentCourseSchema = new Schema(
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
	},
	{ timestamps: true }
);

const StudentCourse =
	models.StudentCourse || model("StudentCourse", studentCourseSchema);

export default StudentCourse;
