'use client';

import { useFundStore } from '@/providers/funds-store-providers';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import VCLinks from './table_vc/vc_links';
import {
  XMarkIcon,
  HandThumbUpIcon,
  CurrencyDollarIcon,
  MagnifyingGlassIcon,
  MapIcon,
} from '@heroicons/react/24/outline';
import FavVC from './table_vc/fav-vc';
import clsx from 'clsx';
import defaultImageProfile from '@/public/images/default-profile.jpg';

export default function FundModal() {
  const { modal_vc, closeModal } = useFundStore((state) => state);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    console.log(modal_vc);

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
          <XMarkIcon className="size-5 text-neutral-500" />
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
            <p className="mt-4 font-semibold text-fsPurple">{modal_vc.contact}</p>
          </div>
        </div>
        <FavVC is_modal size="size-6" fund_id={modal_vc.id} favorite={modal_vc.favorite} />
      </div>
      <p className="mt-6 text-sm text-neutral-500">{modal_vc.description}</p>
      <hr className="my-4" />
      <h3 className="mb-6 text-xl font-semibold text-neutral-700">Investment Preferences</h3>

      {/* Rounds */}
      {fund_rounds.length > 0 && (
        <div className="my-8 flex gap-16">
          <div className="flex">
            <div className="my-auto size-fit rounded-md bg-fsPurple p-2">
              <HandThumbUpIcon className="size-8 text-white" />
            </div>
            <p className="my-auto ml-2 w-24 text-sm font-bold leading-5">
              Rounds they <br /> invest in
            </p>
          </div>
          <ul className="my-auto flex w-[65%] flex-wrap gap-2">
            {fund_rounds.map((round) => (
              <li
                key={round}
                className={clsx(
                  'rounded-lg bg-secondLightFsPurple px-2 py-1 text-sm font-semibold text-fsPurple',
                )}
              >
                {round}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Check Size */}
      {fund_check_size.length > 0 && (
        <div className="my-8 flex gap-16">
          <div className="flex">
            <div className="my-auto size-fit rounded-md bg-fsPurple p-2">
              <CurrencyDollarIcon className="size-8 text-white" />
            </div>
            <p className="my-auto ml-2 w-24 text-sm font-bold leading-5">
              Check size <br /> range(s)
            </p>
          </div>
          <ul className="my-auto flex w-[65%] flex-wrap gap-2">
            {fund_check_size.map((check_size) => (
              <li
                key={check_size}
                className={clsx(
                  'rounded-lg bg-secondLightFsPurple px-2 py-1 text-sm font-semibold text-fsPurple',
                )}
              >
                {check_size}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Sectors */}
      {fund_sectors.length > 0 && (
        <div className="my-8 flex gap-16">
          <div className="flex">
            <div className="my-auto size-fit rounded-md bg-fsPurple p-2">
              <MagnifyingGlassIcon className="size-8 text-white" />
            </div>
            <p className="my-auto ml-2 w-24 text-sm font-bold leading-5">
              Sectors they <br /> invest in
            </p>
          </div>
          <ul className="my-auto flex w-[65%] flex-wrap gap-2">
            {fund_sectors.map((sector) => (
              <li
                key={sector}
                className={clsx(
                  'rounded-lg bg-secondLightFsPurple px-2 py-1 text-sm font-semibold text-fsPurple',
                )}
              >
                {sector}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Country */}
      {fund_countries.length > 0 && (
        <div className="my-8 flex gap-16">
          <div className="flex">
            <div className="my-auto size-fit rounded-md bg-fsPurple p-2">
              <MapIcon className="size-8 text-white" />
            </div>
            <p className="my-auto ml-2 w-24 text-sm font-bold leading-5">
              Geographies they <br /> invest in
            </p>
          </div>
          <ul className="my-auto flex w-[65%] flex-wrap gap-2">
            {fund_countries.map((country) => (
              <li
                key={country}
                className={clsx(
                  'rounded-lg bg-secondLightFsPurple px-2 py-1 text-sm font-semibold text-fsPurple',
                )}
              >
                {country}
              </li>
            ))}
          </ul>
        </div>
      )}

      <hr className="my-4" />

      <h3 className="mb-6 text-xl font-semibold text-neutral-700">Partners</h3>
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
              <p className="text-center text-base font-semibold">{partner?.name}</p>
              <p className="text-center text-sm font-semibold text-neutral-500">{partner?.role}</p>
            </div>
          </li>
        ))}
      </ul>
    </dialog>
  );
}
