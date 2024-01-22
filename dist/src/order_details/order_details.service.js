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
exports.OrderDetailsService = void 0;
const common_1 = require("@nestjs/common");
const order_detail_entity_1 = require("./entities/order_detail.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let OrderDetailsService = class OrderDetailsService {
    constructor(orderDetailRepository, logger) {
        this.orderDetailRepository = orderDetailRepository;
        this.logger = logger;
    }
    async create(createOrderDetailDto) {
        try {
            const orderDetails = this.orderDetailRepository.create(createOrderDetailDto);
            return this.orderDetailRepository.save(orderDetails);
        }
        catch (error) {
            this.logger.error('Impossible creation', error);
        }
    }
    async findAll() {
        const orderDetails = this.orderDetailRepository.find();
        if ((await orderDetails).length === 0) {
            throw new common_1.NotFoundException('DB is empty!');
        }
        return orderDetails;
    }
    async findOneById(id) {
        try {
            const orderDetail = await this.orderDetailRepository.findOneBy({ id });
            if (!orderDetail) {
                throw new common_1.NotFoundException();
            }
            return orderDetail;
        }
        catch (error) {
            this.logger.error(`Error search details by id: ${id}`, error);
            throw new common_1.BadRequestException('Error finding details by id.');
        }
    }
    async update(id, attrs) {
        try {
            const orderDetail = await this.orderDetailRepository.findOneBy({ id });
            if (!orderDetail) {
                throw new common_1.NotFoundException(`Details with id:${id} not found`);
            }
            Object.assign(orderDetail, attrs);
            await this.orderDetailRepository.save(orderDetail);
            return orderDetail;
        }
        catch (error) {
            this.logger.error('Update not executed', error);
        }
    }
    async remove(id) {
        try {
            const od = await this.orderDetailRepository.findOneBy({ id });
            if (!od) {
                throw new common_1.NotFoundException(`Data not found`);
            }
            od.deletedAt = new Date();
            await this.orderDetailRepository.save(od);
            return `Details removed successfully`;
        }
        catch (error) {
            this.logger.error('Error during deleting data.', error);
        }
    }
    async permanentDelete(id) {
        try {
            const orderDetail = await this.orderDetailRepository.findOneBy({ id });
            if (!orderDetail) {
                throw new common_1.NotFoundException(`Data not found.`);
            }
            return await this.orderDetailRepository.remove(orderDetail);
        }
        catch (error) {
            this.logger.error('Error during permanent delete.', error);
        }
    }
};
exports.OrderDetailsService = OrderDetailsService;
exports.OrderDetailsService = OrderDetailsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_detail_entity_1.OrderDetail)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        common_1.Logger])
], OrderDetailsService);
//# sourceMappingURL=order_details.service.js.map