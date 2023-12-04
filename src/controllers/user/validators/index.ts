import 'reflect-metadata';
import { IsString, IsEmail, MinLength, IsAlphanumeric } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatedUserValidator {
  @IsString({ message: 'Email address must be a string'})
  @Transform(( { value } ) => value.trim())
  @IsEmail({}, { message: 'Invalid email address'}) 
  email: string;

  @IsAlphanumeric()
  @MinLength(6, { message: 'Password must be a mininum length of 6'})
  password: string;

  @IsString({ message: 'Names must be a string with at least two names'})
  @Transform(( { value } ) => value.trim()) 
  fullName: string;

  constructor(email: string, password: string, fullName: string) {
    this.email = email;
    this.password = password;
    this.fullName = fullName;
  }
}
