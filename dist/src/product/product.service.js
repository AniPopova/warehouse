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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./entities/product.entity");
let ProductService = class ProductService {
    constructor(productRepository, logger) {
        this.productRepository = productRepository;
        this.logger = logger;
    }
    async create(createProductDto) {
        try {
            const { name, type, unit } = createProductDto;
            if (type === 'LIQUID') {
                if (unit !== 'l') {
                    throw new Error('Invalid combination: LIQUID type must have unit L.');
                }
            }
            else {
                if (unit !== 'kg') {
                    throw new Error('Invalid combination: Non-liquid type must have unit kg.');
                }
            }
            const newProduct = await this.productRepository.save({
                name,
                type,
                unit
            });
            return newProduct;
        }
        catch (error) {
            throw this.logger.error('Failure during creating product', error);
        }
    }
    async findAll() {
        return await this.productRepository.find();
    }
    async findOneById(id) {
        const product = await this.productRepository.findOneBy({ id });
        if (!product) {
            throw new common_1.NotFoundException(`Product with id: ${id}, not found.`);
        }
        return product;
    }
    async update(id, attrs) {
        try {
            const product = await this.productRepository.findOneBy({ id });
            if (!product) {
                throw new common_1.NotFoundException(`Product not found`);
            }
            Object.assign(product, attrs);
            await this.productRepository.save(product);
            return product;
        }
        catch (error) {
            this.logger.error('Update not executed', error);
        }
    }
    async remove(id) {
        try {
            const product = await this.productRepository.findOneBy({ id });
            if (!product) {
                throw new common_1.NotFoundException('Product not found, try again.');
            }
            product.deletedAt = new Date();
            return await this.productRepository.save(product);
        }
        catch (error) {
            this.logger.error('Error during deleting product.', error);
        }
    }
    async permanentDelete(id) {
        try {
            const product = await this.productRepository.findOneBy({ id });
            if (!product) {
                throw new common_1.NotFoundException(`Product not found.`);
            }
            return await this.productRepository.remove(product);
        }
        catch (error) {
            this.logger.error('Error during permanent delete.', error);
        }
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        common_1.Logger])
], ProductService);
//# sourceMappingURL=product.service.js.map