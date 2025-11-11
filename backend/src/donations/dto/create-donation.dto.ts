import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDonationDto {
  @IsString()
  @IsNotEmpty()
  description: string; // "5kg de arroz"

  @IsInt() // Garante que é um número inteiro
  categoryId: number;

  @IsInt()
  @IsOptional() // Opcional, pois uma doação pode não ser para uma 'Need' específica
  needId?: number;
}