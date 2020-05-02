import { IsDateString, IsString } from 'class-validator';

export class CreateEventNeoDto {
  @IsString()
  readonly city: string;

  @IsDateString()
  readonly dateAndTime: string;
}
