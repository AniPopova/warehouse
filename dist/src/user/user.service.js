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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let UserService = class UserService {
    constructor(userRepository, logger) {
        this.userRepository = userRepository;
        this.logger = logger;
    }
    async create(createUserDto) {
        const { name, password, email, userRole } = createUserDto;
        const chosenRole = userRole !== undefined ? userRole : user_entity_1.UserRights.VIEWER;
        const newUser = await this.userRepository.save({
            name,
            password,
            email,
            userRole: chosenRole,
        });
        return newUser;
    }
    findAll() {
        return this.userRepository.find();
    }
    async findOneById(id) {
        try {
            return await this.userRepository.findOneBy({ id });
        }
        catch (error) {
            if (error.name === 'EntityNotFound') {
                throw new common_1.NotFoundException(`User with id ${id} not found`);
            }
            else if (error.name === 'UnauthorizedException') {
                throw new common_1.UnauthorizedException('Do do not have rights to execute this action!');
            }
            this.logger.error('Error during search user', error);
            throw error;
        }
    }
    async update(id, attrs) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new common_1.NotFoundException(`User with id: ${id} not found!`);
        }
        Object.assign(user, attrs);
        await this.userRepository.save(user);
        return user;
    }
    async remove(id) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new common_1.NotFoundException(`User with id: ${id} not found!`);
        }
        user.deletedAt = new Date();
        await this.userRepository.save(user);
        return `User with id: ${id} removed successfully.`;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository, common_1.Logger])
], UserService);
//# sourceMappingURL=user.service.js.map