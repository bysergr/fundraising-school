import Navbar from '@/components/vc_list/navbar';
import Logo from '@/components/ui/logo-ctw';
import Profile from '@/components/vc_list/profile';
import { Session, getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth';
import UpdateStartupModal from '@/components/startups_list/update-startup-modal';

export default async function VcListLayout({ children }: { children: React.ReactNode }) {
  const data: Session = (await getServerSession(authOptions)) as Session;

  return (
    <div className="flex h-screen w-full gap-1 overflow-y-hidden bg-gray-100 font-josefin">
      <UpdateStartupModal />
      <header className="bg-ctwPurple flex h-screen w-full max-w-64 flex-col justify-start pb-8">
        <div className="bg-ctwGreen rounded-br-4xl py-9">
          <Logo className="w-85% mx-auto mb-6 mt-4" />
        </div>
        <Navbar userEmail={data.user?.email as string} />
        <Profile data={data} className="mt-auto" />
      </header>
      <main className="flex w-full flex-col gap-1">{children}</main>
    </div>
  );
}
