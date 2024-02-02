import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';


@Injectable()
export class ClientService {

  constructor(@InjectRepository(Client) private readonly clientRepository: Repository<Client>) { }

  async create(createClientDto: CreateClientDto) {
    try {
      const newClient = this.clientRepository.create(createClientDto);
      return await this.clientRepository.save(newClient);
    } catch (error) {
      throw error('Impossible create', error);
    }
  }

  async findAll(): Promise<Client[]> {
    const clients = await this.clientRepository.find();
    if (clients.length === 0) {
      throw new NotFoundException('DB is empty!');
    }
    return clients;
  }

  async findOneById(id: string): Promise<Client> {
      const client = await this.clientRepository.findOneBy({id});
      if (!client) {
        throw new NotFoundException(`Client with such id, not found.`)
      }
      return client;
  }

  async update(id: string, attrs: Partial<Client>) {
      const client = await this.clientRepository.findOneBy({ id });
      if (!client) {
        throw new NotFoundException(`Client with such id not found`);
      } 
      Object.assign(client, attrs);
      return await this.clientRepository.save(client);

  }

  async softDelete(id: string) {
      const client = await this.clientRepository.findOneBy({ id });
      if (!client) {
        throw new NotFoundException('Client not found.');
      }
      client.deletedAt = new Date();
      await this.clientRepository.save(client);
      return `Client removed successfully`;
  }

  async permanentDelete(id: string) {
    try {
      const client = await this.clientRepository.findOneBy({ id });
      if (!client) {
        throw new NotFoundException(`Client not found.`);
      }
      return await this.clientRepository.remove(client);
    } catch (error) {
      throw error('Error during permanent delete.', error);
    }
  }
}
