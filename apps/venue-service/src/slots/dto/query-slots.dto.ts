import { IsUUID, IsNotEmpty, IsDateString } from 'class-validator';

export class QuerySlotsDto {
  @IsNotEmpty()
  @IsUUID()
  facilityId: string;

  @IsNotEmpty()
  @IsDateString()
  date: string;
}
