import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT ? Number(process.env.PORT) : 3201;
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
