"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
let AuthorizationExceptionFilter = class AuthorizationExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const action = request.method;
        let message;
        if (action === 'POST') {
            message = 'You are not authorized to perform create.';
        }
        else if (action === 'PATCH') {
            message = 'You are not authorized to perform update.';
        }
        else if (action === 'DELETE') {
            message = 'You are not authorized to perform delete.';
        }
        response.status(exception.getStatus()).json({
            statusCode: exception.getStatus(),
            message,
        });
    }
};
exports.AuthorizationExceptionFilter = AuthorizationExceptionFilter;
exports.AuthorizationExceptionFilter = AuthorizationExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.UnauthorizedException)
], AuthorizationExceptionFilter);
//# sourceMappingURL=authorization-exception.filter.js.map