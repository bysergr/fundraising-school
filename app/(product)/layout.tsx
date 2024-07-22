import { type Session, getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth';
import { Content } from '@/components/layout/content';

export default async function VcListLayout({ children }: { children: React.ReactNode }) {
  const data: Session = (await getServerSession(authOptions)) as Session;

  return (
    <Content data={data}>
      {children}
    </Content>
  );
}
