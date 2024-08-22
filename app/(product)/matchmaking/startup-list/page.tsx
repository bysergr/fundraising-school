import TableStartups from '@/components/startups_list/table-startups';
import TitleSection from '@/components/vc_list/title-section';

import { type Session, getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth';

import StartupsModal from '@/components/startups_list/startups-modal';
import SearchInput from '@/components/vc_list/search-input';
import FilterBar from '@/components/startups_list/filter-bar';
import DownloadStartups from '@/components/startups_list/download-startups';
import Image from 'next/image';
import Link from 'next/link';
import by_onde from '@/public/images/ctw/by_onde.svg';
import DownloadAllStartUps from '@/components/startups_list/download-all-startups';

export default async function Page() {
  const data: Session = (await getServerSession(authOptions)) as Session;

  return (
    <>
      <StartupsModal />
      <TitleSection
        icon="presentation"
        nameSection="Startups List"
        description="Browse all Startups"
      >
        <div className="block lg:hidden">
          <Link href="https://onde-vamos.com/" target="_blank">
            <Image src={by_onde} alt="by Onde" className="ml-1 mt-2 w-16" />
          </Link>
        </div>
      </TitleSection>
      <div className="size-full px-2 lg:px-7">
        <div className="flex flex-row flex-wrap lg:mt-5">
          <div className="basis-full px-2 lg:basis-1/2">
            <SearchInput searchType="Startup" />
          </div>
          <div className="flex basis-full items-end justify-between overflow-x-auto px-2 lg:basis-1/2">
            <FilterBar />
            <div className="flex gap-0.5">
              <DownloadStartups />
              <DownloadAllStartUps />
            </div>
          </div>
        </div>
        <TableStartups email_linkedin={data.user?.email as string} />
      </div>
    </>
  );
}
