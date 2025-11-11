import { Controller, Post, Body } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';

@Controller('donations') // Rota: /api/donations
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @Post() // Mapeia para POST /api/donations
  create(@Body() createDonationDto: CreateDonationDto) {
    // O ValidationPipe em main.ts valida o DTO automaticamente
    return this.donationsService.create(createDonationDto);
  }
}