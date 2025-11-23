import { IsString, IsNumber, Min, IsOptional } from 'class-validator';

export class UpdateNeedDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(1)
  @IsOptional()
  goal?: number;
}