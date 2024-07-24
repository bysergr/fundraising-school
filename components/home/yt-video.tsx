import { AppLink } from '@/data/enums';

export default function YtVideo() {
  return (
    <section className="relative bg-[#f5f5f5] py-12 text-center md:py-20">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center px-4 sm:px-6">
        <h2 className="h2 mb-2" data-aos="zoom-y-out">
          Wanna be part of something big?
        </h2>
        <p className="pb-12 text-xl text-gray-600 md:pb-16" data-aos="zoom-y-out">
          You will receive personalized advice to learn how to actually get funded.
        </p>
        <div className="relative mb-12 block h-0 w-full pb-9/16 md:mb-16">
          <iframe
            className="absolute left-0 top-0 size-full"
            src="https://www.youtube.com/embed/1R5-cTsDS-8?si=jQ6gCnYLwsX351rK"
            frameBorder={0}
            title="YouTube video player"
            allowFullScreen
          ></iframe>
        </div>
        <a
          className="btn mb-4 w-full rounded-3xl border-fsPurple bg-white px-24 text-fsPurple duration-150 hover:bg-fsPurple hover:text-white focus:bg-darkFsPurple focus:text-white sm:mb-0 sm:w-auto"
          href={AppLink.Varius.JoinLinkAirtable}
          target="_blank"
          rel="noopener"
        >
          Apply
        </a>
      </div>
    </section>
  );
}
