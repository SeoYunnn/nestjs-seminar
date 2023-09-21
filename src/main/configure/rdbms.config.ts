import {
    registerAs,
} from "@nestjs/config";

import {
    RdbmsEnvironment,
} from "@main/type/environment";
import * as process from "process";

export default registerAs("app", (): RdbmsEnvironment => ({
    host: process.env.RDBMS_HOST || "127.0.0.1",
    port: parseInt(process.env.APP_PORT!, 10) || 15432,
    username: process.env.RDBMS_USERNAME || "scott",
    password: process.env.RDBMS_PASSWORD || "tiger",
    database: process.env.RDBMS_DATABASE || "exercise",
}));
