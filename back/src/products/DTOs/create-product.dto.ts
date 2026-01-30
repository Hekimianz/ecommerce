import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Genre } from '../Product.entity';

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

  @IsEnum(Genre)
  @IsNotEmpty()
  genre: Genre;

  @IsString()
  @IsNotEmpty()
  @MinLength(13)
  @MaxLength(13)
  isbn: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Min(1)
  pages: number;

  @IsNotEmpty()
  @IsString()
  sinopsis: string;

  @IsNotEmpty()
  @IsUrl()
  coverUrl: string;
}
