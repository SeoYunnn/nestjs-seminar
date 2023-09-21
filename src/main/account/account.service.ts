import {
    Injectable, UnauthorizedException,
} from "@nestjs/common";
import {
    PrismaConfig,
} from "@main/configure/prisma.config";
import {
    Account,
} from "@prisma/client";

import * as bcrypt from 'bcrypt';

@Injectable()
export class AccountService {

    constructor(
    private readonly prisma: PrismaConfig,
    ) {
    }

    async create(account: Account): Promise<Account> {
        // 비밀번호 해시 생성
        const hashedPassword = await bcrypt.hash(account.password, 10);

        // 해시된 비밀번호를 계정 데이터에 저장
        const accountData = {
            ...account,
            password: hashedPassword,
        };

        // Prisma를 사용하여 해시된 비밀번호를 데이터베이스에 저장
        return await this.prisma.account.create({
            data: accountData,
        });
    }

    async login(
        email: string,
        password: string,
    ): Promise<Account> {
        const user = await this.prisma.account.findUnique({
            where: {
                email,
            },
        });
        if(!user) {
            throw new UnauthorizedException("해당하는 이메일이 존재하지 않습니다");
        }

        const isPasswordValid  = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            throw new UnauthorizedException("비밀번호가 틀렸습니다, 다시 입력해주세요");
        }

        return user;
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
