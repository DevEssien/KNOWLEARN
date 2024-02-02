import { Schema, Document, Types, model } from "mongoose";
import IGeneric from "./generics/index";
import { CourseContentType, CourseLevel, CourseType } from "../enums/index";

export interface ICourse extends IGeneric {
	title: string;
	content_type: CourseContentType;
	description: string;
	course_type: CourseType;
	level: CourseLevel;
	price: number;
	enrollment_key: string;
	start_date: Date;
	end_date: Date;
	duration: string;
	module_ids: Types.ObjectId[];
	students_enrolled_ids: Types.ObjectId[]; //[ref: > User.id]
	instructor_id: Types.ObjectId; //[ref: > Instructor.id]
	category_id: Types.ObjectId; //[ref: > Category.id]
}

export type ICourseDoc = ICourse & Document<ICourse>;

const CourseSchema = new Schema<ICourse>(
	{
		title: { type: String },
		content_type: {
			type: String,
			enum: Object.values(CourseContentType),
			default: CourseContentType.DOCUMENT,
		},
		description: { type: String },
		course_type: {
			type: String,
			enum: Object.values(CourseType),
			default: CourseType.FREE,
		},
		level: {
			type: String,
			enum: Object.values(CourseLevel),
			default: CourseLevel.EASY,
		},
		price: { type: Number },
		enrollment_key: { type: String },
		start_date: { type: Date },
		end_date: { type: Date },
		duration: { type: String },
		module_ids: [
			{
				type: String,
				ref: "Module",
			},
		],
		students_enrolled_ids: [
			{
				type: String,
				ref: "User",
			},
		],
		instructor_id: [
			{
				type: String,
				ref: "User",
			},
		],
		category_id: [
			{
				type: String,
				ref: "Category",
			},
		],
	},
	{
		timestamps: true,
	}
);

export default model<ICourse>("Course", CourseSchema);
