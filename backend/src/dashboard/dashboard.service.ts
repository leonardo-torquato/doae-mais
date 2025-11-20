import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Donation } from '../donations/entities/donation.entity';
import { Need } from '../needs/entities/need.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Donation)
    private readonly donationRepository: Repository<Donation>,
    
    @InjectRepository(Need)
    private readonly needRepository: Repository<Need>,
  ) {}

  async getDonationsByCategory() {
    const result = await this.donationRepository
      .createQueryBuilder('donation')
      .leftJoinAndSelect('donation.category', 'category')
      .select('category.name', 'label')
      .addSelect('COUNT(donation.id)', 'count')
      .groupBy('category.name')
      .getRawMany();

    const labels = result.map(item => item.label);
    const data = result.map(item => parseInt(item.count, 10));

    return { labels, data };
  }

  // Retorna resumo geral (pode ser usado na home ou topo do dashboard)
  async getGeneralStats() {
    const totalDonations = await this.donationRepository.count();
    
    // Soma do valor arrecadado em 'Needs' (via query builder para somar coluna)
    const { totalRaised } = await this.needRepository
      .createQueryBuilder('need')
      .select('SUM(need.raised)', 'totalRaised')
      .getRawOne();

    return {
      totalDonations,
      totalRaised: parseFloat(totalRaised || '0'),
    };
  }
}