import {
    Module, 
} from '@nestjs/common';
import {
    ConfigModule, 
} from "@nestjs/config";
import {
    RdbmsService,
} from './rdbms.service';
import rdbmsConfig from "@main/configure/rdbms.config";

@Module({
    imports: [
        ConfigModule.forFeature(rdbmsConfig),
    ],
    providers: [RdbmsService,],
})

export class RdbmsModule {

}
