import { IsNotEmpty, Length, ValidateIf } from "class-validator";

export class CreateArticleDto{

    @IsNotEmpty({ message: '文章标题不能为空' })
    @Length(2,40,{message:'标题长度2-40个字符之间'})
    readonly title: string;

    @IsNotEmpty({message:'作者不能为空'})
    readonly authId: number;

    @ValidateIf(obj=>{
        return obj.subTitle?true:false
    })
    @Length(2,200,{message:'内容介绍控制在200字符以内'})
    readonly subTitle: string;

    @IsNotEmpty({message: '文章内容不能为空'})
    @Length(1,2000,{message: '内容长度控制在2000字以内'})
    readonly content: string;

}