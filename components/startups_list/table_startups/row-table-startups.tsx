'use client';

import Image from 'next/image';
import { LegacyRef } from 'react';

import { StartupProfile } from '@/models/vc_list';
import { useAppStore } from '@/providers/app-store-providers';
import StartupsLinks from '@/components/startups_list/table_startups/startups-links';
import FavStartup from '@/components/startups_list/table_startups/fav-startup';
import Link from 'next/link';

function InnerRowTableStartups({ startups_profile }: { startups_profile: StartupProfile }) {
  const { openStartupModal: openModal } = useAppStore((state) => state);

  const handleClick = () => {
    openModal(startups_profile.id);
  };

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <span
      className="flex shrink grow flex-col justify-between self-stretch "
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleClick();
      }}
    >
      <div className="flex w-full flex-col">
        <div className="flex w-full flex-col">
          <div className="flex w-full items-start justify-between gap-10">
            {startups_profile.id % 2 ? (
              <div className="rounded-tl-lg bg-[#52EF70] px-2 py-0.5 text-xs font-bold text-[#3C0560]">
                Top 20 Startups
              </div>
            ) : (
              <div />
            )}

            <div className="flex min-h-[35px] w-[35px] items-end gap-2.5 px-1 pb-1 pt-3">
              <FavStartup startup_id={startups_profile.id} favorite={startups_profile.favorite} />
            </div>
          </div>
          <div className="flex w-full gap-1.5">
            <div className="flex min-h-[90px] w-[90px] items-center justify-center gap-2.5 self-start p-2">
              <Image
                loading="lazy"
                alt={startups_profile.name}
                src={
                  startups_profile.photo ? startups_profile.photo : 'https://naurat.com/favicon.svg'
                }
                className=" aspect-square size-[90px]"
                onClick={handleClick}
                width={90}
                height={90}
              />
            </div>
            <div className="flex h-full flex-1 shrink basis-0 items-center gap-2.5 whitespace-nowrap pt-4 text-black">
              <div className="my-auto flex w-full flex-1 shrink basis-0 flex-col justify-start self-stretch">
                <span className="w-full flex-1 shrink gap-2.5 self-stretch text-base font-semibold">
                  {startups_profile?.name || ''}
                </span>
                <StartupsLinks startup_profile={startups_profile} />
                <span className="mt-2.5 w-full gap-2.5 self-stretch text-sm">
                  {startups_profile?.country?.name || ''}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col text-sm font-semibold text-black">
          <div className="flex w-full items-center justify-between whitespace-nowrap">
            <div className="my-auto w-full min-w-[240px] flex-1 shrink gap-2.5 self-stretch px-2.5">
              {startups_profile?.sector?.name || ''}
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4 max-h-16 w-full flex-1 shrink gap-2.5 self-stretch overflow-hidden text-ellipsis whitespace-pre-wrap break-words px-2.5 text-sm text-zinc-500">
        {startups_profile.description
          ? startups_profile.description.length > 120
            ? `${startups_profile.description.substring(0, 115)}...`
            : startups_profile.description
          : 'No description'}
        <br />
      </p>
      <div className="mt-4 flex w-full flex-col">
        <div className="flex w-full items-center justify-between gap-10 px-2.5 text-sm">
          <div className="my-auto gap-2.5 self-stretch py-0.5 text-black">
            {startups_profile.traction ? startups_profile.traction.name : 'None'}
          </div>
          <div className="my-auto gap-2.5 self-stretch rounded-xl bg-lime-50 px-2 py-0.5 font-semibold text-green-900">
            {startups_profile.fund_raised ? startups_profile.fund_raised : 'None'}
          </div>
        </div>
        {startups_profile.website && (
          <Link
            target="_blank"
            rel="noopener"
            href={startups_profile.website}
            className="mt-2.5 gap-2.5 self-start whitespace-nowrap px-2.5 text-center text-xs font-semibold text-zinc-900"
          >
            {startups_profile.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
          </Link>
        )}
      </div>
    </span>
  );
}

export default function RowTableStartups({
  startups_profile,
  refProp,
}: {
  startups_profile: StartupProfile;
  refProp?: LegacyRef<HTMLTableRowElement> | undefined;
}) {
  const className =
    'flex flex-col grow shrink basis-1/4 justify-between self-stretch pb-5 my-auto w-52 bg-white rounded min-h-[352px] min-w-[240px] shadow-[2px_2px_2px_rgba(0,0,0,0.01)] cursor-pointer';
  if (refProp) {
    return (
      <div ref={refProp} className={className}>
        <InnerRowTableStartups startups_profile={startups_profile} />
      </div>
    );
  }

  return (
    <div className={className}>
      <InnerRowTableStartups startups_profile={startups_profile} />
    </div>
  );
}
