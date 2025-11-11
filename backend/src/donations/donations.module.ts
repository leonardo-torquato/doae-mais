import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donation } from './entities/donation.entity';
import { DonationsController } from './donations.controller';
import { DonationsService } from './donations.service';

//Entidades que o Service precisa validar
import { DonationCategory } from '../donation_categories/entities/category.entity';
import { Need } from '../needs/entities/need.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Donation, Need, DonationCategory])],
  controllers: [DonationsController],
  providers: [DonationsService],
})
export class DonationsModule {}