import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme } from 'swagger-themes';
export function setupDocument(app: INestApplication, route: string) {
  const theme = new SwaggerTheme('v3');
  const configDocument = new DocumentBuilder()
    .setTitle('BluList')
    .setDescription('The BluList API')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();

  const document = SwaggerModule.createDocument(app, configDocument);
  SwaggerModule.setup(route, app, document, {
    customCss: theme.getBuffer('dark'),
  });
}
