import { Document, Types, Schema, model } from "mongoose";
import IGeneric from "./generics/index";
import { OTPStatus, UserRole } from "../enums/index";

export interface IUser extends IGeneric {
	first_name: string;
	last_name: string;
	username: string;
	bio: string;
	email: string;
	password: string;
	phoneno: string;
	is_phone_verified: boolean;
	image_url: string;
	image_id: string;
	role: UserRole;
	courses_enrolled_ids: Types.ObjectId[]; // integer[]  [ref: > Course.id]
	modules_completed_ids: Types.ObjectId[]; //integer[] [ref: > Module.id]
	otp: string;
	otp_status: OTPStatus;
	otp_expiration_date: Date;
	reset_token: string;
	reset_token_expiration_date: Date;
}

export type IUserDoc = IUser & Document<IUser>;

const options = {
	timestamps: true,
	toJSON: {
		virtuals: true,
	},
};

const UserSchema = new Schema<IUser>(
	{
		first_name: { type: String },
		last_name: { type: String },
		username: { type: String },
		bio: { type: String },
		email: { type: String, required: true, unique: true, trim: true, lowercase: true },
		password: { type: String, required: true },
		phoneno: { type: String, trim: true },
		is_phone_verified: { type: Boolean, default: false },
		image_url: { type: String },
		image_id: { type: String },
		role: {
			type: String,
			enum: Object.values(UserRole),
			default: UserRole.STUDENT,
		},
		courses_enrolled_ids: [
			{
				type: Types.ObjectId,
				ref: "Course",
			},
		],
		modules_completed_ids: [
			{
				type: Types.ObjectId,
				ref: "Module",
			},
		],
		otp: { type: String },
		otp_status: {
			type: String,
			enum: Object.values(OTPStatus),
			default: OTPStatus.INACTIVE,
		},
		otp_expiration_date: { type: Date },
		reset_token: { type: String },
		reset_token_expiration_date: Date,
	},
	options
);

UserSchema.virtual("fullName").set(function (value: String) {
	const lastSpaceIndex = value.lastIndexOf(" ");
	const first_name = value.substring(0, lastSpaceIndex + 1).trim();
	const last_name = value.substring(lastSpaceIndex + 1).trim();
	this.set({ first_name, last_name });
});

const UserModel = model<IUser>("User", UserSchema);

export function hasColumn(columnName: string) {
	return UserModel.schema.path(columnName) !== undefined;
}

export default UserModel;
