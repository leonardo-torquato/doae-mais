import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Donation } from './entities/donation.entity';
import { DonationCategory } from '../donation_categories/entities/category.entity';
import { Need } from '../needs/entities/need.entity';
import { CreateDonationDto } from './dto/create-donation.dto';

@Injectable()
export class DonationsService {
  constructor(
    @InjectRepository(Donation)
    private readonly donationRepository: Repository<Donation>,
    
    // Precisamos dos outros repositórios para validar os IDs
    @InjectRepository(DonationCategory)
    private readonly categoryRepository: Repository<DonationCategory>,
    
    @InjectRepository(Need)
    private readonly needRepository: Repository<Need>,
  ) {}

  async create(createDonationDto: CreateDonationDto): Promise<Donation> {
    const { categoryId, needId, description } = createDonationDto;

    // 1. Valida se a Categoria existe
    const category = await this.categoryRepository.findOneBy({ id: categoryId });
    if (!category) {
      throw new NotFoundException(`Categoria com ID ${categoryId} não encontrada.`);
    }

    let need: Need | null = null;
    // 2. Valida se a Necessidade (Need) existe, se for informada
    if (needId) {
      need = await this.needRepository.findOneBy({ id: needId });
      if (!need) {
        throw new NotFoundException(`Necessidade com ID ${needId} não encontrada.`);
      }
    }

    // 3. Cria a nova doação
    const newDonation = this.donationRepository.create({
      description,
      category: category,
      need: need, // Será null se needId não for fornecido
      status: 'pendente', //
    });

    // 4. Salva no banco
    return this.donationRepository.save(newDonation);
  }
}