import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsString()
  features: string;

  @IsOptional()
  @IsString()
  capacity?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
