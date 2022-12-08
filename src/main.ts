import * as cookieParser from 'cookie-parser';
import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT;
  process.env.TZ = 'UTC';
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('/api/v1', {
    exclude: [
      { path: 'auth/register', method: RequestMethod.POST },
      { path: 'auth/login', method: RequestMethod.POST },
      { path: 'auth/logout', method: RequestMethod.POST },
    ],
  });
  try {
    await app.listen(port, () => {
      console.log(`Server listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
bootstrap();
