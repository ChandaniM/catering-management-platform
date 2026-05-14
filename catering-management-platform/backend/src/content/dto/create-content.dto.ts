import { IsString, IsOptional, IsBoolean, IsInt } from 'class-validator';

export class CreateContentDto {
  @IsString()
  pageName: string;

  @IsString()
  section: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  images?: string;

  @IsOptional()
  @IsInt()
  order?: number;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
