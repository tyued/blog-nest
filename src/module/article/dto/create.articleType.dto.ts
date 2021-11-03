import { IsNotEmpty } from "class-validator";

export class CreateArticleTypeDto{

    @IsNotEmpty({ message: '类型名称不能为空' })
    readonly typeName: string;

}