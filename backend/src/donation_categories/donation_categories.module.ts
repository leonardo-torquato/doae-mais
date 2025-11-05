import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonationCategory } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DonationCategory])],
})
export class DonationCategoriesModule {}