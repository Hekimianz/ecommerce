import { Button } from '@/components/ui/button';
import Image from 'next/image';

type Book = {
  id: string;
  name: string;
  price: string | number;
  pages: number;
  genre: string;
  coverUrl: string;
  author: string;
  isFeatured: boolean;
  description: string;
  isbn: string;
  sinopsis: string;
  stock: number;
};

async function getBook(id: string): Promise<Book> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
    cache: 'force-cache',
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error('Failed to fetch book');
  return res.json();
}
export default async function Book({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = await getBook(id);
  return (
    <section className="flex flex-col md:flex-row items-center md:items-start md:justify-center gap-8 px-6 md:px-16 py-10">
      <div>
        <Image
          className="rounded-xl"
          src={book.coverUrl}
          width={300}
          height={450}
          alt={book.name}
        />
      </div>
      <div className="flex flex-col items-center md:items-start gap-3 pb-10 text-cemter md:text-left">
        <h1 className="font-bold text-3xl">{book.name}</h1>
        <p className="text-white/70">{book.author}</p>
        <p className="text-xl font-semibold mt-2">${book.price}</p>
        <p className="font-zain mt-6 max-w-xl">{book.sinopsis}</p>
        {book.stock > 0 ? (
          <Button className="font-bold text-2xl py-7 px-10 mt-8 mb-10 cursor-pointer">
            Add to cart
          </Button>
        ) : (
          <Button
            className="font-bold text-2xl py-7 px-10 mt-8 mb-10 "
            disabled={true}
          >
            Out of stock
          </Button>
        )}
        <p className="text-white/30 font-bold font-zain">ISBN: {book.isbn}</p>
        <p className="text-white/30 font-bold font-zain">Stock: {book.stock}</p>
      </div>
    </section>
  );
}
