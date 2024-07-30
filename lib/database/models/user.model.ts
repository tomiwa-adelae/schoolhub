import { models, Schema, model } from "mongoose";

export interface IUser {
	_id: string;
	clerkId: string;
	email: string;
	firstName: string;
	lastName: string;
	matricNumber?: string;
	phoneNumber?: string;
	picture?: string;
	identity?: string;
	department?: string;
	faculty?: string;
	level?: string;
	successfulBoarding?: boolean;
}

const UserSchema = new Schema({
	clerkId: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	matricNumber: {
		type: String,
	},
	phoneNumber: {
		type: String,
	},
	picture: {
		type: String,
	},
	identity: {
		type: String,
	},
	department: {
		type: String,
	},
	faculty: {
		type: String,
	},
	level: {
		type: String,
	},
	successfulBoarding: {
		type: Boolean,
		default: false,
	},
});

const User = models.User || model("User", UserSchema);

export default User;
