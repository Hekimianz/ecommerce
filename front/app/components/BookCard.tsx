import Image from 'next/image';
import Link from 'next/link';

export default function BookCard({
  coverUrl,
  name,
  author,
  price,
  id,
}: {
  coverUrl: string;
  name: string;
  author: string;
  price: number | string;
  id: string;
}) {
  return (
    <Link href={`/books/${id}`} className="block">
      <div className="flex flex-col w-110 cursor-pointer   ">
        <div className="bg-[#899BA3] self-center w-[70%] flex flex-col justify-center items-center rounded-xl pt-10 pb-5 hover:shadow-lg shadow-[#899BA3]/40 hover:scale-[1.03] transition-all duration-250">
          <Image
            src={coverUrl}
            alt="cover"
            width={250}
            height={100}
            className="rounded-lg shadow-2xl"
          />
          <h3 className="text-center font-zain text-xl w-[80%] font-bold text-[#101d23] mt-5">
            {name}
          </h3>
          <h4 className="text-center font-zain text-lg w-[80%] font-[500] text-[#101d23] mt-1">
            {author}
          </h4>
          <span className="text-[#101d23] text-md mt-0">${price}</span>
        </div>
      </div>
    </Link>
  );
}
