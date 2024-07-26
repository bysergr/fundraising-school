import TitleSection from '@/components/vc_list/title-section';
import by_onde from '@/public/images/ctw/by_onde.svg';
import dynamic from 'next/dynamic';
import { Session, getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth';
import FundModal from '@/components/vc_list/fund_modal';
import Image from 'next/image';
import Link from 'next/link';

const DynamicSearchEvents = dynamic(() => import('@/components/search_list/searchEvents'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default async function Page() {
  const data: Session = (await getServerSession(authOptions)) as Session;

  return (
    <>
      <FundModal />
      <TitleSection nameSection="Agenda" description="Browse all events and create your calendar">
        <div className="block lg:hidden">
          <Link href="https://onde-vamos.com/" target="_blank" className="bg-[red]">
            <Image src={by_onde} alt="by Onde" className="ml-1 mt-2 w-16" />
          </Link>
        </div>
      </TitleSection>
      <div className="size-full p-0">
        <div className="h-screen w-full">
          <DynamicSearchEvents serverUrl="" />
        </div>
      </div>
    </>
  );
}