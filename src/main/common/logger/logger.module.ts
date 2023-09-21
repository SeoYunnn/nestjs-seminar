import {
    MiddlewareConsumer,
    Module, NestModule,
} from "@nestjs/common";
import {
    LoggerService, 
} from "@main/common/logger/logger.service";
import {
    LoggerMiddleware, 
} from "@main/common/logger/logger.middleware";

@Module({
    providers: [LoggerService,],
})
export class LoggerModule implements NestModule {
    configure(consumer: MiddlewareConsumer
    ):void {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes("*");
    }
}
