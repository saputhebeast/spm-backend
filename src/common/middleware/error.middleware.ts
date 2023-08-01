import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ErrorMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): any {
    res.on('finish', () => {
      if (res.statusCode >= 400) {
        console.error(`Error occurred: ${res.statusCode}`);
      }
    });
    next();
  }
}
