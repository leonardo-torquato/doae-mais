import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Donation, DonationStatus } from './entities/donation.entity';
import { DonationCategory } from '../donation_categories/entities/category.entity';
import { Need } from '../needs/entities/need.entity';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationStatusDto } from './dto/update-donation-status.dto';

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

    // 3. Cria a nova doação usando repository.create para garantir tipagem correta
    const donation = this.donationRepository.create({
      description,
      category,
      need: need ?? null,
      status: DonationStatus.PENDING,
    });

    // 4. Salva no banco
    return this.donationRepository.save(donation);
  }

  findAll(): Promise<Donation[]> {
    return this.donationRepository.find({
      relations: ['category', 'need'], // Traz os objetos completos de Categoria e Need
      order: { createdAt: 'DESC' },
    });
  }

  async updateStatus(id: string, updateStatusDto: UpdateDonationStatusDto): Promise<Donation> {
    const donation = await this.donationRepository.findOneBy({ id });
    if (!donation) {
      throw new NotFoundException(`Doação com ID ${id} não encontrada.`);
    }

    donation.status = updateStatusDto.status;
    
    //TODO: Se a doação for vinculada a uma 'Need' e o status mudar para COLLECTED, futuramente poderemos somar no 'raised' da Need aqui.
    
    return this.donationRepository.save(donation);
  }
}