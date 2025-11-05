// backend/src/donation_categories/entities/category.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Donation } from '../../donations/entities/donation.entity';

@Entity('donation_categories')
export class DonationCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; // Ex: "Alimentos", "Roupas"

  // Relação: Uma Categoria pode ter muitas Doações
  @OneToMany(() => Donation, donation => donation.category)
  donations: Donation[];
}