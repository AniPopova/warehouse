import { Logger } from "typeorm/logger/Logger";

export class GlobalExceptionHandler extends Error{
  constructor(private readonly logger: Logger) {
    super();
  }

  handleSoftDeleteError(error: any): void {
    this.logger.log('info', 'Error during soft delete of an invoice', error);
  }
}