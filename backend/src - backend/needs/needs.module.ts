import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Need } from './entities/need.entity';
import { NeedsController } from './needs.controller';
import { NeedsService } from './needs.service';

@Module({
  imports: [TypeOrmModule.forFeature([Need])],
  controllers: [NeedsController], // 1. Adicione o Controller
  providers: [NeedsService], 
})
export class NeedsModule {}