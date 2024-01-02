import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-black-ravn relative h-[5vh]">
      <div className="absolute left-0 flex items-center h-full px-4 lg:hidden">
        <Link href="/">
          <ArrowLeft className="w-6 h-6 text-white" />
        </Link>
      </div>

      <div className="flex items-center justify-center w-full h-full mx-auto lg:justify-start px-9">
        <Link href="/">
          <h2 className="hidden text-lg text-white lg:block">
            Ravn Star Wars Registry
          </h2>
          <h2 className="text-lg text-white lg:hidden">People</h2>
        </Link>
      </div>
    </header>
  );
};
