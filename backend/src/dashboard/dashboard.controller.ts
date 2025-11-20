import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  // --- ROTA PÚBLICA (Homepage) ---
  @Get('public-summary')
  async getPublicSummary() {
    // Retorna estatísticas gerais para mostrar impacto na home
    return this.dashboardService.getGeneralStats();
  }

  // --- ROTA PROTEGIDA (Admin Dashboard) ---
  @UseGuards(JwtAuthGuard)
  @Get('admin-summary')
  async getAdminSummary() {
    // Retorna dados formatados para o gráfico
    return this.dashboardService.getDonationsByCategory();
  }
}