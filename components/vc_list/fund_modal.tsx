'use client';

import { useAppStore } from '@/providers/app-store-providers';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import VCLinks from '@/components/vc_list/table_vc/vc_links';
import {
  XMarkIcon,
  HandThumbUpIcon,
  CurrencyDollarIcon,
  MagnifyingGlassIcon,
  MapIcon,
  LinkIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';

import { FaLinkedin, FaXTwitter } from 'react-icons/fa6';

import { InvestmentPreferenceSection } from '@/components/shared/InvestmentPreferenceSection';
import FavVC from '@/components/vc_list/table_vc/fav-vc';
import defaultImageProfile from '@/public/images/default-profile.jpg';

export default function FundModal() {
  const { modal_vc, closeFundModal: closeModal } = useAppStore((state) => state);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (modal_vc) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [modal_vc]);

  useEffect(() => {
    const dialog = document.getElementById('modal-vc');

    if (!dialog) return;

    dialog.addEventListener(
      'click',
      function (event) {
        const rect = dialog.getBoundingClientRect();
        const isInDialog =
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width;

        if (!isInDialog) {
          dialogRef.current?.close();
          closeModal();
        }
      },
      { once: true },
    );
  }, [modal_vc, closeModal]);

  if (!modal_vc) return null;

  const fund_rounds = Array.from(new Set(modal_vc.rounds.map((round) => round?.stage)));
  const fund_check_size = Array.from(
    new Set(modal_vc.check_size.map((check_size) => check_size?.size)),
  );
  const fund_sectors = Array.from(new Set(modal_vc.sectors.map((sector) => sector?.name)));
  const fund_countries = Array.from(new Set(modal_vc.countries.map((country) => country?.name)));

  return (
    <dialog
      id="modal-vc"
      className="left-auto right-0 top-0 m-0 h-screen w-1/2 max-w-[763px] overflow-y-auto bg-neutral-50 px-14 py-8"
      ref={dialogRef}
      onCancel={closeModal}
    >
      <div className="flex w-full justify-end ">
        <button onClick={closeModal}>
          <XMarkIcon className="size-5 text-black" />
        </button>
      </div>
      <div className="flex justify-between pr-16">
        <div className="flex gap-8 align-middle">
          <Image
            className="my-auto block rounded-md"
            alt={`image of ${modal_vc.name}`}
            src={modal_vc.photo}
            width={120}
            height={120}
          />
          <div className="">
            <h3 className="text-2xl font-semibold">{modal_vc.name}</h3>
            <VCLinks vc_profile={modal_vc} size="size-5" />
            <p className="mt-4 font-semibold text-ctwDarkGreen2">{modal_vc.contact}</p>
          </div>
        </div>
        <FavVC is_modal size="size-6" fund_id={modal_vc.id} favorite={modal_vc.favorite} />
      </div>
      <p className="mt-10 text-base text-black">{modal_vc.description}</p>
      <h3 className="my-10 text-xl font-semibold text-black">Investment Preferences</h3>

      {/* Rounds */}
      {fund_rounds.length > 0 && (
        <InvestmentPreferenceSection
          IconComponent={HandThumbUpIcon}
          title="Rounds they invest in"
          listItems={fund_rounds}
        />
      )}

      {/* Check Size */}
      {fund_check_size.length > 0 && (
        <InvestmentPreferenceSection
          IconComponent={CurrencyDollarIcon}
          title="Check size range(s)"
          listItems={fund_check_size}
        />
      )}

      {/* Sectors */}
      {fund_sectors.length > 0 && (
        <InvestmentPreferenceSection
          IconComponent={MagnifyingGlassIcon}
          title="Sectors they invest in"
          listItems={fund_sectors}
        />
      )}

      {/* Country */}
      {fund_countries.length > 0 && (
        <InvestmentPreferenceSection
          IconComponent={MapIcon}
          title="Geographies they invest in"
          listItems={fund_countries}
        />
      )}

      <h3 className="mb-10 text-xl font-semibold text-black">Partners</h3>
      <ul className="flex flex-wrap justify-around gap-2">
        {modal_vc.partners.map((partner) => (
          <li
            key={partner?.id}
            className="flex w-44 flex-col items-center gap-4 rounded-md bg-white p-6 shadow-sm"
          >
            {partner?.photo !== null ? (
              <Image
                className="rounded-full"
                alt={`image of ${partner?.name}`}
                src={partner?.photo}
                width={90}
                height={90}
              />
            ) : (
              <Image
                className="rounded-full"
                alt={`image of ${partner?.name}`}
                src={defaultImageProfile}
                width={90}
                height={90}
              />
            )}
            <div>
              <p className="text-center text-base font-bold text-black">{partner?.name}</p>
              <p className="text-center text-base text-black">{partner?.role}</p>
              <div className="mt-2 flex w-full justify-center gap-1">
                {partner?.website && (
                  <a target="_blank" rel="noreferrer" href={partner?.website}>
                    <LinkIcon className="size-4" />
                  </a>
                )}
                {partner?.linkedin && (
                  <a target="_blank" rel="noreferrer" href={partner?.linkedin}>
                    <FaLinkedin className="size-4" />
                  </a>
                )}
                {partner?.twitter && (
                  <a target="_blank" rel="noreferrer" href={partner?.twitter}>
                    <FaXTwitter className="size-4" />
                  </a>
                )}
                {partner?.email && (
                  <a target="_blank" rel="noreferrer" href={`mailto:${partner?.email}`}>
                    <EnvelopeIcon className="size-4" />
                  </a>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </dialog>
  );
}
