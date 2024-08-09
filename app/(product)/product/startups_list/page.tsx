import DownloadStartups from '@/components/startups_list/download-startups';
import FilterBar from '@/components/startups_list/filter-bar';
import SearchInput from '@/components/vc_list/search-input';
import TableStartups from '@/components/startups_list/table-startups';
import TitleSection from '@/components/vc_list/title-section';

import { Session, getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth';

import StartupsModal from '@/components/startups_list/startups-modal';

export default async function Page() {
  const data: Session = (await getServerSession(authOptions)) as Session;

  return (
    <>
      <StartupsModal />
      <TitleSection
        icon="presentation"
        nameSection="Startups List"
        description="Browse all Startups"
      />
      <div className="size-full px-2 lg:px-7">
        <div className="flex flex-row flex-wrap lg:mt-5">
          <div className="basis-full px-2 lg:basis-1/2">
            <SearchInput searchType="Startup" />
          </div>
          <div className="flex basis-full items-end justify-between overflow-x-auto px-2 lg:basis-1/2">
            <FilterBar />
            <DownloadStartups />
          </div>
        </div>
        <TableStartups email_linkedin={data.user?.email as string} />
      </div>
    </>
  );
}
