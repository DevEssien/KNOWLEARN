import { Types } from "mongoose";

export default interface IGeneric {
	_id: Types.ObjectId;
	id: string;
	createdAt: Date;
	updatedAt: Date;
}
