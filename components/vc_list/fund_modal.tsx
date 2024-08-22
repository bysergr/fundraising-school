'use client';

import { useAppStore } from '@/providers/app-store-providers';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import VCLinks from '@/components/vc_list/table_vc/vc_links';
import { XMarkIcon, LinkIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

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
      className="left-auto right-0 top-0 m-0 h-screen w-full max-w-[763px] overflow-y-auto bg-white px-6 py-8 shadow-[-2px_2px_4px_rgba(214,214,214,1)] lg:my-5 lg:!max-h-[96vh] lg:w-1/2 lg:rounded-l-md lg:px-14"
      ref={dialogRef}
      onCancel={closeModal}
    >
      <div className="flex justify-end">
        <div className="mb-[15px] mr-[-15px] flex size-[50px] items-center justify-center gap-2.5 rounded-[30px] bg-white p-2.5 shadow-[-2px_2px_4px_rgba(214,214,214,1)]">
          <button onClick={closeModal} type="button">
            <XMarkIcon className="my-auto aspect-square size-6 w-10 self-stretch object-contain text-neutral-500" />
          </button>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex basis-full gap-4 lg:gap-4 lg:align-middle">
          <Image
            className="my-auto block rounded-md bg-white object-contain"
            alt={`image of ${modal_vc.name}`}
            src={modal_vc.photo}
            width={120}
            height={120}
          />
          <div className="w-full">
            <div className="flex justify-between">
              <h3 className="text-2xl font-semibold">{modal_vc.name}</h3>
              <FavVC is_modal size="size-6" fund_id={modal_vc.id} favorite={modal_vc.favorite} />
            </div>
            <p className="font-semibold text-ctwDarkGreen2">{modal_vc.contact}</p>
            <VCLinks vc_profile={modal_vc} size="size-5" />
          </div>
        </div>
      </div>
      <h3 className="mb-2 mt-4 text-base font-semibold text-ctwLightPurple ">
        Profile information
      </h3>
      <p className="text-base text-neutral-500">{modal_vc.description || 'Empty'} </p>
      <hr className="my-4 h-0.5 bg-[#DBDBDB]" />
      <h3 className="mb-2 mt-4 text-base font-semibold text-ctwLightPurple ">
        Investment Preferences
      </h3>

      {/* Rounds */}
      {fund_rounds.length > 0 && (
        <InvestmentPreferenceSection
          title="Rounds they invest in"
          listItems={fund_rounds}
          className="rounded-full bg-ctwLightPurple px-2 py-1 text-sm font-semibold text-white"
        />
      )}

      {/* Check Size */}
      {fund_check_size.length > 0 && (
        <InvestmentPreferenceSection
          title="Check size range(s)"
          listItems={fund_check_size}
          className="rounded-full bg-[#3C0560] px-2 py-1 text-sm font-semibold text-[#52EF70]"
        />
      )}

      {/* Sectors */}
      {fund_sectors.length > 0 && (
        <InvestmentPreferenceSection
          title="Sectors they invest in"
          listItems={fund_sectors}
          className="rounded-full bg-[#E3A3EF] px-2 py-1 text-sm font-semibold text-black"
        />
      )}

      {/* Country */}
      {fund_countries.length > 0 && (
        <InvestmentPreferenceSection
          title="Geographies they invest in"
          listItems={fund_countries}
        />
      )}
      <hr className="my-4 h-0.5 bg-[#DBDBDB]" />
      <h3 className="mb-2 mt-4 text-lg font-semibold text-ctwLightPurple">Partners</h3>
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
              <p className="text-center text-sm font-semibold text-[#3C0560]">{partner?.name}</p>
              <p className="text-center text-xs font-normal text-[#3C0560]">{partner?.role}</p>
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
