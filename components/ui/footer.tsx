import Link from 'next/link';
import Logo from './logo';
import { AppLink } from '@/data/enums';

export default function Footer() {
  return (
    <footer className=" bg-[#f5f5f5]">
      <div className="mx-auto flex min-h-24 w-full max-w-6xl flex-col justify-between px-4 py-6 sm:flex-row sm:items-center sm:px-6">
        <div className="w-[84px]">
          <Logo />
        </div>
        <Link className="mx-6 my-5" href={'/data_sharing'}>
          All rights reserved Fundraising School l Designed and built with love - Copyright© 2024
        </Link>
        <a
          className="btn mb-4 rounded-xl border border-fsPurple bg-white text-fsPurple duration-150 hover:bg-fsPurple hover:text-white sm:mb-0 sm:w-36"
          href={AppLink.Varius.JoinLinkAirtable}
          target="_blank"
          rel="noopener"
        >
          Apply
        </a>
      </div>
    </footer>
  );
}
