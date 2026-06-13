import { IsOptional, IsString, IsBoolean, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { PaginationDto } from '@app/common';
import { ApiProperty } from '@nestjs/swagger';

export class FindAllFacilitiesDto extends PaginationDto {
  @ApiProperty({ required: false, description: 'Search term for name, description or address' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ required: false, description: 'Filter by sport type (e.g. futsal, badminton, basketball)' })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiProperty({ required: false, description: 'Filter by indoor/outdoor' })
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true' || value === 1 || value === '1' || value === true) return true;
    if (value === 'false' || value === 0 || value === '0' || value === false) return false;
    return undefined;
  })
  @IsBoolean()
  isIndoor?: boolean;

  @ApiProperty({ required: false, enum: ['asc', 'desc'], description: 'Sort by price' })
  @IsOptional()
  @IsEnum(['asc', 'desc'])
  sortByPrice?: 'asc' | 'desc';
}
