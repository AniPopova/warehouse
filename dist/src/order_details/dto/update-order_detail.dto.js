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
exports.UpdateOrderDetailDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_order_detail_dto_1 = require("./create-order_detail.dto");
const class_validator_1 = require("class-validator");
class UpdateOrderDetailDto extends (0, mapped_types_1.PartialType)(create_order_detail_dto_1.CreateOrderDetailDto) {
}
exports.UpdateOrderDetailDto = UpdateOrderDetailDto;
__decorate([
    (0, class_validator_1.IsUUID)('4', { message: 'Invalid UUID' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateOrderDetailDto.prototype, "warehouseId", void 0);
__decorate([
    (0, class_validator_1.IsUUID)('4', { message: 'Invalid UUID' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateOrderDetailDto.prototype, "orderId", void 0);
__decorate([
    (0, class_validator_1.IsUUID)('4', { message: 'Invalid UUID' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateOrderDetailDto.prototype, "productId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateOrderDetailDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateOrderDetailDto.prototype, "price", void 0);
//# sourceMappingURL=update-order_detail.dto.js.map