import { Logger } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
export declare class ClientService {
    private readonly clientRepository;
    private readonly logger;
    constructor(clientRepository: Repository<Client>, logger: Logger);
    create(createClientDto: CreateClientDto): Promise<Client>;
    findAll(): Promise<Client[]>;
    findOneById(id: string): Promise<Client>;
    update(id: string, attrs: Partial<Client>): Promise<Client>;
    remove(id: string): Promise<string>;
}
