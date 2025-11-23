import { IsEnum, IsNotEmpty } from 'class-validator';
import { DonationStatus } from '../entities/donation.entity';

export class UpdateDonationStatusDto {
  @IsEnum(DonationStatus)
  @IsNotEmpty()
  status: DonationStatus;
}