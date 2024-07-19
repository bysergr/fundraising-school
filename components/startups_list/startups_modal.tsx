'use client';

import { useAppStore } from '@/providers/app-store-providers';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import VCLinks from '@/components/startups_list/table_startups/startups_links';
import {
  XMarkIcon,
  HandThumbUpIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
  RocketLaunchIcon,
  CalendarIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import { FaLinkedin } from 'react-icons/fa6';
import FavVC from '@/components/vc_list/table_vc/fav-vc';
import clsx from 'clsx';
import { Founder } from '@/models/vc_list';
import defaultImageProfile from '@/public/images/default-profile.jpg';
import ClipLoader from 'react-spinners/ClipLoader';

export default function FundModal() {
  const [founders, setFounders] = useState<Founder[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { modal_startup, closeStartupModal: closeModal } = useAppStore((state) => state);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (modal_startup) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
      return;
    }
    setIsLoading(true);

    fetch(`/api/startups/founders/${modal_startup.name}`)
      .then((response) => {
        if (!response.ok) {
          return;
        }

        response
          .json()
          .then((data) => {
            setFounders(data);
            setIsLoading(false);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [modal_startup]);

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
  }, [modal_startup, closeModal]);

  if (!modal_startup) return null;

  const startup_rounds: string[] = [];
  if (modal_startup.round) {
    startup_rounds.push(modal_startup.round.stage);
  }

  const startup_sectors: string[] = [];
  if (modal_startup.sector) {
    startup_sectors.push(modal_startup.sector.name);
  }

  const startup_countries: string[] = [];
  if (modal_startup.country) {
    startup_countries.push(modal_startup.country.name);
  }

  const startup_traction: string[] = [];
  if (modal_startup.traction) {
    startup_traction.push(modal_startup.traction.name);
  }

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
            className="my-auto block rounded-md bg-black"
            alt={`image of ${modal_startup.name}`}
            src={modal_startup.photo}
            width={120}
            height={120}
          />
          <div className="">
            <h3 className="text-2xl font-semibold">{modal_startup.name}</h3>
            <VCLinks startup_profile={modal_startup} size="size-5" />
          </div>
        </div>
        <FavVC
          is_modal
          size="size-6"
          fund_id={modal_startup.id}
          favorite={modal_startup.favorite}
        />
      </div>
      <div className="mt-6 flex w-full gap-2">
        <a
          href={modal_startup.calendly || '#'}
          className="flex w-full justify-center gap-2 rounded-lg bg-secondLightFsPurple px-2 py-1 text-center text-sm font-semibold text-fsPurple"
        >
          <CalendarIcon className="size-5 text-fsPurple" />
          My Calendly Link
        </a>
        <a
          href={modal_startup.deck || '#'}
          className="flex w-full justify-center gap-2 rounded-lg bg-secondLightFsPurple px-2 py-1 text-center text-sm font-semibold text-fsPurple"
        >
          <RocketLaunchIcon className="size-5 text-fsPurple" />
          Deck
        </a>
      </div>
      <h3 className="mb-2 mt-4 text-base font-semibold text-neutral-700">Description</h3>
      <p className="text-sm text-neutral-500">{modal_startup.description}</p>
      <hr className="my-4" />
      <h3 className="mb-6 text-xl font-semibold text-neutral-700">Investment Preferences</h3>

      {/* Traction */}
      {startup_traction.length > 0 && (
        <div className="my-8 flex gap-16">
          <div className="flex">
            <div className="my-auto size-fit rounded-md bg-fsPurple p-2">
              <CurrencyDollarIcon className="size-8 text-white" />
            </div>
            <p className="my-auto ml-2 w-24 text-sm font-bold leading-5">Traction</p>
          </div>
          <ul className="my-auto flex w-[65%] flex-wrap gap-2">
            {startup_traction.map((traction) => (
              <li
                key={traction}
                className={clsx(
                  'rounded-lg bg-secondLightFsPurple px-2 py-1 text-sm font-semibold text-fsPurple',
                )}
              >
                {traction}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Rounds */}
      {startup_rounds.length > 0 && (
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
            {startup_rounds.map((round) => (
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

      {/* Sectors */}
      {startup_sectors.length > 0 && (
        <div className="my-8 flex gap-16">
          <div className="flex">
            <div className="my-auto size-fit rounded-md bg-fsPurple p-2">
              <BriefcaseIcon className="size-8 text-white" />
            </div>
            <p className="my-auto ml-2 w-24 text-sm font-bold leading-5">Main Industry</p>
          </div>
          <ul className="my-auto flex w-[65%] flex-wrap gap-2">
            {startup_sectors.map((sector) => (
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

      <hr className="my-4" />

      <h3 className="mb-6 text-xl font-semibold text-neutral-700">Founders</h3>
      <ul className="flex flex-wrap justify-around gap-2">
        {isLoading && (
          <div className="grid place-content-center">
            <ClipLoader color="#637EE0" size={55} />
          </div>
        )}

        {founders.length === 0 && !isLoading && (
          <p className="text-center text-base font-semibold">No founders found</p>
        )}

        {founders &&
          !isLoading &&
          founders.map((founder) => (
            <li
              key={founder?.id}
              className="flex w-44 flex-col items-center gap-4 rounded-md bg-white p-6 shadow-sm"
            >
              {founder?.photo_url !== null ? (
                <Image
                  className="rounded-full"
                  alt={founder?.nickname}
                  src={founder?.photo_url}
                  width={90}
                  height={90}
                />
              ) : (
                <Image
                  className="rounded-full"
                  alt={founder?.nickname}
                  src={defaultImageProfile}
                  width={90}
                  height={90}
                />
              )}
              <div>
                <p className="text-center text-base font-semibold">{founder?.nickname}</p>
                <p className="text-center text-sm font-semibold text-neutral-500">
                  {founder?.role}
                </p>
                <div className="mt-2 flex w-full justify-center gap-1">
                  {founder?.linkedin_url && (
                    <a target="_blank" rel="noreferrer" href={founder?.linkedin_url}>
                      <FaLinkedin className="size-4" />
                    </a>
                  )}

                  {founder?.contact_email && (
                    <a target="_blank" rel="noreferrer" href={`mailto:${founder?.contact_email}`}>
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
