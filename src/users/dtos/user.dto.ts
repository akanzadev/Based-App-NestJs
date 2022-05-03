import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  IsPhoneNumber,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'The email of User', default: 'test@gmail.com' })
  readonly email: string;

  @IsString()
  @ApiProperty({ description: 'The name of User', default: 'Jeancarlo Willy' })
  readonly name: string;

  @IsString()
  @ApiProperty({ description: 'The name of User', default: 'Mamani Lingan' })
  readonly lastname: string;

  @IsString()
  @IsPhoneNumber('PE')
  @ApiProperty({ description: 'The phone of User', default: '+51 946242945' })
  readonly phone: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  @ApiProperty({
    description: 'The password of User',
    default: 'contraseñasegura',
  })
  readonly password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
