import courseModel, { ICourse } from "../../db/models/course";
import CourseRepo from "../../db/repositories/course.repo";
import { NotFoundException, ServiceException } from "../../libs/exceptions/index";
import { CourseContentType } from "../../db/enums/index";

export const Course = new CourseRepo(courseModel);

export default class InstructorServices {
	public static async getAllCourseByInstructorId(instructorId: string) {
		const course = await Course.getAllCourseByInstuctorId(instructorId);
		if (course.length < 1) throw new NotFoundException("Course Not Found!");

		return {
			message: "Fetched All Courses successfully",
			data: { course },
		};
	}

	public static async createCourse(courseDto: Partial<Record<keyof ICourse, any>>) {
		const foundCourse = await Course.getAllCourseByField({ content: courseDto?.content });
		console.log(Object.values(CourseContentType).includes(courseDto.content_type));

		if (!Object.values(CourseContentType).includes(courseDto.content_type))
			throw new ServiceException("Invalid Content Type!");

		console.log("found course ", foundCourse);
		if (foundCourse.length > 0) throw new NotFoundException("Course Already Exist!");

		const course = Course.createCourse(courseDto);
		if (!course) throw new ServiceException("Unable to create course");

		return {
			message: "Created a new course successfully!",
			data: { createdCourse: await Course.getAllCourseByField({ content: courseDto.content }) },
		};
	}

	public static async updateCourse(courseId: string, course: Partial<ICourse>) {
		const foundCourse = await Course.getCourseById(courseId);
		if (!foundCourse) throw new NotFoundException("Course Not Found!");

		const updatedCourse = await Course.updateCourse({ _id: courseId }, course);
		if (updatedCourse.modifiedCount !== 1)
			throw new NotFoundException(
				`Expected 1 document to be modified, but found ${updatedCourse.modifiedCount}`
			);

		return {
			message: "updated Course successfully",
			data: { courseId: await Course.getCourseById(courseId), ...updatedCourse },
		};
	}

	public static async deleteCourse(courseId: string) {
		const foundCourse = await Course.getCourseById(courseId);
		if (!foundCourse) throw new NotFoundException("Course Not Found!");

		const deletedCourse = await Course.deleteCourseById(courseId);
		if (deletedCourse?.deletedCount === 0) throw new NotFoundException("Course with ID Already Deleted");

		return {
			message: "Course deleted successfully",
			data: { ...deletedCourse, removedId: courseId },
		};
	}
}
