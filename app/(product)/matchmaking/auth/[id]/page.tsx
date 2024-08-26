import LinkedInSignInFund from '@/components/auth/linkedin-sign-in-fund';
import Logo from '@/components/ui/logo-ctw';
import { authOptions } from '@/utils/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getServerSession(authOptions);

  if (data) {
    redirect('/matchmaking/');
  }

  const checkResponse = await fetch(
    `${process.env.BACKEND_GATEWAY_URL}/user/register/${params.id}`,
    {
      method: 'GET',
    },
  );

  if (!checkResponse.ok) {
    redirect('/matchmaking/');
  }

  try {
    const checkData = await checkResponse.json();

    if (checkData?.detail === 'Partner not found') {
      redirect('/matchmaking/');
    }
  } catch (e) {
    redirect('/matchmaking/');
  }

  return (
    <>
      <div className="flex size-full flex-col justify-around px-8 py-6 lg:p-0">
        <div className="flex flex-col items-center justify-between gap-12 ">
          <div className="block w-56 md:w-72 lg:hidden">
            <Logo bgWhite />
          </div>
          <h3 className="h3 mb-4 mt-8 max-w-xs text-center text-neutral-900">
            Visualize the most promising startups
            <span className="mt-3 block text-sm font-normal text-neutral-500 sm:mt-4 sm:text-base lg:hidden">
              Sign up now
            </span>
          </h3>

          <LinkedInSignInFund identifier={params.id} className="hidden lg:flex" />
          <LinkedInSignInFund identifier={params.id} className="mx-auto lg:hidden" />
        </div>
      </div>
    </>
  );
}
