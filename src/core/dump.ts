// import { TokenFlag } from '../dto/app';
// import Auth from '../middleware/auth';

// export function Middleware(tokenFlags: TokenFlag[]) {
//   const middlewareFunctions = tokenFlags.map(tokenFlag => Auth.Authenticate(tokenFlag));
  
//   return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//     console.log('key ', propertyKey, 'target ', target)
//     Reflect.defineMetadata('middlewareFunctions', middlewareFunctions, target, propertyKey);
//     return descriptor;
//   }
// }

// decorators.ts

// import 'reflect-metadata';
// import { RequestHandler, Request, Response, NextFunction } from 'express';

// // Metadata key for storing route information
// export const ROUTE_METADATA_KEY = Symbol('route');

// // Decorator to define a route
// export function Route(path: string, method: string): MethodDecorator {
//   return (target: any, key: string | symbol, descriptor: PropertyDescriptor) => {
//     const routeMetadata = {
//       path,
//       method,
//     };

//     // Store the route information in the metadata
//     Reflect.defineMetadata(ROUTE_METADATA_KEY, routeMetadata, target, key);
//   };
// }

// // Decorator to define middleware for a route
// export function Middleware(middleware: RequestHandler): MethodDecorator {
//   return (target: any, key: string | symbol, descriptor: PropertyDescriptor) => {
//     const existingMiddlewares = Reflect.getMetadata(ROUTE_METADATA_KEY, target, key)?.middlewares || [];

//     // Append the new middleware to the existing ones
//     const updatedMetadata = {
//       ...Reflect.getMetadata(ROUTE_METADATA_KEY, target, key),
//       middlewares: [...existingMiddlewares, middleware],
