import {
    NestFactory,
} from "@nestjs/core";

import {
    Logger as logger,
} from "@nestjs/common";

import {
    AppModule,
} from "@main/app.module";

import appConfig from "@main/configure/app.config";

import {
    ConfigType,
} from "@nestjs/config";

import {
    LoggerService,
} from "@main/common/logger/logger.service";
// import * as fs from "fs";

import helmet from "helmet";

const context = "ApplicationInitializer";

async function bootstrap(): Promise<void> {
    // const httpsOptions = {
    //     cert: fs.readFileSync("./src/resource/cert/fullchain.pem"),
    //     key: fs.readFileSync("./src/resource/cert/privkey.pem"),
    // };
    const app = await NestFactory.create(AppModule, {
        bufferLogs: true,
    //httpsOptions,
    });

    // app.use(helmet(), helmet.contentSecurityPolicy({
    //     directives: {
    //         defaultSrc: ["self",],
    //     },
    //     useDefaults: true,
    // }), helmet.hsts({
    //     maxAge: 8640300,
    //     includeSubDomains: true,
    // }),
    // );

    const {
        host,
        port,
    } = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);

    app.useLogger(app.get(LoggerService));

    await app.listen(port);
    logger.log(`Application ins running on: ${host}:${port}`, context);
}

bootstrap()
    .then(() => {
        logger.debug(`Current Environment Node: ${process.env.NODE_ENV}`, context);
    })
    .catch((e) => {
        logger.error(e);
    });
