import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
export interface ClassConstructor {
    new (...args: any[]): {};
}
export declare class SerializeInterceptor implements NestInterceptor {
    private dto;
    constructor(dto: ClassConstructor);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
