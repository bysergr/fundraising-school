import Navbar from '@/components/vc_list/navbar';
import Logo from '@/components/ui/logo';
import Profile from '@/components/vc_list/profile';
import { Session, getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth';

export default async function VcListLayout({ children }: { children: React.ReactNode }) {
  const data: Session = (await getServerSession(authOptions)) as Session;

  return (
    <div className="flex h-screen w-full gap-1 overflow-y-hidden bg-gray-100">
      <header className="flex h-screen w-full max-w-64 flex-col justify-between bg-white py-8">
        <div>
          <Logo className="mx-auto mb-6 mt-4 w-3/5" />
          <Navbar />
        </div>
        <Profile data={data} />
      </header>
      <main className="flex w-full flex-col gap-1">{children}</main>
    </div>
  );
}
