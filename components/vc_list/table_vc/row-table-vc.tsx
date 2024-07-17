'use client';

import Image from 'next/image';
import { LegacyRef } from 'react';

import { VCProfile } from '@/models/vc_list';
import VCLinks from '@/components/vc_list/table_vc/vc_links';
import CountriesVC from '@/components/vc_list/table_vc/countries-vc';
import StagesVC from '@/components/vc_list/table_vc/stages-vc';
import FavVC from '@/components/vc_list/table_vc/fav-vc';
import CheckSizeVC from './check_size_vc';
import { useAppStore } from '@/providers/app-store-providers';

function InnerRowTableVC({ vc_profile }: { vc_profile: VCProfile }) {
  const { openFundModal: openModal } = useAppStore((state) => state);

  const handleClick = () => {
    openModal(vc_profile.id);
  };

  return (
    <>
      <td className="flex w-80 justify-start gap-6">
        <Image
          className="size-[110px] cursor-pointer rounded-md object-cover"
          alt={`image of ${vc_profile.name}`}
          src={vc_profile.photo}
          width={60}
          height={60}
          onClick={handleClick}
        />
        <div className="my-auto w-fit">
          <p onClick={handleClick} className="cursor-pointer text-base font-semibold">
            {vc_profile.name}
          </p>
          <VCLinks vc_profile={vc_profile} />
        </div>
      </td>
      <FavVC fund_id={vc_profile.id} favorite={vc_profile.favorite} />

      <CountriesVC countries={vc_profile.countries} />
      <CheckSizeVC check_size={vc_profile.check_size} />
      <StagesVC stages={vc_profile.rounds} />
    </>
  );
}

export default function RowTableVC({
  vc_profile,
  refProp,
}: {
  vc_profile: VCProfile;
  refProp?: LegacyRef<HTMLTableRowElement> | undefined;
}) {
  if (refProp) {
    return (
      <tr ref={refProp} className="my-4 ">
        <InnerRowTableVC vc_profile={vc_profile} />
      </tr>
    );
  }

  return (
    <tr className="my-4 ">
      <InnerRowTableVC vc_profile={vc_profile} />
    </tr>
  );
}
