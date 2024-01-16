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
exports.UpdateWarehouseDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_warehouse_dto_1 = require("./create-warehouse.dto");
const class_validator_1 = require("class-validator");
const product_entity_1 = require("../../product/entities/product.entity");
class UpdateWarehouseDto extends (0, mapped_types_1.PartialType)(create_warehouse_dto_1.CreateWarehouseDto) {
}
exports.UpdateWarehouseDto = UpdateWarehouseDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateWarehouseDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(product_entity_1.ProductType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateWarehouseDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsUUID)('4', { message: 'Invalid UUID' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateWarehouseDto.prototype, "clientId", void 0);
//# sourceMappingURL=update-warehouse.dto.js.map