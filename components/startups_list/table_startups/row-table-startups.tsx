'use client';

import Image from 'next/image';
import { LegacyRef } from 'react';
import { StartupProfile } from '@/models/vc_list';
import { useAppStore } from '@/providers/app-store-providers';
import StartupsLinks from '@/components/startups_list/table_startups/startups-links';
import FavStartup from '@/components/startups_list/table_startups/fav-startup';
import Link from 'next/link';
import logo from '@/public/images/ctw/logo.svg';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';

const RelevanceBadge = ({ score }: { score: number }) => {
  let color, text, emoji;
  if (score >= 90) {
    color = 'bg-green-100 text-green-800';
    text = 'Excellent Match';
    emoji = '🎯';
  } else if (score >= 85) {
    color = 'bg-yellow-100 text-yellow-800';
    text = 'Good Fit';
    emoji = '👍';
  } else if (score >= 65) {
    color = 'bg-orange-100 text-orange-800';
    text = 'Somewhat Relevant';
    emoji = '🤔';
  } else {
    color = 'bg-red-100 text-red-800';
    text = 'Less Relevant';
    emoji = '🔍';
  }

  return (
    <Badge className={`${color} px-2 py-1 text-sm font-medium`}>
      {emoji} {text}
    </Badge>
  );
};

function InnerRowTableStartups({
  startups_profile,
  updateFavoritesStartup,
}: {
  startups_profile: StartupProfile;
  updateFavoritesStartup: () => void;
}) {
  const { openStartupModalWithValue: openModal } = useAppStore((state) => state);

  const handleClick = () => {
    openModal(startups_profile);
  };

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <span
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleClick();
      }}
      className="flex shrink grow flex-col justify-between self-stretch"
    >
      <div className="flex w-full flex-col">
        <div className="flex w-full flex-col">
          <div className="flex w-full items-start justify-between gap-10">
            {startups_profile.id === 4 ? (
              <div className="rounded-tl-lg bg-[#52EF70] px-2 py-0.5 text-xs font-bold text-[#3C0560]">
                Builders
              </div>
            ) : (
              <div className=""></div>
            )}
            {/* {false && (
              <div className="rounded-tl-lg bg-[#52EF70] px-2 py-0.5 text-xs font-bold text-[#3C0560]">
                Top 20 Startups
              </div>
            )} */}

            <div className="flex min-h-[35px] w-[35px] items-end gap-2.5 px-1 pb-1 pt-3">
              <FavStartup
                updateFavoritesStartup={updateFavoritesStartup}
                startup_id={startups_profile.id}
                favorite={startups_profile.favorite}
              />
            </div>
          </div>
          <div className="flex w-full gap-1.5">
            <div className="flex items-center justify-center gap-2.5 self-start p-2">
              <Image
                unoptimized
                loading="lazy"
                alt={startups_profile.name}
                src={startups_profile.photo ? startups_profile.photo : logo}
                className="aspect-square rounded-md object-contain"
                onClick={handleClick}
                width={100}
                height={100}
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
        {startups_profile.one_sentence_description
          ? startups_profile.one_sentence_description
          : startups_profile.description
            ? startups_profile.description.length > 120
              ? `${startups_profile.description.substring(0, 115)}...`
              : startups_profile.description
            : 'No description'}

        <br />
      </p>

      {startups_profile?.recommendation && (
        <>
          <Popover
            trigger={
              <PopoverTrigger>
                <p className="my-2 flex w-fit rounded-full px-2.5 py-0.5 text-sm font-medium ">
                  <RelevanceBadge
                    score={startups_profile?.recommendation.data.alignment_score * 100}
                  />
                </p>
              </PopoverTrigger>
            }
            content={
              <PopoverContent>
                <p className="text-xs">{startups_profile.recommendation.data.justification}</p>
              </PopoverContent>
            }
            className="border-gray-300 bg-gray-100"
          />
        </>
      )}
      <div className="mt-4 flex w-full flex-col">
        <div className="flex w-full items-center justify-between gap-10 px-2.5 text-sm">
          <div className="my-auto gap-2.5 self-stretch py-0.5 text-black">
            {startups_profile.traction ? startups_profile.traction.name : 'None'}
          </div>
          <div className="my-auto gap-2.5 self-stretch rounded-xl bg-lime-50 px-2 py-0.5 font-semibold text-green-900">
            {startups_profile.round ? startups_profile.round.stage : 'None'}
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
  updateFavoritesStartup,
  startups_profile,
  refProp,
}: {
  startups_profile: StartupProfile;
  updateFavoritesStartup: () => void;
  refProp?: LegacyRef<HTMLTableRowElement> | undefined;
}) {
  const className =
    'flex flex-col grow shrink basis-1/4 justify-between self-stretch pb-5 my-auto w-52 bg-white rounded min-h-[352px] min-w-[240px] shadow-[2px_2px_2px_rgba(0,0,0,0.01)] cursor-pointer';
  if (refProp) {
    return (
      <div ref={refProp} className={className}>
        <InnerRowTableStartups
          updateFavoritesStartup={updateFavoritesStartup}
          startups_profile={startups_profile}
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <InnerRowTableStartups
        updateFavoritesStartup={updateFavoritesStartup}
        startups_profile={startups_profile}
      />
    </div>
  );
}
