import { AppLink } from '@/data/enums';

export default function Hero() {
  return (
    <section className="relative" id="about">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-12 pt-32 md:pb-20 md:pt-40">
          <div className="pb-12 text-center md:pb-16">
            <h1
              className="mb-4 text-4xl font-extrabold leading-tighter tracking-tighter sm:text-5xl md:text-6xl"
              data-aos="zoom-y-out"
            >
              For entrepreneurs by <br />
              <span className="bg-gradient-to-r from-fsPurple to-fsPink bg-clip-text text-transparent">
                entrepreneurs
              </span>
            </h1>
            <div className="mx-auto max-w-3xl">
              <p className="mb-8 text-xl text-gray-600" data-aos="zoom-y-out" data-aos-delay="150">
                Master the art of fundraising with top 1% speakers in a 6-week program. Connect with
                fellow visionaries, and redefine what’s possible for your business.
              </p>
              <div
                className="mx-auto max-w-xs sm:max-w-none sm:justify-center"
                data-aos="zoom-y-out"
                data-aos-delay="300"
              >
                <p className="w-full text-center text-3xl font-bold sm:w-auto">
                  April 25th - May 31st
                </p>
                <p className="my-2 w-full text-center text-3xl font-bold text-darkFsPink sm:w-auto">
                  100% Free
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
