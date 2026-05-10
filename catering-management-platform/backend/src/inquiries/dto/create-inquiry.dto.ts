import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateInquiryDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  eventType: string;

  @IsOptional()
  @IsString()
  eventDate?: string;

  @IsOptional()
  @IsString()
  guestCount?: string;

  @IsOptional()
  @IsString()
  message?: string;
}
