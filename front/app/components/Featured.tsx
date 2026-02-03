import BookCard from './BookCard';

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
};

async function getFeaturedBooks(): Promise<Book[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/featured`,
    { cache: 'force-cache', next: { revalidate: 60 } },
  );
  if (!res.ok) throw new Error('Failed to fetch featured books');
  return res.json();
}

export default async function Featured() {
  const books = await getFeaturedBooks();
  return (
    <section className="flex flex-col flex-1 px-10 w-full mt-10">
      <h2 className="font-dancing text-3xl font-bold border-b pb-3 border-white/50">
        Featured Books
      </h2>
      <div className="mt-5 mb-20 flex flex-wrap justify-center items-center gap-10">
        {books.map((book) => (
          <BookCard
            key={book.id}
            coverUrl={book.coverUrl}
            author={book.author}
            price={book.price}
            name={book.name}
            id={book.id}
          />
        ))}
      </div>
    </section>
  );
}
