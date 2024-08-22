'use client';

import Image from 'next/image';
import type { LegacyRef } from 'react';
import type { VCProfile } from '@/models/vc_list';
import VCLinks from '@/components/vc_list/table_vc/vc_links';
import CountriesVC from '@/components/vc_list/table_vc/countries-vc';
import FavVC from '@/components/vc_list/table_vc/fav-vc';
import { useAppStore } from '@/providers/app-store-providers';

function InnerRowTableVC({ vc_profile }: { vc_profile: VCProfile }) {
  const { openFundModal: openModal } = useAppStore((state) => state);

  const handleClick = () => {
    openModal(vc_profile.id);
  };

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <article
      className="flex shrink grow flex-col justify-start self-stretch "
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleClick();
      }}
    >
      <div className="flex w-full flex-col">
        <div className="flex w-full flex-col">
          <div className="flex w-full items-start justify-between gap-10">
            <div />
            <div className="flex min-h-[35px] w-[35px] items-end gap-2.5 p-1">
              <FavVC fund_id={vc_profile.id} favorite={vc_profile.favorite} />
            </div>
          </div>
          <div className="flex w-full gap-1.5">
            <div className="flex min-h-[90px] max-w-full items-center justify-center gap-2.5 self-start p-2">
              <Image
                loading="lazy"
                alt={`image of ${vc_profile.name}`}
                src={vc_profile.photo}
                className="size-[110px] cursor-pointer rounded-md bg-white object-contain"
                onClick={handleClick}
                width={90}
                height={90}
              />
            </div>
            <div className="flex h-full flex-1 shrink basis-0 items-center gap-2.5 whitespace-nowrap pt-4 text-black">
              <div className="my-auto flex w-full flex-1 shrink basis-0 flex-col justify-start self-stretch">
                <span className="w-full flex-1 shrink gap-2.5 self-stretch text-base font-semibold">
                  {vc_profile.name}
                </span>
                <VCLinks vc_profile={vc_profile} />
                <div className="mt-2.5 w-full gap-2.5 self-stretch text-sm">
                  <CountriesVC countries={vc_profile.countries} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-full flex-col justify-between px-2 max-lg:space-y-2">
        {/* <p className="mb-4 flex w-fit rounded-full bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800">
          🎯 Excellent Match
        </p> */}

        <div className="mb-4">
          <p className="mb-2 text-sm text-gray-600">Sectors they invest in</p>
          <div className="flex flex-wrap gap-1">
            {vc_profile.sectors.length === 0 ? (
              <span className="pl-4 text-xs text-gray-400">None</span>
            ) : (
              vc_profile.sectors.map((sector) => (
                <span
                  key={sector.id}
                  className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800"
                >
                  {sector.name}
                </span>
              ))
            )}
          </div>
        </div>

        <div className="mb-4">
          <p className="mb-2 text-sm text-gray-600">Checks</p>
          <div className="flex flex-wrap gap-1">
            {vc_profile.check_size.length === 0 ? (
              <span className="pl-4 text-xs text-gray-400">None</span>
            ) : (
              vc_profile.check_size.map((sector, index) => (
                <span key={sector.id} className="rounded-full text-xs font-medium text-black ">
                  {sector.size}
                  {index === vc_profile.check_size.length - 1 ? '' : ' / '}
                </span>
              ))
            )}
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm text-gray-600">Rounds they invest in</p>
          <div className="flex flex-wrap gap-1">
            {vc_profile.rounds.length === 0 ? (
              <span className="pl-4 text-xs text-gray-400">None</span>
            ) : (
              vc_profile.rounds.map((round) => (
                <span
                  key={round.id}
                  className="rounded-full bg-[#EBFFE3] px-2.5 py-0.5 text-xs font-medium text-[#3C0560]"
                >
                  {round.stage}
                </span>
              ))
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function RowTableVC({
  vc_profile,
  refProp,
}: {
  vc_profile: VCProfile;
  refProp?: LegacyRef<HTMLTableRowElement> | undefined;
}) {
  const className =
    'flex flex-col grow shrink basis-1/4 justify-between self-stretch pb-5 w-52 bg-white rounded min-h-[352px] min-w-[240px] shadow-[2px_2px_2px_rgba(0,0,0,0.01)] cursor-pointer';
  if (refProp) {
    return (
      <div ref={refProp} className={className}>
        <InnerRowTableVC vc_profile={vc_profile} />
      </div>
    );
  }

  return (
    <div className={className}>
      <InnerRowTableVC vc_profile={vc_profile} />
    </div>
  );
}
