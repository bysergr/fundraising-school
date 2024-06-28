import { AppLink } from '@/data/enums';

export default function Hero() {
  return (
    <section className="relative bg-white" id="about">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-12 pt-32 md:pb-20 md:pt-40">
          <div className="pb-12 text-center md:pb-16">
            <h1 className="mb-4 text-4xl font-extrabold leading-tighter tracking-tighter md:text-[76px]">
              Matchmaking for <br />
              <span className="bg-gradient-to-r from-fsPurple to-fsPink bg-clip-text text-transparent">
                Startups and Investors
              </span>
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
                <a
                  className="btn mb-4 w-full rounded-3xl border-fsPurple bg-white px-14 font-serif text-fsPurple duration-150 hover:bg-fsPurple hover:text-white focus:bg-darkFsPurple focus:text-white sm:mb-0 sm:w-auto"
                  href={AppLink.Varius.JoinLinkAirtable}
                  target="_blank"
                  rel="noopener"
                >
                  Apply
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
