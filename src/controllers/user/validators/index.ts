import "reflect-metadata";
import { IsString, IsEmail, MinLength, IsEnum } from "class-validator";
import { Transform } from "class-transformer";
import { UserRole } from "../../../db/enums/index";
import { Match } from './match.decorator';

export class GenericValidator {
  @IsString({ message: "Email address must be a string" })
  @Transform(({ value }) => value.trim())
  @IsEmail({}, { message: "Invalid email address" })
  email: string;

  // @IsStrongPassword()
  @IsString({ message: 'Password must be a string'})
  @MinLength(6, { message: "Password must be a mininum length of 6" })
  password?: string;

  constructor(email: string, password?: string) {
    this.email = email;
    this.password = password;
  }
}

export class IDValidator {
  @IsString({ message: "Email address must be of type string" })
  @Transform(({ value }) => value.trim())
  _id: string;

  constructor(_id: string) {
    this._id = _id;
  }
}

export class CreatedUserValidator extends GenericValidator {
  @IsString({ message: 'password must be of type string'})
  rawPassword: string;

  @IsString({ message: "Confirm password must be of type string"})
  @Match('rawPassword')
  confirmPassword: string;

  @IsString({ message: "Names must be a string with at least two names" })
  @Transform(({ value }) => value.trim())
  fullName: string;

  @IsEnum(UserRole)
  role: string;

  // @IsNumber()
  // @Length(6)
  // otp?: number;

  // @IsEnum(OTPStatus)
  // otp_status?: string;

  constructor(
    email: string,
    password: string,
    confirmPassword: string,
    fullName: string,
    role: string,
    rawPassword: string,
    _otp?: number,
    _otp_status?: string
  ) {
    super(email, password);
    this.confirmPassword = confirmPassword;
    this.fullName = fullName;
    this.role = role;
    this.rawPassword = rawPassword;
    // this.confirmPw(password, confirmPassword);
    // this.otp = otp;
    // this.otp_status = otp_status;

  }

  // confirmPw(password: string, confirmPassword: string) {
  //   const passwordForm = z
  //   .object({
  //     password: z.string(),
  //     confirmPassword: z.string(),
  //   })
  //   .refine((data) => data.password === data.confirmPassword, {
  //     message: "Confirm password do not match password",
  //     path: ["confirmPassword"], // path of error
  //   });
  
  //   return passwordForm.parse({ password, confirmPassword });
  // }
}
