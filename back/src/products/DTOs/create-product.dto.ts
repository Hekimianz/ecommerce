import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateProductDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(120)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(1000)
  description: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price: number;

  @IsInt()
  @Min(0)
  stock: number;
}
