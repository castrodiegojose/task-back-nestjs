import { IsString, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';

export class CreatTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsOptional()
  description?: string;
  @IsBoolean()
  @IsOptional()
  done?: boolean;
}
