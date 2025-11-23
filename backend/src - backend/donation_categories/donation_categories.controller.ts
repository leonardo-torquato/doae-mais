import { Controller, Get } from '@nestjs/common';
import { DonationCategoriesService } from './donation_categories.service';

@Controller('donation-categories') // Rota: /api/donation-categories
export class DonationCategoriesController {
  constructor(private readonly categoriesService: DonationCategoriesService) {}

  @Get() // Mapeia para GET /api/donation-categories
  findAll() {
    return this.categoriesService.findAll();
  }
}