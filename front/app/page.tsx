import { Button } from '@/components/ui/button';
import Featured from './components/Featured';

export default function Home() {
  return (
    <main className="flex flex-col flex-1 min-h-screen items-center">
      <div className="flex flex-col w-[90%]  h-125 bg-[linear-gradient(to_top,rgba(16,29,34,1)_0%,rgba(16,29,34,0.4)_50%,rgba(0,0,0,0.1)_100%),url('/shelf.png')] bg-cover bg-no-repeat bg-center text-center rounded-xl justify-end gap-10 shadow-2xl">
        <h1 className="text-5xl font-bold">
          Your next favorite story is{' '}
          <span className="font-dancing">waiting.</span>
        </h1>
        <span className="w-[90%] text-lg self-center">
          Discover a curated section of classics and contemporary masterpieces
          for the modern reader.
        </span>
        <Button className="mb-5 w-[90%] font-zain font-bold text-xl cursor-pointer self-center py-7">
          Browse Collection
        </Button>
      </div>
      <Featured />
    </main>
  );
}
