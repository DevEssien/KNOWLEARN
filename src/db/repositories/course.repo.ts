import { Model, FilterQuery, isValidObjectId, Types } from "mongoose";
import { ICourse } from "../models/course";
import { ServiceException } from "../../libs/exceptions/index";
import { ErrorMessages } from "../../libs/exceptions/messages";

export default class CousseRepo {
	private courseModel: Model<ICourse>;

	constructor(courseModel: Model<ICourse>) {
		this.courseModel = courseModel;
	}

	async getCourseById(_id: string) {
		if (!isValidObjectId(_id)) throw new ServiceException(ErrorMessages.INVALID_OBJECT_ID);
		return this.courseModel.findById(_id);
	}

	async getAllCourseByInstuctorId(instructor_id: Types.ObjectId) {
		if (!isValidObjectId(instructor_id)) throw new ServiceException(ErrorMessages.INVALID_OBJECT_ID);
		return this.courseModel.find({ instructor_id: instructor_id });
	}

	async getAllCourseByField(filter: FilterQuery<ICourse>) {
		return this.courseModel.find(filter);
	}

	async createCourse(courseDetails: Partial<ICourse>) {
		const newCourse = new this.courseModel(courseDetails);
		return newCourse.save();
	}

	async updateCourse(filter: FilterQuery<ICourse>, course: Partial<ICourse>) {
		return this.courseModel.updateOne(filter, course);
	}

	async deleteCourseById(_id: Types.ObjectId) {
		if (!isValidObjectId(_id)) throw new ServiceException(ErrorMessages.INVALID_OBJECT_ID);
		return this.courseModel.deleteOne(_id);
	}
}
