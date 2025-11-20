import { Controller, Post, Body, UseGuards, Get, Patch, Param } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateDonationStatusDto } from './dto/update-donation-status.dto';

@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @Post()
  create(@Body() createDonationDto: CreateDonationDto) {
    // O ValidationPipe em main.ts valida o DTO automaticamente
    return this.donationsService.create(createDonationDto);
  }

  // --- ROTAS PROTEGIDAS (ADMIN) ---

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.donationsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() updateStatusDto: UpdateDonationStatusDto) {
    return this.donationsService.updateStatus(id, updateStatusDto);
  }
}