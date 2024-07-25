import DownloadVC from '@/components/vc_list/download-vc';
import FilterBar from '@/components/vc_list/filter-bar';
import SearchInput from '@/components/vc_list/search-input';
import TableVC from '@/components/vc_list/table-vc';
import TitleSection from '@/components/vc_list/title-section';
import by_onde from '@/public/images/ctw/by_onde.svg';

import { Session, getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth';

import FundModal from '@/components/vc_list/fund_modal';
import Image from 'next/image';
import { SearchEvents } from '@/components/search_list/searchEvents';
import Link from 'next/link';

export default async function Page() {
  const data: Session = (await getServerSession(authOptions)) as Session;

  return (
    <>
      <FundModal />
      <TitleSection nameSection="Agenda" description="Browse all events and create your calendar" >
        <div className="block lg:hidden">
          <Link href="https://onde-vamos.com/" target='_blank' className="bg-[red]">
            <Image src={by_onde} alt="by Onde" className="w-16 ml-1 mt-2" />
          </Link>
        </div>
      </TitleSection>
      <div className="size-full p-0">
        <div className="h-screen w-full">
          <SearchEvents serverUrl="" />
        </div>
      </div>
    </>
  );
}
