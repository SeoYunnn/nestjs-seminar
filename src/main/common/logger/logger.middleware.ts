import {
    randomUUID,
} from "node:crypto";

import {
    NextFunction,
    Request,
    Response,
} from "express";

import {
    Injectable, NestMiddleware, 
} from '@nestjs/common';

import {
    storage, 
} from "@main/common/logger/logger.storage";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(
        req: Request,
        _res: Response, 
        next: NextFunction,
    ): void {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        storage.run(randomUUID(), next, undefined);
    }
}
