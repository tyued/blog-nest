import { IsEmail, IsString } from "class-validator";

export class CreateCodeDto{
    @IsEmail({},{ message: '请输入正确的邮箱地址' })
    readonly email: string;
}