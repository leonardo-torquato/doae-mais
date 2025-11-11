import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Need } from './entities/need.entity';

@Injectable()
export class NeedsService {
  constructor(
    @InjectRepository(Need)
    private readonly needRepository: Repository<Need>,
  ) {}

  // Lógica para buscar todas as necessidades
  findAll(): Promise<Need[]> {
    // Ordena pelas mais recentes
    return this.needRepository.find({ order: { id: 'DESC' } });
  }
}