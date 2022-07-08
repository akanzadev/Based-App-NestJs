import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  IsPhoneNumber,
  IsOptional,
} from 'class-validator';
import { PartialType, ApiProperty, OmitType } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'The email of User', default: 'test@gmail.com' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of User', default: 'Jeancarlo Willy' })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of User', default: 'Mamani Lingan' })
  readonly lastname: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('PE')
  @ApiProperty({ description: 'The phone of User', default: '+51 946242945' })
  readonly phone: string;

  // @IsString()
  // @IsNotEmpty()
  @IsOptional()
  // @IsUrl()
  @ApiProperty({
    description: 'The Image of User',
    default:
      'https://www.google.com/img/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
  })
  readonly image: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  @ApiProperty({
    description: 'The password of User',
    default: 'contraseña segura',
  })
  readonly password: string;
}

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['password']),
) {}

export class CreateUserWithImageDto {
  @IsString()
  readonly user: string;
}
