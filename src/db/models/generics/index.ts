import { Types } from 'mongoose';

export interface IGeneric {
    _id: Types.ObjectId;
    id: string;
    createdAt: Date;
    updatedAt: Date;
}