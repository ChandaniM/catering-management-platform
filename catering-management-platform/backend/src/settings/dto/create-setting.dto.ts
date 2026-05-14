import { IsString, IsOptional } from 'class-validator';

export class CreateSettingDto {
  @IsString()
  key: string;

  @IsString()
  value: string;

  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  description?: string;
}
