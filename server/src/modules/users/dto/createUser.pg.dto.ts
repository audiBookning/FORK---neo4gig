import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserPgDto {
  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsOptional()
  @IsString()
  readonly registerToken: string;

  @IsOptional()
  @IsString()
  readonly status: string;
}
