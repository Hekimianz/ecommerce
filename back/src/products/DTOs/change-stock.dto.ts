import { IsEnum, IsNotEmpty, IsString, Min } from 'class-validator';

export enum Operations {
  sub = 'sub',
  add = 'add',
}
export class ChangeStockDTO {
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @Min(0)
  amount: number;

  @IsEnum(Operations)
  operation: Operations;
}
