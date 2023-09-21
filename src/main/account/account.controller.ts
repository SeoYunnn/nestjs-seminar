import {
    Body,
    Controller, Delete, Get, Param, Patch, Post,
} from "@nestjs/common";
import {
    AccountService, 
} from "@main/account/account.service";

import {
    Account as AccountModel,
} from "@prisma/client";

@Controller('accounts')
export class AccountController {
    
    constructor(
      private readonly accountService: AccountService,
    ) {
    }

    @Post("")
    async signUp(
      @Body() account: {
          email: string,
          name?: string,
      },
    ):Promise<AccountModel> {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return this.accountService.create(account);
    }

    @Get("")
    async findAll():Promise<AccountModel[]> {
        return this.accountService.findAll();
    }
    
    @Get(":id")
    async findById(
    @Param("id") id: string,
    ): Promise<AccountModel> {
        return this.accountService.findById(id);
    }

    @Patch(":id")
    async update(
      @Param("id") id:string,
      @Body() account: {
          email: string,
      },
    ): Promise<AccountModel> {
        return this.accountService.update(id, account);
    }

    @Delete(":id")
    async remove(
      @Param("id") id:string,
    ): Promise<AccountModel> {
        return this.accountService.remove(id);
    }
}
