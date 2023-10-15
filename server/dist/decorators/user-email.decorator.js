"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEmail = void 0;
const common_1 = require("@nestjs/common");
exports.UserEmail = (0, common_1.createParamDecorator)((_, ctx) => {
    var _a;
    const s = ctx.switchToHttp().getRequest();
    return ((_a = s === null || s === void 0 ? void 0 : s.user) === null || _a === void 0 ? void 0 : _a.email) ? s.user.email : null;
});
//# sourceMappingURL=user-email.decorator.js.map