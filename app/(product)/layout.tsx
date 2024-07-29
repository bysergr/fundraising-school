import { type Session, getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth';
import { Content } from '@/components/layout/content';

export default async function VcListLayout({ children }: { children: React.ReactNode }) {
  const data: Session | null = await getServerSession(authOptions);

  let userEmail = null;
  if (data && data.user) {
    userEmail = data.user.email as string;
  }

  return (
    <Content data={data}>
      {children}
    </Content>
  );
}
