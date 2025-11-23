import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateNeedDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(1)
  goal: number;
}