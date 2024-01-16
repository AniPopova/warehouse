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
    findAll() {
        return this.invoiceRepository.find();
    }
    findOneBy(id) {
        return this.invoiceRepository.findOneByOrFail({ id });
    }
    async update(id, attrs) {
        const invoice = await this.findOneBy(id);
        if (!invoice) {
            throw new common_1.NotFoundException(`There is no invoice with such id:${id}.`);
        }
        Object.assign(invoice, attrs);
        await this.invoiceRepository.save(invoice);
        return invoice;
    }
    async remove(id) {
        try {
            const invoice = await this.invoiceRepository.findOneBy({ id });
            if (!invoice) {
                throw new common_1.NotFoundException(`Invoice with id: ${id} not found`);
            }
            invoice.deletedAt = new Date();
            await this.invoiceRepository.save(invoice);
            return `Invoice with id: ${id} removed successfully.`;
        }
        catch (error) {
            this.logger.error(`Error during soft delete of an invoice`, error);
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