import { IsNotEmpty, IsString } from 'class-validator';

export class ItemAvailableRequestDto {
  @IsString()
  @IsNotEmpty()
  Brand: string;

  @IsString()
  @IsNotEmpty()
  Type: string;

  @IsString()
  @IsNotEmpty()
  Gender: string;

  @IsString()
  @IsNotEmpty()
  Color: string;

  @IsString()
  @IsNotEmpty()
  Material: string;
}
