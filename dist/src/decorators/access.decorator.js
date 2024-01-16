"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = exports.Serialize = exports.Access = void 0;
const common_1 = require("@nestjs/common");
const serialize_interceptor_1 = require("../interceptors/serialize.interceptor");
const Access = (...roles) => (0, common_1.SetMetadata)('access:user_roles', roles);
exports.Access = Access;
const Serialize = (dto) => (0, common_1.UseInterceptors)(new serialize_interceptor_1.SerializeInterceptor(dto));
exports.Serialize = Serialize;
const Roles = (...roles) => (0, common_1.SetMetadata)('roles', roles);
exports.Roles = Roles;
//# sourceMappingURL=access.decorator.js.map