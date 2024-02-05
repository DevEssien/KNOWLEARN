import { Request, Response, NextFunction } from 'express';
import { wrapHandler } from '../../utils/serviceWrapper';

export default class InstructorController {
    public static createCourse(req: Request, res: Response, next: NextFunction){
        return wrapHandler(req) {
            
        }
    }
}