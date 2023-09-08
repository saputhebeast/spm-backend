import { IsNotEmpty, IsString } from 'class-validator';

export class ShippingDetailsCreateDto {
  @IsString()
  @IsNotEmpty()
  lane1: string;

  @IsString()
  @IsNotEmpty()
  lane2: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  postalCode: string;
}
