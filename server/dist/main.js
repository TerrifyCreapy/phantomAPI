"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: false });
    const config = app.get(config_1.ConfigService);
    const prefix = config.get('API_PREFIX');
    const v = config.get('API_VERSION');
    app.setGlobalPrefix(`${prefix}/${v}`);
    const port = config.get('port');
    app.enableCors({ credentials: true, origin: true });
    const cfg = new swagger_1.DocumentBuilder()
        .setTitle('BaumanAPI documentation')
        .setDescription('Данный сервис был разработан, как дипломный проект для кафедры ИУК5')
        .setVersion('0.0.1')
        .addTag('Backend')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, cfg);
    swagger_1.SwaggerModule.setup('api', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        }
    });
    await app.listen(port || 7000);
}
bootstrap();
//# sourceMappingURL=main.js.map