import { getServerSession, Session } from 'next-auth';
import OpenAuthModal from '../auth/open-auth-modal';
import { authOptions } from '@/utils/auth';

export default async function Hero() {
  const data: Session | null = await getServerSession(authOptions);

  return (
    <section className="relative grid min-h-screen place-content-center bg-white" id="about">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-12 pt-32 md:pb-20 md:pt-40">
          <div className="pb-12 text-center md:pb-16">
            <h1 className="mb-4 text-4xl font-extrabold leading-tighter tracking-tighter md:text-[76px]">
              Matchmaking for <br />
              <span className="text-ctwLightGreen">Startups and Investors</span>
            </h1>
            <div className="mx-auto max-w-3xl">
              <p className="mb-8 text-lg text-gray-600">
                Empower your business growth by connecting with top-tier investors and startups
                during Colombia Tech Week 2024. Our matchmaking platform facilitates meaningful
                connections, unlocking new opportunities for both startups and investors.
              </p>
              <div className="mx-auto max-w-xs sm:max-w-none sm:justify-center">
                <p className="mb-4 w-full text-center text-2xl font-bold sm:w-auto">
                  August 26 to September 03
                </p>
                {data === null && (
                  <OpenAuthModal className="mx-auto w-fit rounded-md bg-ctwLightPurple px-24 py-2 font-semibold text-white " />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
