import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // If CORS_ORIGINS is unset, allow any origin (needed for 127.0.0.1, LAN IPs, and Vite port changes).
  const corsList = process.env.CORS_ORIGINS?.split(',').map((o) => o.trim()).filter(Boolean);
  app.enableCors({
    origin: corsList?.length ? corsList : true,
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // API prefix
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 4000;
  await app.listen(port);
  
  console.log(`🚀 Backend API running on: http://localhost:${port}/api`);
}

bootstrap();
