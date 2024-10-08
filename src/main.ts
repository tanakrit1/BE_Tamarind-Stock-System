import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/modules/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    cors:true
  });
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(9900);
}
bootstrap();
