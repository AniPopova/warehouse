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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSubscriber = exports.Order = exports.OrderType = void 0;
const typeorm_1 = require("typeorm");
const client_entity_1 = require("../../client/entities/client.entity");
const invoice_entity_1 = require("../../invoice/entities/invoice.entity");
var OrderType;
(function (OrderType) {
    OrderType["TRANSFER"] = "TRANSFER";
    OrderType["ORDER"] = "ORDER";
    OrderType["DELIVERY"] = "DELIVERY";
})(OrderType || (exports.OrderType = OrderType = {}));
let Order = class Order {
};
exports.Order = Order;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Order.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: OrderType
    }),
    __metadata("design:type", String)
], Order.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'client_id', type: 'uuid', nullable: false }),
    __metadata("design:type", String)
], Order.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Order.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Order.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at', nullable: true }),
    __metadata("design:type", Date)
], Order.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => client_entity_1.Client),
    (0, typeorm_1.JoinColumn)({ name: 'id' }),
    __metadata("design:type", client_entity_1.Client)
], Order.prototype, "client", void 0);
exports.Order = Order = __decorate([
    (0, typeorm_1.Entity)('order'),
    (0, typeorm_1.EventSubscriber)()
], Order);
let OrderSubscriber = class OrderSubscriber {
    listenTo() {
        return Order;
    }
    async afterInsert(event) {
        const order = event.entity;
        if (order.type === OrderType.ORDER) {
            const invoice = new invoice_entity_1.Invoice();
            invoice.orderId = order.id;
            await invoice_entity_1.Invoice.save(invoice);
        }
    }
};
exports.OrderSubscriber = OrderSubscriber;
exports.OrderSubscriber = OrderSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)()
], OrderSubscriber);
//# sourceMappingURL=order.entity.js.map