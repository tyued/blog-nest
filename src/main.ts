import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// swagger配置
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerOptions = new DocumentBuilder()

  await app.listen(3000);
}
bootstrap();
