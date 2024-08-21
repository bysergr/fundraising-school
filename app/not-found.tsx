import Logo from '@/components/ui/logo-ctw';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="grid h-screen w-full place-content-center gap-y-3 text-center">
      <Logo bgWhite />
      <h2 className="text-3xl font-semibold">Not Found</h2>
      <p>Could not find requested resource</p>
      <Link className="text-blue-500" href="/matchmaking">
        Go to homepage
      </Link>
    </div>
  );
}
