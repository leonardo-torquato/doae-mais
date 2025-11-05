import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Need } from './entities/need.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Need])],
})
export class NeedsModule {}