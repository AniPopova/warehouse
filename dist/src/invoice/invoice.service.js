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
exports.InvoiceService = void 0;
const common_1 = require("@nestjs/common");
const invoice_entity_1 = require("./entities/invoice.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let InvoiceService = class InvoiceService {
    constructor(invoiceRepository, logger) {
        this.invoiceRepository = invoiceRepository;
        this.logger = logger;
    }
    async create(createInvoiceDto) {
        try {
            const { orderId } = createInvoiceDto;
            const newInvoice = await this.invoiceRepository.save({
                orderId,
            });
            return newInvoice;
        }
        catch (error) {
            this.logger.error('Impossible create', error);
        }
    }
    async findAll() {
        const invoices = this.invoiceRepository.find();
        if ((await invoices).length === 0) {
            throw new common_1.NotFoundException('DB is empty!');
        }
        return invoices;
    }
    async findOneBy(id) {
        try {
            const invoice = await this.invoiceRepository.findOneBy({ id });
            if (!invoice) {
                throw new common_1.NotFoundException(`Invoice with id: ${id}, not found.`);
            }
            return invoice;
        }
        catch (error) {
            this.logger.error(`Error during search of invoice.`, error);
        }
    }
    async findOne(orderId) {
        try {
            const invoice = await this.invoiceRepository.findOneBy({ orderId });
            if (!invoice) {
                throw new common_1.NotFoundException(`Invoice not found.`);
            }
            return invoice;
        }
        catch (error) {
            this.logger.error(`Error during search of invoice.`, error);
        }
    }
    async update(id, attrs) {
        try {
            const invoice = await this.findOneBy(id);
            if (!invoice) {
                throw new common_1.NotFoundException(`There is no invoice with such id:${id}.`);
            }
            Object.assign(invoice, attrs);
            await this.invoiceRepository.save(invoice);
            return invoice;
        }
        catch (error) {
            this.logger.error('Update not executed', error);
        }
    }
    async remove(id) {
        try {
            const invoice = await this.invoiceRepository.findOneBy({ id });
            if (!invoice) {
                throw new common_1.NotFoundException(`Invoice not found`);
            }
            invoice.deletedAt = new Date();
            await this.invoiceRepository.save(invoice);
            return `Invoice removed successfully.`;
        }
        catch (error) {
            this.logger.error(`Error delete of invoice`, error);
        }
    }
    async permanentDelete(id) {
        try {
            const invoice = await this.invoiceRepository.findOneBy({ id });
            if (!invoice) {
                throw new common_1.NotFoundException(`Invoice not found.`);
            }
            await this.invoiceRepository.remove(invoice);
            return `Invoice permanently removed.`;
        }
        catch (error) {
            this.logger.error('Error during permanently deleting warehouse.', error);
        }
    }
};
exports.InvoiceService = InvoiceService;
exports.InvoiceService = InvoiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(invoice_entity_1.Invoice)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        common_1.Logger])
], InvoiceService);
//# sourceMappingURL=invoice.service.js.map