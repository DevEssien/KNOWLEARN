import { Request, Response, NextFunction } from "express";
import { wrapHandler } from "../../utils/serviceWrapper";
import InstructorService from "../services/instructor";
import { Controller, Post } from "../../core/decorators";
import { ICourse } from "../../db/models/course";

@Controller({ basePath: "/instructor" })
export default class InstructorController {
	@Post("/create-course")
	public static createCourse(req: Request, res: Response, next: NextFunction) {
		return wrapHandler((req: Request) => {
			return InstructorService.createCourse(req.body);
		})(req, res, next);
	}

	public static updateCourse(req: Request, res: Response, next: NextFunction) {
		return wrapHandler((req: Request) => {
			const _id = req.params.courseId;
			const updateCourseObj: Partial<ICourse> = req.body;
			return InstructorService.updateCourse(<string>_id, updateCourseObj);
		})(req, res, next);
	}
}
