import { IsString, IsEmail, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class CreateStaffDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsString()
  @IsOptional()
  department?: string;

  @IsString()
  @IsOptional()
  salary?: string;

  @IsDateString()
  @IsNotEmpty()
  joinDate: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  emergencyContact?: string;

  @IsString()
  @IsOptional()
  status?: string;
}
