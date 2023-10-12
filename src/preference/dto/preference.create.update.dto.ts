import { ArrayMinSize, IsArray } from 'class-validator';

export class PreferenceCreateUpdateDto {
  @IsArray()
  @ArrayMinSize(1)
  brand: string[];

  @IsArray()
  @ArrayMinSize(1)
  color: string[];

  @IsArray()
  @ArrayMinSize(1)
  material: string[];

  @IsArray()
  @ArrayMinSize(1)
  type: string[];

  @IsArray()
  @ArrayMinSize(1)
  size: string[];
}
