import Image from 'next/image';

export default function BookCard() {
  return (
    <div className="flex flex-col w-110 cursor-pointer   ">
      <div className="bg-book self-center w-[70%] flex justify-center rounded-xl py-10 hover:shadow-md shadow-book/40 hover:scale-[1.03] transition-all duration-250">
        <Image
          src={
            'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1394670937i/8433218.jpg'
          }
          alt="cover"
          width={250}
          height={100}
          className="rounded-lg shadow-2xl"
        />
      </div>
    </div>
  );
}
