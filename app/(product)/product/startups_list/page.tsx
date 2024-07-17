import DownloadStartups from '@/components/startups_list/download-startups';
import FilterBar from '@/components/startups_list/filter-bar';
import SearchInput from '@/components/vc_list/search-input';
import TableVC from '@/components/vc_list/table-vc';
import TitleSection from '@/components/vc_list/title-section';

import { Session, getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth';

import FundModal from '@/components/vc_list/fund_modal';

export default async function Page() {
  const data: Session = (await getServerSession(authOptions)) as Session;

  return (
    <>
      <FundModal />
      <TitleSection nameSection="Startups List" description="Browse all Startups" />
      <div className="size-full bg-white px-7">
        <div className="flex items-end justify-between pt-4">
          <SearchInput />
          <DownloadStartups />
        </div>
        <FilterBar />
        <TableVC email_linkedin={data.user?.email as string} />
      </div>
    </>
  );
}
