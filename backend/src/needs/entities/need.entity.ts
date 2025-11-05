// backend/src/needs/entities/need.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Donation } from '../../donations/entities/donation.entity';

@Entity('needs')
export class Need {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string; // Ex: "Cestas Básicas de Abril"

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  goal: number; // Meta (em valor ou quantidade)

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  raised: number; // Arrecadado
  
  // Relação: Uma Necessidade pode receber muitas Doações
  @OneToMany(() => Donation, donation => donation.need)
  donations: Donation[];
}