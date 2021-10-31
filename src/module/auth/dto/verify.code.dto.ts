import { IsString, Length } from "class-validator";
import { CreateCodeDto } from "./create.code.dto";

export class verifyCode extends CreateCodeDto {
    constructor(){
        super();
    }

    @IsString()
    @Length(6,6,{message:'请输入正确的验证码'})
    readonly code:string
}