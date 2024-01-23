"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModule = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const order_controller_1 = require("./order.controller");
const typeorm_1 = require("@nestjs/typeorm");
const order_entity_1 = require("./entities/order.entity");
const invoice_service_1 = require("../invoice/invoice.service");
const order_details_service_1 = require("../order_details/order_details.service");
const invoice_entity_1 = require("../invoice/entities/invoice.entity");
const order_detail_entity_1 = require("../order_details/entities/order_detail.entity");
const user_role_guard_1 = require("../../guards/user-role.guard");
let OrderModule = class OrderModule {
};
exports.OrderModule = OrderModule;
exports.OrderModule = OrderModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([order_entity_1.Order, invoice_entity_1.Invoice, order_detail_entity_1.OrderDetail])],
        controllers: [order_controller_1.OrderController],
        providers: [order_service_1.OrderService, common_1.Logger, invoice_service_1.InvoiceService, order_details_service_1.OrderDetailsService, user_role_guard_1.UserRoleGuard],
        exports: [typeorm_1.TypeOrmModule]
    })
], OrderModule);
//# sourceMappingURL=order.module.js.map