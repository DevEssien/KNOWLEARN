import { Schema, Types, model } from "mongoose";
import { IGeneric } from "./generics/index";
import { CourseContentType, CourseLevel, CourseType } from "../enums/index";

interface ICourse extends IGeneric {
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
