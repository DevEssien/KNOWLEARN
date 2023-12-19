import { de } from '@faker-js/faker';
import { TMiddlewares} from '../types';

function Middlewares( middlewares: TMiddlewares[] | TMiddlewares ) {
  return function(_target: any, _key: string, descriptor: PropertyDescriptor) {
    return descriptor
  }
}