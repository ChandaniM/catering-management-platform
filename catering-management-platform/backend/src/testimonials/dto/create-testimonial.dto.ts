import { IsString, IsOptional, IsBoolean, IsInt, Min, Max } from 'class-validator';

export class CreateTestimonialDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  event?: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
