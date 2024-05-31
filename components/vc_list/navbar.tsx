import {
  HomeIcon,
  VideoCameraIcon,
  SignalIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="flex flex-col p-4">
      <Link
        href=""
        className="flex h-10 items-center gap-2 rounded-3xl px-6 text-sm text-fsGray hover:bg-lightFsPurple hover:font-bold hover:text-fsPurple"
      >
        <HomeIcon className="size-5" />
        Home
      </Link>
      <Link
        href=""
        className="flex h-10 items-center gap-2 rounded-3xl px-6 text-sm text-fsGray hover:bg-lightFsPurple hover:font-bold hover:text-fsPurple"
      >
        <VideoCameraIcon className="size-5" />
        Course
      </Link>
      <Link
        href=""
        className="flex h-10 items-center gap-2 rounded-3xl px-6 text-sm text-fsGray hover:bg-lightFsPurple hover:font-bold hover:text-fsPurple"
      >
        <SignalIcon className="size-5" />
        Podcast
      </Link>
      <Link
        href=""
        className="flex h-10 items-center gap-2 rounded-3xl px-6 text-sm text-fsGray hover:bg-lightFsPurple hover:font-bold hover:text-fsPurple"
      >
        <ClipboardDocumentListIcon className="size-5" />
        VC List
      </Link>
      <hr className="mt-2" />
    </nav>
  );
};

export default Navbar;
