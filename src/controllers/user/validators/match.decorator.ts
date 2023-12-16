// import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, ValidateByOptions } from 'class-validator';

// @ValidatorConstraint({ name: 'isEqualPassword', async: false })
// export class isEqualPasswordConstraint implements ValidatorConstraintInterface {
//   validate(confirmPassword: string, args: ValidationArguments) {
//     const { object } = args
//     if (!object || typeof object.password !== 'string') return false
//     return confirmPassword === object.password;
//   }

//   defaultMessage(_args: ValidationArguments) {
//     return 'confirm password do not match password!';
//   }
// }

// export function IsEqualPassword(validationOptions?: ValidationOptions) {
//   return function (object: Record<string, any>, propertyName: string): void {
//     validate({
//       target: object.constructor,
//       propertyName: propertyName,
//       constraints: [],
//       options: validationOptions,
//       validator: IsEqualPasswordConstraint,
//     });
//   };
import {registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';

export function Match(property: string, validationOptions?: ValidationOptions) {
    return (object: Record<string, any>, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [property],
            validator: MatchConstraint,
        });
    };
}

@ValidatorConstraint({name: 'Match'})
export class MatchConstraint implements ValidatorConstraintInterface {

    validate(value: any, args: ValidationArguments) {
        const [relatedPropertyName] = args.constraints;
        const relatedValue = (args.object as any)[relatedPropertyName];
        return value === relatedValue;
    }

    defaultMessage(_args: ValidationArguments) {
      return 'confirm password do not match password!';
    }
}