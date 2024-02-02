import { Model, FilterQuery } from "mongoose";
import { ICourse } from "../models/course";

export default class CousseRepo {
	private courseModel: Model<ICourse>;

	constructor(courseModel: Model<ICourse>) {
		this.courseModel = courseModel;
	}

	async createCourse(courseDetails: Partial<ICourse>) {
		const newCourse = new this.courseModel(courseDetails);
		return newCourse.save();
	}

    async updateCourse(filter: FilterQuery<ICourse>, course: Partial<ICourse) {
        
    }
}
