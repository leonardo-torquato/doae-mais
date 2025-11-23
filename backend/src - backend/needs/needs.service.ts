import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Need } from './entities/need.entity';
import { CreateNeedDto } from './dto/create-need.dto';
import { UpdateNeedDto } from './dto/update-need.dto';

@Injectable()
export class NeedsService {
  constructor(
    @InjectRepository(Need)
    private readonly needRepository: Repository<Need>,
  ) {}

  findAll(): Promise<Need[]> {
    // Ordena pelas mais recentes
    return this.needRepository.find({ order: { id: 'DESC' } });
  }

  async create(createNeedDto: CreateNeedDto): Promise<Need> {
    const newNeed = this.needRepository.create(createNeedDto);
    return this.needRepository.save(newNeed);
  }

  async update(id: number, updateNeedDto: UpdateNeedDto): Promise<Need> {
    const need = await this.needRepository.findOneBy({ id });
    if (!need) {
      throw new NotFoundException(`Necessidade com ID ${id} não encontrada`);
    }
    
    // Mescla os dados atuais com os novos dados
    this.needRepository.merge(need, updateNeedDto);
    return this.needRepository.save(need);
  }

  async remove(id: number): Promise<void> {
    const result = await this.needRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Necessidade com ID ${id} não encontrada`);
    }
  }
}