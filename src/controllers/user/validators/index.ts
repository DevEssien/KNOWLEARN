import 'reflect-metadata';
import { IsString, IsEmail, MinLength, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { UserRole } from '../../../db/enums/index';

export class GenericValidator {
  @IsString({ message: 'Email address must be a string'})
  @Transform(( { value } ) => value.trim())
  @IsEmail({}, { message: 'Invalid email address'}) 
  email: string;

  // @IsStrongPassword()
  @IsString()
  @MinLength(6, { message: 'Password must be a mininum length of 6'})
  password?: string;

  constructor(email: string, password?: string ) {
    this.email = email;
    this.password = password;
  }
}

export class IDValidator {
  @IsString({ message: 'Email address must be a string'})
  @Transform(( { value } ) => value.trim())
  _id: string;

  constructor(_id: string) {
    this._id = _id;
  }
}

export class CreatedUserValidator extends GenericValidator {
  @IsString({ message: 'Names must be a string with at least two names'})
  @Transform(( { value } ) => value.trim())
  fullName: string;

  @IsEnum(UserRole)
  role: string;

  constructor(email: string, password: string, fullName: string, role: string) {
    super(email, password)
    this.fullName = fullName;
    this.role = role
  }
}

