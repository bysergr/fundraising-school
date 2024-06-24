import { Session, getServerSession } from 'next-auth';

import { authOptions } from '@/utils/auth';
import RoundForm from '@/components/auth/round-form';
import AuthProfile from '@/components/auth/auth-profile';

export default async function Page() {
  const data = (await getServerSession(authOptions)) as Session;

  return (
    <div className="flex h-full flex-col items-center justify-around px-8 py-6 lg:p-0">
      <AuthProfile data={data} />
      <RoundForm data={data} />
    </div>
  );
}
