import {
    Inject,
    Injectable,
} from "@nestjs/common";

import {
    ConfigType,
} from "@nestjs/config";

import {
    AppEnvironment, 
} from "@main/type/environment";

import appConfig from "@main/configure/app.config";

@Injectable()
export class AppService {
    constructor(
      @Inject(appConfig.KEY) private config: ConfigType<typeof appConfig>,
    ) {
    }
    getHello(): string {
        return 'Hello World!';
    }

    getConfig():AppEnvironment {
        const host = this.config.host;
        const port = this.config.port;

        return {
            host,
            port,
        };
    }
}
