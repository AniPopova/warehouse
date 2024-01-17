import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';


@Injectable()
export class ClientService {

  constructor(@InjectRepository(Client) private readonly clientRepository: Repository<Client>, private readonly logger: Logger) { }

  async create(createClientDto: CreateClientDto) {
    const newClient = this.clientRepository.create(createClientDto);
    return this.clientRepository.save(newClient);
  }

  findAll(): Promise<Client[]> {
    return this.clientRepository.find();
  }

  async findOneById(id: string): Promise<Client> {
    try {
      const client = await this.clientRepository.findOneBy({ id });
      if (!client) {
        throw new NotFoundException(`Client with id: ${id}, not found.`)
      }
      return client;
    } catch (error) {
      this.logger.log(`Error during search of client with id: ${id}`);
      throw error;
    }

  }

  async update(id: string, attrs: Partial<Client>) {

    const client = await this.clientRepository.findOneBy({ id });
    if (!client) {
      throw new NotFoundException(`Client with such id:${id} not found`);
    }

    Object.assign(client, attrs);
    await this.clientRepository.save(client);
    return client;
  }

  async remove(id: string) {
    try {
      const client = await this.clientRepository.findOneBy({ id });
      if (!client) {
        throw new NotFoundException('Client not found, try again.');
      }
      client.deletedAt = new Date();
      await this.clientRepository.save(client);
      return `Client id:${id} removed successfully`;
    } catch (error) {
      this.logger.log('Error during deleting client. Insufficient rights to perform delete.');

    }
  }
}
