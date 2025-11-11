import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonationCategory } from './entities/category.entity';
import { DonationCategoriesController } from './donation_categories.controller';
import { DonationCategoriesService } from './donation_categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([DonationCategory])],
  controllers: [DonationCategoriesController],
  providers: [DonationCategoriesService],
})
export class DonationCategoriesModule {}