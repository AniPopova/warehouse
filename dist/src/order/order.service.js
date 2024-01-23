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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./entities/order.entity");
const invoice_entity_1 = require("../invoice/entities/invoice.entity");
const invoice_service_1 = require("../invoice/invoice.service");
const order_detail_entity_1 = require("../order_details/entities/order_detail.entity");
const order_details_service_1 = require("../order_details/order_details.service");
let OrderService = class OrderService {
    constructor(orderRepository, invoiceRepository, orderDetailsRepository, invoiceService, orderDetailsService, logger) {
        this.orderRepository = orderRepository;
        this.invoiceRepository = invoiceRepository;
        this.orderDetailsRepository = orderDetailsRepository;
        this.invoiceService = invoiceService;
        this.orderDetailsService = orderDetailsService;
        this.logger = logger;
    }
    async create(createOrderDto, createOrderDetailDto, createInvoiceDto) {
        try {
            const { type, clientId } = createOrderDto;
            const newOrder = await this.orderRepository.save({
                type,
                clientId,
            });
            console.log('New Order ID:', newOrder.id);
            const { warehouseId, productId, quantity, price } = createOrderDetailDto;
            const totalPrice = quantity * price;
            const newOrderDetail = await this.orderDetailsRepository.save({
                warehouseId,
                orderId: newOrder.id,
                productId,
                quantity,
                price,
                totalPrice,
            });
            await this.orderDetailsService.create(createOrderDetailDto);
            if (newOrder.type === 'ORDER') {
                const { orderId } = createInvoiceDto;
                const newInvoice = await this.invoiceRepository.save({
                    orderId: newOrder.id,
                });
                await this.invoiceService.create(createInvoiceDto);
                if (newInvoice) {
                    console.log('New Invoice Number:', newInvoice.invNumber);
                }
                return { order: newOrder, orderDetail: newOrderDetail, invoice: newInvoice };
            }
            return { order: newOrder, orderDetail: newOrderDetail };
        }
        catch (error) {
            console.error('Error in creating order:', error);
            throw this.logger.error('Failure in creating order.', error);
        }
    }
    async findAll() {
        const orders = this.orderRepository.find();
        if ((await orders).length === 0) {
            throw new common_1.NotFoundException('DB is empty!');
        }
        return orders;
    }
    async findOneById(id) {
        const order = await this.orderRepository.findOneBy({ id });
        if (!order) {
            throw new common_1.NotFoundException(`Order with id: ${id}, not found.`);
        }
        return order;
    }
    async update(id, attrs) {
        try {
            const order = await this.orderRepository.findOneBy({ id });
            if (!order) {
                throw new common_1.NotFoundException(`Order with such id:${id} not found`);
            }
            Object.assign(order, attrs);
            await this.orderRepository.save(order);
            return order;
        }
        catch (error) {
            this.logger.error('Failure to update order:', error);
        }
    }
    async remove(id) {
        try {
            const order = await this.orderRepository.findOneBy({ id });
            if (!order) {
                throw new common_1.NotFoundException(`Order not found, try again.`);
            }
            if (order.type === 'ORDER') {
                const invoice = await this.invoiceRepository.findOneBy({ orderId: order.id });
                const orderDetail = await this.orderDetailsRepository.findOneBy({ orderId: order.id });
                if (invoice) {
                    await this.invoiceService.remove(invoice.id);
                    invoice.deletedAt = new Date();
                }
                if (orderDetail) {
                    await this.orderDetailsService.remove(orderDetail.id);
                    orderDetail.deletedAt = new Date();
                }
            }
            order.deletedAt = new Date();
            await this.orderRepository.save(order);
            return `Order removed successfully`;
        }
        catch (error) {
            this.logger.error('Error during deleting order.', error);
        }
    }
    async permanentDelete(id) {
        try {
            const order = await this.orderRepository.findOneBy({ id });
            const invoice = await this.invoiceService.findOne(order.id);
            const orderDetail = this.orderDetailsService.findOneById(order.id);
            if (!order) {
                throw new common_1.NotFoundException(`Order not found.`);
            }
            if (invoice) {
                await this.invoiceService.permanentDelete(invoice.orderId);
            }
            await this.orderDetailsService.permanentDelete((await orderDetail).orderId);
            return await this.orderRepository.remove(order);
        }
        catch (error) {
            this.logger.error('Error during permanent delete.', error);
        }
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(invoice_entity_1.Invoice)),
    __param(2, (0, typeorm_1.InjectRepository)(order_detail_entity_1.OrderDetail)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        invoice_service_1.InvoiceService,
        order_details_service_1.OrderDetailsService,
        common_1.Logger])
], OrderService);
//# sourceMappingURL=order.service.js.map