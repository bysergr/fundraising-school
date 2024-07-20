import Navbar from '@/components/vc_list/navbar';
import Logo from '@/components/ui/logo-ctw';
import Profile from '@/components/vc_list/profile';
import { Session, getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth';
import UpdateStartupModal from '@/components/startups_list/update-startup-modal';
import OpenAuthModal from '@/components/auth/open-auth-modal';
import AuthModal from '@/components/auth/auth-modal';

export default async function VcListLayout({ children }: { children: React.ReactNode }) {
  const data: Session | null = await getServerSession(authOptions);

  let userEmail = null;
  if (data && data.user) {
    userEmail = data.user.email as string;
  }

  return (
    <div className="flex h-screen w-full gap-1 overflow-y-hidden bg-gray-100 font-josefin">
      <AuthModal data={data} />
      <header className="flex h-screen w-full max-w-64 flex-col justify-start bg-ctwPurple pb-8">
        <div className="rounded-br-4xl bg-ctwGreen py-9">
          <Logo className="mx-auto mb-6 mt-4 w-85%" />
        </div>
        <Navbar userEmail={userEmail} />
        {data && data.user ? (
          <>
            <UpdateStartupModal />
            <Profile data={data} className="mt-auto" />
          </>
        ) : (
          <OpenAuthModal className="mt-auto" />
        )}
      </header>
      <main className="flex w-full flex-col gap-1 overflow-x-auto">{children}</main>
    </div>
  );
}
