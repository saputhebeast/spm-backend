import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  Min,
} from 'class-validator';

export class SubscriptionBoxCreateDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  @Min(1, { each: true })
  items: number[];

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  customerId: number;
}
