import { Schema, Types, Document, model } from "mongoose";
import IGeneric from "./generics/index";

export interface IInstructor extends IGeneric {
	courses_taught_ids: Types.ObjectId[]; // [ref: > Course.id]
	user_id: Types.ObjectId;
}

export type IInstructorDoc = IInstructor & Document<IInstructor>;

const InstructorSchema = new Schema<IInstructor>(
	{
		courses_taught_ids: [
			{
				type: Types.ObjectId,
				ref: "Course",
			},
		],
		user_id: {
			type: Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

export default model<IInstructor>("Instructor", InstructorSchema);
