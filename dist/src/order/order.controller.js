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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const update_order_dto_1 = require("./dto/update-order.dto");
const access_decorator_1 = require("../decorators/access.decorator");
const user_entity_1 = require("../user/entities/user.entity");
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async create(body) {
        const { createOrderDto, createOrderDetailDto, createInvoiceDto } = body;
        return await this.orderService.create(createOrderDto, createOrderDetailDto, createInvoiceDto);
    }
    async findAll() {
        return await this.orderService.findAll();
    }
    async findOne(id) {
        return await this.orderService.findOneById(id);
    }
    async update(id, body) {
        return await this.orderService.update(id, body);
    }
    async remove(id) {
        return await this.orderService.remove(id);
    }
    async permanentDelete(id) {
        return await this.orderService.permanentDelete(id);
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, common_1.Post)(),
    (0, access_decorator_1.Roles)(user_entity_1.UserRights.OPERATOR, user_entity_1.UserRights.OWNER),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, access_decorator_1.Roles)(user_entity_1.UserRights.OPERATOR, user_entity_1.UserRights.OWNER, user_entity_1.UserRights.VIEWER),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, access_decorator_1.Roles)(user_entity_1.UserRights.OPERATOR, user_entity_1.UserRights.OWNER, user_entity_1.UserRights.VIEWER),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, access_decorator_1.Roles)(user_entity_1.UserRights.OWNER, user_entity_1.UserRights.OPERATOR),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_order_dto_1.UpdateOrderDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, access_decorator_1.Roles)(user_entity_1.UserRights.OWNER, user_entity_1.UserRights.VIEWER),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)('perm/:id'),
    (0, access_decorator_1.Roles)(user_entity_1.UserRights.OWNER),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "permanentDelete", null);
exports.OrderController = OrderController = __decorate([
    (0, common_1.Controller)('order'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
//# sourceMappingURL=order.controller.js.map