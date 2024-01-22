import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';


@Injectable()
export class ClientService {

  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    private readonly logger: Logger) { }

  async create(createClientDto: CreateClientDto) {
    try {
      const newClient = this.clientRepository.create(createClientDto);
      return await this.clientRepository.save(newClient);
    } catch (error) {
      this.logger.error('Impossible create', error);
    }
  }

  async findAll(): Promise<Client[] | null> {
    const clients = await this.clientRepository.find();
    if (clients.length === 0) {
      throw new NotFoundException('DB is empty!');
    }
    return clients;
  }

  async findOneById(id: string): Promise<Client | null> {
    try {
      const client = await this.clientRepository.findOneBy({id});
      if (!client) {
        throw new NotFoundException(`Client with such id, not found.`)
      }
      return client;
    } catch (error) {
      this.logger.error(`Error during search of client.`, error);
    }
  }

  async update(id: string, attrs: Partial<Client>) {
    try {
      const client = await this.clientRepository.findOneBy({ id });
      if (!client) {
        throw new NotFoundException(`Client with such id not found`);
      }

      Object.assign(client, attrs);
      await this.clientRepository.save(client);
      return client;
    } catch (error) {
      this.logger.error('Update not executed', error);
    }

  }

  async softDelete(id: string) {
    try {
      const client = await this.clientRepository.findOneBy({ id });
      if (!client) {
        throw new NotFoundException('Client not found.');
      }
      client.deletedAt = new Date();
      await this.clientRepository.save(client);
      return `Client removed successfully`;
    } catch (error) {
      this.logger.error('Error during deleting client.', error);
    }
  }

  async permanentDelete(id: string) {
    try {
      const client = await this.clientRepository.findOneBy({ id });
      if (!client) {
        throw new NotFoundException(`Client not found.`);
      }
      return await this.clientRepository.remove(client);
    } catch (error) {
      this.logger.error('Error during permanent delete.', error);
    }
  }
}
