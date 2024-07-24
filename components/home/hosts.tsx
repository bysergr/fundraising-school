import Image from 'next/image';
import { Startups, Profiles } from '@/data/assets';

export default function Hosts() {
  return (
    <section className="relative bg-[#f5f5f5] px-4 pb-12 text-center sm:px-6 md:pb-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="h2 pb-12 md:pb-16" data-aos="zoom-y-out">
          Hosts And Coaches
        </h2>
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2">
          <article
            className="mx-auto flex max-w-[280px] flex-col items-center justify-center sm:items-start sm:justify-normal md:max-w-[400px] md:flex-row"
            data-aos="zoom-y-out"
          >
            <Image
              src={Profiles.laura_gaviria_profile}
              alt={`Picture of Laura Gaviria Halaby`}
              className="sm:-translate-y-5"
              width={180}
              height={180}
              style={{ aspectRatio: 1, display: 'block', width: 180, height: 180 }}
            />
            <div className="flex h-auto max-w-[280px] flex-col text-left md:max-w-[400px]">
              <h3 className="text-center  font-semibold sm:text-left sm:text-lg">
                Laura Gaviria Halaby
              </h3>
              <ul className="list-outside list-disc font-light marker:text-gray-400 [&>li]:my-1 [&>li]:max-w-[220px] [&>li]:translate-x-4 [&>li]:md:max-w-[400px]">
                <li>Faktory AI</li>
                <li>Ex-SoftBank Latam</li>
                <li>
                  Founder of SoftBank
                  <br />
                  AI Academy and <br />
                  Operator School
                </li>
                <div className="my-4 flex translate-x-4 flex-wrap gap-2">
                  <Image
                    src={Startups.faktory}
                    alt="image of Faktory AI"
                    width={80}
                    height={25}
                    style={{ width: 'auto', height: 'auto' }}
                  />
                  <Image
                    src={Startups.softbank}
                    alt="image of Ex-SoftBank"
                    width={110}
                    height={25}
                    style={{ width: 'auto', height: 'auto' }}
                  />
                </div>
              </ul>
            </div>
          </article>

          <article
            className="mx-auto flex max-w-[280px] flex-col items-center justify-center sm:items-start sm:justify-normal md:max-w-[400px] md:flex-row"
            data-aos="zoom-y-out"
          >
            <Image
              src={Profiles.andres_bilbao_profile}
              alt={`Picture of Andres Bilbao`}
              className="sm:-translate-y-5"
              width={180}
              height={180}
              style={{ aspectRatio: 1, display: 'block', width: 180, height: 180 }}
            />
            <div className="flex h-auto max-w-[280px] flex-col text-left md:max-w-[400px]">
              <h3 className="text-center font-semibold sm:text-left sm:text-lg">Andrés Bilbao</h3>
              <ul className="list-outside list-disc font-light marker:text-gray-400 [&>li]:my-1 [&>li]:max-w-[220px] [&>li]:translate-x-4 [&>li]:md:max-w-[400px]">
                <li className="text-pretty">
                  Co-founder
                  <div className="my-4 flex gap-2">
                    <Image
                      src={Startups.makers}
                      alt="image of Makers"
                      width={35}
                      height={35}
                      style={{ width: 'auto', height: 'auto' }}
                    />
                    <Image
                      src={Startups.rappi}
                      alt="image of Rappi"
                      width={80}
                      height={35}
                      style={{ width: 'auto', height: 'auto' }}
                    />
                  </div>
                </li>
                <li>Helped start and fundraise 17 startups in LATAM.</li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
