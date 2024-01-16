import { Logger } from "typeorm/logger/Logger";
export declare class GlobalExceptionHandler extends Error {
    private readonly logger;
    constructor(logger: Logger);
    handleSoftDeleteError(error: any): void;
}
