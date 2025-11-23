import { IsString, IsNotEmpty, IsNumber, Min, IsOptional } from 'class-validator';

export class CreatePixDto {
  @IsString()
  @IsNotEmpty()
  key: string; // A chave PIX (CPF, Email, etc.)

  @IsNumber()
  @Min(0.01)
  value: number; // Valor da doação

  @IsString()
  @IsOptional()
  description?: string; // Ex: "Doação Campanha Inverno"
}