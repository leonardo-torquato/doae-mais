import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DonationCategory } from './entities/category.entity';

@Injectable()
export class DonationCategoriesService {
  constructor(
    @InjectRepository(DonationCategory)
    private readonly categoryRepository: Repository<DonationCategory>,
  ) {}

  // Lógica para buscar todas as categorias
  findAll(): Promise<DonationCategory[]> {
    return this.categoryRepository.find();
  }
}