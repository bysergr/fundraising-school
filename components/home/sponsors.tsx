import Image from 'next/image';
import { Startups } from '@/data/assets';

export default function Sponsors() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-12 md:pb-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-16">
            {/* <h2 className="h2 mb-4">TTrusted by these partners, our community benefit from more than $50k in deals from the generous companies that support our community</h2> */}
            <p className="text-xl font-semibold " data-aos="zoom-y-out">
              Our community benefits from over $50k in exclusive deals from these trusted partners:
            </p>
          </div>

          {/* Items */}
          <div className="mx-auto grid max-w-4xl grid-cols-4 gap-2 [&>div>img]:grayscale">
            {/* Item OnTop */}
            <div
              data-aos="zoom-y-out"
              className="col-span-2 flex items-center justify-center py-2 md:col-auto"
            >
              <Image
                src={Startups.onTop}
                alt="Logo of OnTop"
                width={120}
                height={140}
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>

            {/* Item Mention */}
            <div
              data-aos="zoom-y-out"
              className="col-span-2 flex items-center justify-center py-2 md:col-auto"
            >
              <Image
                src={Startups.mention}
                alt="Logo of Mention"
                width={120}
                height={140}
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>

            {/* Item Faktory */}
            <div
              data-aos="zoom-y-out"
              className="col-span-2 flex items-center justify-center py-2 md:col-auto"
            >
              <Image
                src={Startups.faktory}
                alt="Logo of Faktory"
                width={120}
                height={140}
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>

            {/* Item Truora */}
            <div
              data-aos="zoom-y-out"
              className="col-span-2 flex items-center justify-center py-2 md:col-auto"
            >
              <Image
                src={Startups.truora}
                alt="Logo of Truora"
                width={120}
                height={140}
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
