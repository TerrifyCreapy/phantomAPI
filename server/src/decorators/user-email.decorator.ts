import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const UserEmail = createParamDecorator(
    (_: unknown, ctx: ExecutionContext) => {
        const s = ctx.switchToHttp().getRequest();
        return s?.user?.email? s.user.email : null;
    }
)