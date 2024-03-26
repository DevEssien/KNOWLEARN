import { Schema, Types, Document, model } from "mongoose";
import IGeneric from "./generics";

export interface IModule extends IGeneric {
	module_order_no: number; //[note: 'An integer to rep the order of the module within the course']
	title: string;
	description: string; //[note: 'About the module']
	content: string;
	course_id: Types.ObjectId;
	instructor_id: Types.ObjectId;
}

export type IModuleDoc = IModule & Document<IModule>;

const ModuleSchema = new Schema<IModule>({
	module_order_no: { type: Number },
	title: { type: String },
	description: { type: String },
	content: { type: String },
	course_id: {
		type: Types.ObjectId,
		ref: "Course",
	},
	instructor_id: {
		type: Types.ObjectId,
		ref: "User",
	},
});

export default model<IModule>("Module", ModuleSchema);
