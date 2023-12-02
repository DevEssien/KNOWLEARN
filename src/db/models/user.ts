import { Document, Types, Schema} from 'mongoose';
import { IGeneric } from './generics/index';
import { OTPStatus } from '../enums/index';



interface IUser extends IGeneric {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
    phoneno: number;
    image_url: string;
    image_id: string;
    is_instructor: Boolean;
    otp: number;
    otp_status: OTPStatus;
    otp_date: Date
}

