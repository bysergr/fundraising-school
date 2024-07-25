import DownloadVC from '@/components/vc_list/download-vc';
import FilterBar from '@/components/vc_list/filter-bar';
import SearchInput from '@/components/vc_list/search-input';
import TableVC from '@/components/vc_list/table-vc';
import TitleSection from '@/components/vc_list/title-section';
import by_onde from '@/public/images/events/by_onde.png';

import { Session, getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth';

import FundModal from '@/components/vc_list/fund_modal';
import Image from 'next/image';
import { SearchEvents } from '@/components/search_list/searchEvents';

export default async function Page() {
  const data: Session = (await getServerSession(authOptions)) as Session;

  return (
    <>
      <FundModal />
      <TitleSection nameSection="EVENTS AGENDA" description="Explore all of the events and create your calendar" >
        <Image src={by_onde} alt="by Onde" className=" w-20 ml-1" />
      </TitleSection>
      <div className="size-full p-0">
        <div className="h-screen w-full">
          <SearchEvents serverUrl="" />
        </div>
      </div>
    </>
  );
}
