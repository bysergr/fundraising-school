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
      <div className="h-[calc(100%-108px)] w-full bg-white px-7">
        <div className="flex items-end justify-between pt-4">
          <SearchInput searchType="Startup" />
          <DownloadStartups />
        </div>
        <FilterBar />
        <TableStartups email_linkedin={data.user?.email as string} />
      </div>
    </>
  );
}
