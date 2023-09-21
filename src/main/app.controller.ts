import {
    Response, 
} from "express";
import * as process from "process";
import {
    join, 
} from "path";

import {
    Controller, Get, Logger, Res,
} from "@nestjs/common";
import {
    AppService,
} from "@main/app.service";
import {
    AppEnvironment,
} from "@main/type/environment";

@Controller("/")
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {
  }

  @Get("/")
  getIndex(
    @Res() response: Response,
  ): void {
      response
          .sendFile(join(process.cwd(), "src/resource/static/index.html"));
  }

  @Get("/config")
  getConfig(): AppEnvironment {
      const { host, port, } = this.appService.getConfig();

      this.logger.log(`host: ${host}, port: ${port}`);

      return {
          host,
          port,

      };
  }
}
