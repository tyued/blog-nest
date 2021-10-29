import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// 引入全局管道，用来验证提交参数
import { ValidationPipe } from './common/pipes/validation.pipe';
// 引入全局过滤器 app.useGlobalFilters使用
import { HttpExceptionFilter } from './common/filters/http-exception.filter'
// 引入全局拦截器
import { TransformInterceptor } from './common/interceptors/transform.interceptor'

// swagger配置
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // 全局管道
    app.useGlobalPipes(new ValidationPipe());
    // 全局过滤器
    app.useGlobalFilters(new HttpExceptionFilter());
    // 全局拦截器
    app.useGlobalInterceptors(new TransformInterceptor());

    const swaggerOptions = new DocumentBuilder()
        .setTitle('blog api document')
        .setDescription('博客API说明文档')
        .setVersion('1.0')
        .addBearerAuth()
        .build()
    
    const document = SwaggerModule.createDocument(app,swaggerOptions);
    SwaggerModule.setup('doc',app,document);
    await app.listen(3000);
}
bootstrap();
