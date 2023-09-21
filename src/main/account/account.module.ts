import {
    Module, 
} from '@nestjs/common';
import {
    AccountService, 
} from './account.service';
import {
    AccountController, 
} from './account.controller';
import {
    PrismaConfig, 
} from "@main/configure/prisma.config";

@Module({
    providers: [AccountService,
        PrismaConfig,],
    controllers: [AccountController,],
})
export class AccountModule {}
