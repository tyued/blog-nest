import { IsNotEmpty, IsString, Length } from "class-validator";

export class login {

    @IsString()
    @IsNotEmpty({message:'用户名不能为空'})
    readonly username:string

    @IsString()
    @IsNotEmpty({message:'密码不能为空'})
    readonly password:string
}