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
exports.ClientService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const client_entity_1 = require("./entities/client.entity");
let ClientService = class ClientService {
    constructor(clientRepository, logger) {
        this.clientRepository = clientRepository;
        this.logger = logger;
    }
    async create(createClientDto) {
        try {
            const newClient = this.clientRepository.create(createClientDto);
            return await this.clientRepository.save(newClient);
        }
        catch (error) {
            this.logger.error('Impossible create', error);
        }
    }
    async findAll() {
        const clients = await this.clientRepository.find();
        if (clients.length === 0) {
            throw new common_1.NotFoundException('DB is empty!');
        }
        return clients;
    }
    async findOneById(id) {
        try {
            const client = await this.clientRepository.findOneBy({ id });
            if (!client) {
                throw new common_1.NotFoundException(`Client with such id, not found.`);
            }
            return client;
        }
        catch (error) {
            this.logger.error(`Error during search of client.`, error);
        }
    }
    async update(id, attrs) {
        try {
            const client = await this.clientRepository.findOneBy({ id });
            if (!client) {
                throw new common_1.NotFoundException(`Client with such id not found`);
            }
            Object.assign(client, attrs);
            await this.clientRepository.save(client);
            return client;
        }
        catch (error) {
            this.logger.error('Update not executed', error);
        }
    }
    async softDelete(id) {
        try {
            const client = await this.clientRepository.findOneBy({ id });
            if (!client) {
                throw new common_1.NotFoundException('Client not found.');
            }
            client.deletedAt = new Date();
            await this.clientRepository.save(client);
            return `Client removed successfully`;
        }
        catch (error) {
            this.logger.error('Error during deleting client.', error);
        }
    }
    async permanentDelete(id) {
        try {
            const client = await this.clientRepository.findOneBy({ id });
            if (!client) {
                throw new common_1.NotFoundException(`Client not found.`);
            }
            return await this.clientRepository.remove(client);
        }
        catch (error) {
            this.logger.error('Error during permanent delete.', error);
        }
    }
};
exports.ClientService = ClientService;
exports.ClientService = ClientService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(client_entity_1.Client)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        common_1.Logger])
], ClientService);
//# sourceMappingURL=client.service.js.map