import { Schema, Types, Document, model } from "mongoose";
import IGeneric from "./generics";

export interface ICategory extends IGeneric {
	name: string;
	description: string;
	courses: Types.ObjectId[]; // [ref: > Course.id]
}

export type ICategoryDoc = ICategory & Document<ICategory>;

const CategorySchema = new Schema<ICategory>(
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

export default model<ICategory>("Category", CategorySchema);
