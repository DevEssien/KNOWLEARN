import { Schema, Types, Document, model } from "mongoose";

export interface ICourseCategory {
	course_id: Types.ObjectId; // [ref: > Course.id]
	category_id: Types.ObjectId; // [//ref: > Category.id]
	createdAt: Date;
	updatedAt: Date;
	//   primary key(course_id, category_id)
}

export type ICourseCategoryDoc = ICourseCategory & Document<ICourseCategory>;

const CourseCategorySchema = new Schema<ICourseCategory>(
	{
		course_id: { type: Types.ObjectId },
		category_id: { type: Types.ObjectId },
	},
	{ timestamps: true }
);

export default model<ICourseCategory>("CourseCategory", CourseCategorySchema);
