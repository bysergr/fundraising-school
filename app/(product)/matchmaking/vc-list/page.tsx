import DownloadVC from '@/components/vc_list/download-vc';
import FilterBar from '@/components/vc_list/filter-bar';
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
      <TitleSection icon="identification" nameSection="VC List" description="Browse all funds" />
      <div className="size-full px-2 lg:px-7">
        {/* <div className="flex flex-row flex-wrap lg:mt-5">
          <div className="basis-full px-2 lg:basis-1/3">
            <SearchInput searchType="Startup" />
          </div>
          <div className="flex basis-full items-end justify-between overflow-x-auto px-2 lg:basis-2/3">
            <FilterBar />
            <DownloadVC />
          </div>
        </div> */}
        <TableVC email_linkedin={data.user?.email as string} />
      </div>
    </>
  );
}
