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
exports.WarehouseController = void 0;
const common_1 = require("@nestjs/common");
const warehouse_service_1 = require("./warehouse.service");
const create_warehouse_dto_1 = require("./dto/create-warehouse.dto");
const update_warehouse_dto_1 = require("./dto/update-warehouse.dto");
const access_decorator_1 = require("../decorators/access.decorator");
const user_entity_1 = require("../user/entities/user.entity");
let WarehouseController = class WarehouseController {
    constructor(warehouseService) {
        this.warehouseService = warehouseService;
    }
    async create(createWarehouseDto) {
        return await this.warehouseService.create(createWarehouseDto);
    }
    async findAll() {
        return await this.warehouseService.findAll();
    }
    async findOne(id) {
        return await this.warehouseService.findOneById(id);
    }
    async update(id, updateWarehouseDto) {
        return await this.warehouseService.update(id, updateWarehouseDto);
    }
    async remove(id) {
        return await this.warehouseService.softDelete(id);
    }
    async permDelete(id) {
        return await this.warehouseService.permanentDelete(id);
    }
};
exports.WarehouseController = WarehouseController;
__decorate([
    (0, common_1.Post)(),
    (0, access_decorator_1.Roles)(user_entity_1.UserRights.OPERATOR, user_entity_1.UserRights.OWNER),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_warehouse_dto_1.CreateWarehouseDto]),
    __metadata("design:returntype", Promise)
], WarehouseController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, access_decorator_1.Roles)(user_entity_1.UserRights.OPERATOR, user_entity_1.UserRights.OWNER, user_entity_1.UserRights.VIEWER),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WarehouseController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, access_decorator_1.Roles)(user_entity_1.UserRights.OPERATOR, user_entity_1.UserRights.OWNER, user_entity_1.UserRights.VIEWER),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WarehouseController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, access_decorator_1.Roles)(user_entity_1.UserRights.OWNER, user_entity_1.UserRights.OPERATOR),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_warehouse_dto_1.UpdateWarehouseDto]),
    __metadata("design:returntype", Promise)
], WarehouseController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, access_decorator_1.Roles)(user_entity_1.UserRights.OWNER, user_entity_1.UserRights.OPERATOR),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WarehouseController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)('perm/:id'),
    (0, access_decorator_1.Roles)(user_entity_1.UserRights.OWNER),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WarehouseController.prototype, "permDelete", null);
exports.WarehouseController = WarehouseController = __decorate([
    (0, common_1.Controller)('warehouse'),
    __metadata("design:paramtypes", [warehouse_service_1.WarehouseService])
], WarehouseController);
//# sourceMappingURL=warehouse.controller.js.map