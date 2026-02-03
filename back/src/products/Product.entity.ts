import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Genre {
  FICTION = 'fiction',
  NONFICTION = 'non_fiction',
  FANTASY = 'fantasy',
  SCIENCEFICTION = 'science_fiction',
  HORROR = 'horror',
  MYSTERY = 'mystery',
  THRILLER = 'thriller',
  ROMANCE = 'romance',
  HISTORICAL = 'historical',
  PHILOSOPHY = 'philosophy',
  PSYCHOLOGY = 'psychology',
  BIOGRAPHY = 'biography',
  POETRY = 'poetry',
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: Genre })
  genre: Genre;

  @Column({ type: 'text' })
  isbn: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column()
  pages: number;

  @Column()
  sinopsis: string;

  @Column()
  coverUrl: string;

  @Column()
  author: string;

  @Column()
  isFeatured: boolean;
}
