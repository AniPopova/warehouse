"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthCredentialsDto = void 0;
const user_entity_1 = require("../../user/entities/user.entity");
class AuthCredentialsDto {
    constructor() {
        this.userRole = user_entity_1.UserRights.VIEWER;
    }
}
exports.AuthCredentialsDto = AuthCredentialsDto;
//# sourceMappingURL=auth-credentials.dto.js.map