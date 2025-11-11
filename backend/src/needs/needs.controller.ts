import { Controller, Get } from '@nestjs/common';
import { NeedsService } from './needs.service';

@Controller('needs') // Rota: /api/needs
export class NeedsController {
  constructor(private readonly needsService: NeedsService) {}

  @Get() // Mapeia para GET /api/needs
  findAll() {
    return this.needsService.findAll();
  }
}