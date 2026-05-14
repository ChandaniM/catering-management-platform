import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateGalleryDto {
  @IsString()
  url: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
