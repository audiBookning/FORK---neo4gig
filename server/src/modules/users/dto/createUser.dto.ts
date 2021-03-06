import {IsString, IsBoolean, IsEmail, IsOptional} from 'class-validator';

export class CreateUserDto {

    @IsString()
    readonly name: string;

    @IsEmail()
    readonly email: string;

    @IsString()
    readonly city: string;

    @IsString()
    readonly instrument: string;

    @IsBoolean()
    readonly isMusician: boolean;

    @IsString()
    readonly password: string;

    @IsOptional()
    @IsString()
    readonly registerToken: string;

    @IsOptional()
    @IsString()
    readonly status: string;
}
