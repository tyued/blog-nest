import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
  Type,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata) {
        // tslint:disable-next-line
        // console.log(value,'validation.pipe',metadata,'metadata');
        const { metatype } = metadata;

        // 如果没有传入验证规则，则不验证，直接返回数据
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }

        // 将对象转换为 Class 来验证
        const object = plainToClass(metatype, value);
        const errors = await validate(object);
        if (errors.length > 0) {
        // 下列会返回所有验证的错误信息
        // const errObj = {};
        // errors.forEach(err => {
        //     const {
        //     property,
        //     constraints,
        //     } = err;
        //     errObj[property] = Object.values(constraints);
        // });
        // 只获取第一条错误信息
        const errObj =  Object.values(errors[0].constraints)[0];
        throw new HttpException(
            { message: errObj, error: 'Request params validation failed'},
            HttpStatus.BAD_REQUEST,
        );
        }
        return value;
    }

    private toValidate(metatype: Type<any>): boolean {
        const types = [String, Boolean, Number, Array, Object];
        return !types.find(type => metatype === type);
    }
}
