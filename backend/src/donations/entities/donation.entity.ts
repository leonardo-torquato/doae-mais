// backend/src/donations/entities/donation.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { DonationCategory } from '../../donation_categories/entities/category.entity';
import { Need } from '../../needs/entities/need.entity';

// Enum para o status da doação
export enum DonationStatus {
  PENDING = 'pendente',
  COLLECTED = 'coletado',
  CANCELLED = 'cancelado',
}

@Entity('donations')
export class Donation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  description: string; // "5kg de arroz"

  @Column({
    type: 'enum',
    enum: DonationStatus,
    default: DonationStatus.PENDING,
  })
  status: DonationStatus;

  @CreateDateColumn()
  createdAt: Date;

  // Relação: Muitas Doações pertencem a UMA Categoria
  @ManyToOne(() => DonationCategory, category => category.donations)
  category: DonationCategory;

  // Relação: Muitas Doações podem ser para UMA Necessidade (opcional)
  @ManyToOne(() => Need, need => need.donations, { nullable: true }) // nullable = true
  need: Need;
}