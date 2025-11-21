import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePixDto } from './dto/create-pix.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('payment') // Rota base: /api/payment
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(JwtAuthGuard) // Apenas Admin logado pode gerar
  @Post('pix')
  generatePix(@Body() createPixDto: CreatePixDto) {
    return this.paymentService.generatePix(createPixDto);
  }
}