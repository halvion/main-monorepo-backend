import { IsUUID, IsNotEmpty, IsDateString, IsString, IsNumber, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class BookingItemDto {
  @IsNotEmpty()
  @IsUUID()
  facilityId: string;

  @IsNotEmpty()
  @IsDateString()
  slotDate: string;

  @IsNotEmpty()
  @IsString()
  startTime: string;

  @IsNotEmpty()
  @IsString()
  endTime: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}

export class CreateBookingDto {
  @IsNotEmpty()
  @IsNumber()
  totalAmount: number;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BookingItemDto)
  items: BookingItemDto[];
}
