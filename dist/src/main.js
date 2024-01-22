"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const user_role_guard_1 = require("./user/user-role.guard");
async function bootstrap() {
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.useGlobalPipes(new common_1.ValidationPipe());
        app.useGlobalGuards(new user_role_guard_1.UserRoleGuard(app.get(core_1.Reflector)));
        await app.listen(3000);
        console.log(`Application is running on: http://localhost:3000`);
    }
    catch (error) {
        console.error('Error during application startup:', error);
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map