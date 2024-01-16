"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_role_guard_1 = require("./user-role.guard");
const user_entity_1 = require("./entities/user.entity");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const access_decorator_1 = require("../decorators/access.decorator");
const update_user_dto_1 = require("./dto/update-user.dto");
const user_dto_1 = require("./dto/user.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    findAll() {
        return this.userService.findAll();
    }
    findOne(id) {
        return this.userService.findOneById(id);
    }
    create(body) {
        const newUser = this.userService.create(body);
        return `New user created successfully.`;
    }
    update(id, body) {
        const user = this.userService.update(id, body);
        return `User ${user} updated successfully.`;
    }
    remove(id) {
        return `User with id:${id} deleted successfully.`;
    }
};
exports.UserController = UserController;
__decorate([
    (0, access_decorator_1.Serialize)(user_dto_1.UserDto),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAll", null);
__decorate([
    (0, access_decorator_1.Serialize)(user_dto_1.UserDto),
    (0, common_1.Get)('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, access_decorator_1.Access)(user_entity_1.UserRights.OPERATOR, user_entity_1.UserRights.OWNER),
    (0, common_1.UseGuards)(user_role_guard_1.UserRoleGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    (0, common_1.SetMetadata)('roles', [user_entity_1.UserRights.OPERATOR, user_entity_1.UserRights.OWNER]),
    (0, common_1.UseGuards)(user_role_guard_1.UserRoleGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.SetMetadata)('roles', [user_entity_1.UserRights.OWNER]),
    (0, common_1.UseGuards)(user_role_guard_1.UserRoleGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "remove", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map