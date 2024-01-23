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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const jwt_1 = require("@nestjs/jwt");
const user_entity_1 = require("../user/entities/user.entity");
const user_repository_1 = require("../user/user.repository");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(userService, userRepository, jwtService, logger) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.logger = logger;
    }
    async signup(createUserDto) {
        try {
            const existingUser = await this.userService.findOneByEmail(createUserDto.email);
            if (existingUser) {
                throw new common_1.ConflictException('Email already exists');
            }
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);
            const data = Object.assign({}, createUserDto, {
                rights: user_entity_1.UserRights.VIEWER,
                password: hashedPassword,
            });
            const returnedUserFromBase = await this.userService.create(createUserDto);
            const payload = {
                id: returnedUserFromBase.id,
                email: returnedUserFromBase.email,
                rights: returnedUserFromBase.userRole,
            };
            return { access_token: await this.jwtService.signAsync(payload) };
        }
        catch (error) {
            if (error instanceof common_1.ConflictException) {
                throw new common_1.ConflictException('Email already exists');
            }
            throw new common_1.InternalServerErrorException('Internal Server Error');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        user_repository_1.UserRepository,
        jwt_1.JwtService,
        common_1.Logger])
], AuthService);
//# sourceMappingURL=auth.service.js.map