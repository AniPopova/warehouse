import { SetMetadata, UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor, ClassConstructor } from 'src/interceptors/serialize.interceptor';
import { Reflector } from '@nestjs/core';


export const Roles = Reflector.createDecorator<string[]>();

export const Serialize = (dto: ClassConstructor) => UseInterceptors(new SerializeInterceptor(dto));

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);