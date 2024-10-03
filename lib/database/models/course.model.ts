import { model, models, Schema } from "mongoose";

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
