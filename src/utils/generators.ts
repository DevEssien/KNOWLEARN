import { faker } from '@faker-js/faker';
import { IUser } from '../db/models/User';
import { UserRole } from '../db/enums/index';

export const userData = ( userType: UserRole, entry: Partial<IUser> = {}) => {
  let others: Record<string, any> = {};

  if (userType === UserRole.STUDENT) others = { fullName: faker.person.fullName()};

  return {
    email: faker.internet.email(),
    password: `${faker.internet.password({ pattern: /^[a-zA-Z0-9]+$/})}x$A`,
    role: userType,
    ...others,
    ...entry
  }
}