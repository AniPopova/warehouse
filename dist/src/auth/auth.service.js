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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const jwt_1 = require("@nestjs/jwt");
const user_entity_1 = require("../user/entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let AuthService = class AuthService {
    constructor(userService, userRepository, jwtService, logger) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.logger = logger;
    }
    async signIn(name, pass) {
        try {
            const user = await this.userService.findOneBy(name);
            if (user && 'password' in user) {
                const payload = { sub: user.id, name: user.name };
                return {
                    access_token: await this.jwtService.signAsync(payload),
                };
            }
            else {
                throw new common_1.UnauthorizedException('You are not authorized to execute this action!');
            }
        }
        catch (error) {
            this.logger.error('Error during user sign-in', error);
            throw error;
        }
    }
    async validateUser(email, password) {
        try {
            const user = await this.userRepository.findOneBy({ email });
            if (user && user.password === password) {
                return user;
            }
            return user;
        }
        catch (error) {
            this.logger.error('Error during user validation', error);
            throw error;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [user_service_1.UserService,
        typeorm_2.Repository,
        jwt_1.JwtService,
        common_1.Logger])
], AuthService);
//# sourceMappingURL=auth.service.js.map