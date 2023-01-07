import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  // set cross-origin resource sharing (CORS) options
  app.enableCors({
    origin: '*',
  });
  await app.listen(3000);
}
bootstrap();
