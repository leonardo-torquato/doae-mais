import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { NeedsService } from './needs.service';
import { CreateNeedDto } from './dto/create-need.dto';
import { UpdateNeedDto } from './dto/update-need.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('needs') // Rota: /api/needs
export class NeedsController {
  constructor(private readonly needsService: NeedsService) {}

  @Get() 
  findAll() {
    return this.needsService.findAll();
  }

  // --- ROTAS PROTEGIDAS (ADMIN) ---

  @UseGuards(JwtAuthGuard) // Protege a rota
  @Post()
  create(@Body() createNeedDto: CreateNeedDto) {
    return this.needsService.create(createNeedDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number, // ParseIntPipe converte "1" string para 1 number
    @Body() updateNeedDto: UpdateNeedDto,
  ) {
    return this.needsService.update(id, updateNeedDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.needsService.remove(id);
  }
}