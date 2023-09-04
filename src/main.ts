import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { setupDocument } from './config/document';
import { config } from 'dotenv';
config();
import { Configs } from './config/configuration';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // await app.listen(3000);
  app.useGlobalPipes(new ValidationPipe());

  const configService: ConfigService<Configs> = new ConfigService<Configs>();
  const port = configService.get('PORT') || 3000;
  const isDevelopmentMode: boolean =
    configService.get<string>('APP_MODE').toUpperCase() == 'DEVELOPMENT';

  const DOCUMENT_ROUTE = '/api';
  if (isDevelopmentMode) setupDocument(app, DOCUMENT_ROUTE);
  await app.listen(port);
  console.log(`Server running on ${port}`);
}
bootstrap();
