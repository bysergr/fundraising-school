import { getServerSession, Session } from 'next-auth';
import OpenAuthModal from '../auth/open-auth-modal';
import { authOptions } from '@/utils/auth';
import {
  CalendarDaysIcon,
  RocketLaunchIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

export default async function Hero() {
  const data: Session | null = await getServerSession(authOptions);

  return (
    <section className="relative grid min-h-screen place-content-center bg-white" id="about">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-12 pt-12 md:pb-20 md:pt-40">
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
                {data === null && (
                  <OpenAuthModal className="mx-auto w-fit rounded-md bg-ctwLightPurple px-24 py-2 font-semibold text-white" />
                )}
              </div>
              <div className="mt-16">
                <h4 className="text-2xl font-bold ">Features</h4>
                <ul className="mx-auto mt-10 flex w-full max-w-40 flex-col flex-wrap justify-between gap-y-6 sm:max-w-none sm:flex-row">
                  <li className="w-full max-w-40">
                    <CalendarDaysIcon className="mx-auto mb-2 size-10 text-ctwLightGreen" />
                    <h5 className="my-2 font-semibold">Agenda</h5>
                    <p className="text-sm text-gray-700">
                      Create your own schedule and plan your time in CTW.
                    </p>
                  </li>
                  <li className="w-full max-w-40">
                    <RocketLaunchIcon className="mx-auto mb-2 size-10 text-ctwLightGreen" />
                    <h5 className="my-2 font-semibold">Courses</h5>
                    <p className="text-sm text-gray-700">
                      Learn how to raise capital like the top 1% with a course created by the best.
                    </p>
                  </li>
                  <li className="w-full max-w-40">
                    <CurrencyDollarIcon className="mx-auto mb-2 size-10 text-ctwLightGreen" />
                    <h5 className="my-2 font-semibold">MatchMaking</h5>
                    <p className="text-sm text-gray-700">
                      Potentially connect with over 150 VCs in just one week and in one place.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
