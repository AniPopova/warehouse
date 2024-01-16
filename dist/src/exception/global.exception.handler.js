"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalExceptionHandler = void 0;
class GlobalExceptionHandler extends Error {
    constructor(logger) {
        super();
        this.logger = logger;
    }
    handleSoftDeleteError(error) {
        this.logger.log('info', 'Error during soft delete of an invoice', error);
    }
}
exports.GlobalExceptionHandler = GlobalExceptionHandler;
//# sourceMappingURL=global.exception.handler.js.map