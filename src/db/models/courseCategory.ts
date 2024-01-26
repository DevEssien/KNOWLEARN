import { Schema, Types, Document, model } from "mongoose";
import IGeneric from "./generics";

export interface ICourseCategory extends IGeneric {
	name: string;
	description: string;
	courses: Types.ObjectId[]; // [ref: > Course.id]
}

export type ICourseCategoryDoc = ICourseCategory & Document<ICourseCategory>;

const CourseCategorySchema = new Schema<ICourseCategory>(
	{
		name: { type: String },
		description: { type: String },
		courses: [
			{
				type: Types.ObjectId,
				ref: "Course",
			},
		],
	},
	{ timestamps: true }
);

export default model<ICourseCategory>("CourseCategory", CourseCategorySchema);
