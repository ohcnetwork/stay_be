import {  NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as config from 'config';
import * as helmet from 'helmet';
import { join } from 'path';
import * as csurf from 'csurf';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as Sentry from '@sentry/node';
import * as rateLimit from 'express-rate-limit';
Sentry.init({
  dsn: process.env.SENTRY_DSN }
  );
//const csp = require('helmet-csp')
require('dotenv').config()
async function bootstrap() {
  const logger = new Logger('Coronasafe Root');
  const serverConfig = config.get('server');
  const app = await NestFactory.create<NestExpressApplication>(AppModule,{cors:true});
  app.use(helmet());
  app.useLogger(csurf());

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  } else {
    app.enableCors({ origin: process.env.HOSTNAME });
  }
  app.set('trust proxy', 1)
  app.disable('etag')
  app.use(function(req, res, next) {
    res.header('x-powered-by', 'coronasafe network');
    next();
  });
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  app.useStaticAssets(join(__dirname, '../../../public'));
  global.console.log('environment', process.env.NODE_ENV);

  const options = new DocumentBuilder()
    .setTitle('Coronasafe')
    .setDescription('Coronasafe Stay')
    .setVersion('1.0')
    .addTag('Coronasafe')
    .setSchemes('http', 'https')
    .addBearerAuth('Authorization', 'header', 'apiKey')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    validationError: { target: false },
  }));

  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
  logger.log(`Application Listening on Port ${port} `);
  logger.log(`Api documentation avaliable at "/doc/`);
}

bootstrap();
