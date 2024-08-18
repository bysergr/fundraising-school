import TitleSection from '@/components/vc_list/title-section';
import by_onde from '@/public/images/ctw/by_onde.svg';
import dynamic from 'next/dynamic';
import FundModal from '@/components/vc_list/fund_modal';
import Image from 'next/image';
import Link from 'next/link';

const DynamicSearchEvents = dynamic(() => import('@/components/search_list/searchEvents'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default async function Page() {
  return (
    <>
      <FundModal />
      <TitleSection
        icon="identification"
        nameSection="Agenda"
        description="Browse all events and create your calendar"
      >
        <div className="block lg:hidden">
          <Link href="https://onde-vamos.com/" target="_blank">
            <Image src={by_onde} alt="by Onde" className="ml-1 mt-2 w-16" />
          </Link>
        </div>
      </TitleSection>
      <div className="size-full p-0">
        <div className="h-screen w-full">
          <DynamicSearchEvents />
        </div>
      </div>
    </>
  );
}
