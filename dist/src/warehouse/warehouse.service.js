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
exports.WarehouseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const warehouse_entity_1 = require("./entities/warehouse.entity");
let WarehouseService = class WarehouseService {
    constructor(warehouseRepository, logger) {
        this.warehouseRepository = warehouseRepository;
        this.logger = logger;
    }
    async create(createWarehouseDto) {
        try {
            const newWarehouse = this.warehouseRepository.create(createWarehouseDto);
            return await this.warehouseRepository.save(newWarehouse);
        }
        catch (error) {
            this.logger.error('Impossible create', error);
        }
    }
    async findAll() {
        const warehouses = this.warehouseRepository.find();
        if ((await warehouses).length === 0) {
            throw new common_1.NotFoundException('DB is empty!');
        }
        return warehouses;
    }
    async findOneById(id) {
        try {
            const warehouse = await this.warehouseRepository.findOneBy({ id });
            if (!warehouse) {
                throw new common_1.NotFoundException(`Warehouse not found.`);
            }
            return warehouse;
        }
        catch (error) {
            this.logger.error(`Error during search: `, error);
        }
    }
    async update(id, attrs) {
        try {
            const warehouse = await this.warehouseRepository.findOneBy({ id });
            if (!warehouse) {
                throw new common_1.NotFoundException(`Warehouse not found!`);
            }
            Object.assign(warehouse, attrs);
            await this.warehouseRepository.save(warehouse);
            return warehouse;
        }
        catch (error) {
            this.logger.error('Update not executed', error);
        }
    }
    async softDelete(id) {
        try {
            const warehouse = await this.warehouseRepository.findOneBy({ id });
            if (!warehouse) {
                throw new common_1.NotFoundException(`Warehouse not found.`);
            }
            warehouse.deletedAt = new Date();
            await this.warehouseRepository.save(warehouse);
            return `Warehouse successfully removed.`;
        }
        catch (error) {
            this.logger.error('Error during delete.', error);
        }
    }
    async permanentDelete(id) {
        try {
            const warehouse = await this.warehouseRepository.findOneBy({ id });
            if (!warehouse) {
                throw new common_1.NotFoundException(`Warehouse with id: ${id} not found.`);
            }
            console.log(`Warehouse permanently removed.`);
            return await this.warehouseRepository.remove(warehouse);
        }
        catch (error) {
            this.logger.error('Error during permanently deleting warehouse.', error);
        }
    }
};
exports.WarehouseService = WarehouseService;
exports.WarehouseService = WarehouseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(warehouse_entity_1.Warehouse)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        common_1.Logger])
], WarehouseService);
//# sourceMappingURL=warehouse.service.js.map