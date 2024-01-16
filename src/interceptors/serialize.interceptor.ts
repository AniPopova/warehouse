import {
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

//this insures us that when we use the @Serialize decorator it will insist to have class as property
export interface ClassConstructor {
  new (...args: any[]): {}
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor){

  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {


    return next.handle().pipe(
      map((data: ClassConstructor) => {
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
      })
    )

    throw new Error('Method not implemented.');
  }

}