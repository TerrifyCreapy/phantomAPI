import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";


@Injectable()
export class SubdomainMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const hostname = req.hostname;
        const subdomain = hostname.split('.')[0];
        console.log(subdomain);
        req.headers.subdomain = subdomain;
        next();
    }
}