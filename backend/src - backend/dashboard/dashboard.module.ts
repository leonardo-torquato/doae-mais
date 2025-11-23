import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { Donation } from '../donations/entities/donation.entity';
import { Need } from '../needs/entities/need.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Donation, Need]) // Registra os repositórios
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}