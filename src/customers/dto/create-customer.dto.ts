// create-customer.dto.ts

import { IsNotEmpty, IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsPhoneNumber('GH')
  readonly phone: string;

  @IsNotEmpty()
  @IsString()
  readonly address: string;
}
