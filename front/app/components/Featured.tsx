import BookCard from './BookCard';

export default function Featured() {
  return (
    <section className="flex flex-col flex-1 px-10 w-full mt-10">
      <h2 className="font-dancing text-3xl font-bold border-b pb-3 border-white/50">
        Featured Books
      </h2>
      <div className="mt-5 mb-20 flex flex-wrap justify-center items-center gap-10">
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
      </div>
    </section>
  );
}
