import { Equals, IsEmail, IsNotEmpty, IsString, Length, Matches, Validate, ValidateIf } from "class-validator";

let pwdRegex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{8,30}');
export class CreateUserDto{
    @IsEmail({},{message:'邮箱格式不正确'})
    @IsNotEmpty({message:'注册邮箱不能为空'})
    readonly email: string;
    
    // 如果有username就走规则，没有就跳过规则
    @ValidateIf(obj=>{
        return obj.username?true:false
    })
    @Length(2,20,{message:'用户名长度2-20位'})
    readonly username: string;

    @Matches(/(?=.*[0-9])(?=.*[a-zA-Z]).{8,30}/,{message:'密码强度不够'})
    @IsNotEmpty({message:'密码不能为空'})
    readonly password: string;

    // @Equals(obj=> {
    //     console.log(obj,obj.password,'22222')
    //     return obj.password
    // },{message:'两次密码不一致'})
    @IsNotEmpty({message:'确认密码不能为空'})
    readonly repassword: string;
}