import {
    Inject,
    Injectable,
} from "@nestjs/common";
import {
    ConfigType, 
} from "@nestjs/config";
import rdbmsConfig from "@main/configure/rdbms.config";

@Injectable()
export class RdbmsService {
    constructor(
    @Inject(rdbmsConfig.KEY) private config: ConfigType<typeof rdbmsConfig>,
    ) {
    }

    getUri():string {
        const {
            host,
            port,
            username,
            password,
            database,
        } = this.config;

        return `${username}: ${password}@${host}:${port}/${database}`;
    }

}
