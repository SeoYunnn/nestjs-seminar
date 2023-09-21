import {
    Injectable,
} from "@nestjs/common";
import {
    PrismaConfig,
} from "@main/configure/prisma.config";
import {
    Account,
} from "@prisma/client";

@Injectable()
export class AccountService {

    constructor(
    private readonly prisma: PrismaConfig,
    ) {
    }

    async create(
        account: Account,
    ): Promise<Account> {
        return await this.prisma.account.create({
            data: account,
        });

    }

    async findAll(): Promise<Account[]> {
        return await this.prisma.account.findMany();
    }
    
    async findById(
        id: string,
    ): Promise<Account> {
        const result = await this.prisma.account.findUnique({
            where: {
                id,
            },
        });

        return result ? result : {} as Account;
    }
    
    async update(
        id: string,
        account: {
          email: string,
      },
    ): Promise<Account> {
        return await this.prisma.account.update({
            where: {
                id,
            },
            data: account,
        });
    }
    
    async remove(
        id: string,
    ): Promise<Account> {
        return await this.prisma.account.delete({
            where: {
                id,
            },
        });
    }

}
