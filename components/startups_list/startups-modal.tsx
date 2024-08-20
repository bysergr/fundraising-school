'use client';

import { useAppStore } from '@/providers/app-store-providers';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import StartupsLinks from '@/components/startups_list/table_startups/startups-links';
import {
  XMarkIcon,
  RocketLaunchIcon,
  CalendarIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import { FaLinkedin, FaWhatsapp } from 'react-icons/fa6';
import FavStartup from '@/components/startups_list/table_startups/fav-startup';
import clsx from 'clsx';
import { Founder } from '@/models/vc_list';
import defaultImageProfile from '@/public/images/default-profile.jpg';
import ClipLoader from 'react-spinners/ClipLoader';

export default function StartupModal() {
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
    const dialog = document.getElementById('modal-startups');

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
      id="modal-startups"
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
            alt={modal_startup.name}
            src={
              modal_startup.photo ||
              'https://placehold.co/600x600/8FFC87/000000?text=Colombia+Tech+Week&font=montserrat'
            }
            width={120}
            height={120}
          />
          <div className="w-full">
            <div className="flex justify-between">
              <h3 className="text-2xl font-semibold">{modal_startup.name}</h3>
              <FavStartup
                startup_id={modal_startup.id}
                favorite={modal_startup.favorite || false}
              />
            </div>
            <span>{modal_startup?.sector?.name || ''}</span>
            <StartupsLinks startup_profile={modal_startup} size="size-5" />
            <div className="mt-5 flex w-full gap-2">
              {modal_startup.calendly ? (
                <a
                  href={modal_startup.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full justify-center gap-2 rounded-lg  bg-ctwLightPurple px-2 py-1 text-center text-sm font-semibold text-white"
                >
                  <CalendarIcon className="size-5 text-white" />
                  <span className="hidden lg:block">My Calendly Link</span>
                </a>
              ) : (
                <a
                  href={'#'}
                  className="flex w-full justify-center gap-2 rounded-lg bg-ctwLightPurple px-2 py-1 text-center text-sm font-semibold text-white"
                >
                  <CalendarIcon className="size-5 text-white" />
                  <span className="hidden lg:block">My Calendly Link</span>
                </a>
              )}

              {modal_startup.deck ? (
                <a
                  href={modal_startup.deck}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full justify-center gap-2 rounded-lg bg-[#E3A3EF] px-2 py-1 text-center text-sm font-semibold text-black"
                >
                  <RocketLaunchIcon className="size-5 text-black" />
                  <span className="hidden lg:block">Deck</span>
                </a>
              ) : (
                <a
                  href={'#'}
                  className="flex w-full justify-center gap-2 rounded-lg bg-[#E3A3EF] px-2 py-1 text-center text-sm font-semibold text-black"
                >
                  <RocketLaunchIcon className="size-5 text-black" />
                  <span className="hidden lg:block">Deck</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      <h3 className="mb-2 mt-4 text-base font-semibold text-ctwLightPurple ">
        Profile information
      </h3>
      <p className="text-base text-neutral-500">{modal_startup.description || 'Empty'} </p>
      <hr className="my-4 h-0.5 bg-[#DBDBDB]" />
      <h3 className="mb-2 mt-4 text-base font-semibold text-ctwLightPurple ">
        Investment Preferences
      </h3>

      {/* Traction */}
      {startup_traction.length > 0 && (
        <div className="my-8 flex flex-col gap-2">
          <h4 className="my-auto ml-2 text-sm font-bold leading-5">Traction</h4>
          <ul className="my-auto flex flex-wrap gap-2 px-5">
            {startup_traction.map((traction) => (
              <li
                key={traction}
                className={clsx(
                  'rounded-full bg-ctwLightPurple px-2 py-1 text-sm font-semibold text-white',
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
        <div className="my-8 flex flex-col gap-2">
          <h4 className="my-auto ml-2 text-sm font-bold leading-5">Rounds they invest in</h4>
          <ul className="my-auto flex flex-wrap gap-2 px-5">
            {startup_rounds.map((round) => (
              <li
                key={round}
                className={clsx(
                  'rounded-full bg-[#3C0560] px-2 py-1 text-sm font-semibold text-[#52EF70]',
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
        <div className="my-8 flex flex-col gap-2">
          <h4 className="my-auto ml-2 text-sm font-bold leading-5">Main Industry</h4>
          <ul className="my-auto flex flex-wrap gap-2 px-5">
            {startup_sectors.map((sector) => (
              <li
                key={sector}
                className={clsx(
                  'rounded-full bg-[#E3A3EF] px-2 py-1 text-sm font-semibold text-black',
                )}
              >
                {sector}
              </li>
            ))}
          </ul>
        </div>
      )}

      <hr className="my-4 h-0.5 bg-[#DBDBDB]" />
      <h3 className="mb-2 mt-4 text-lg font-semibold text-ctwLightPurple ">Founders</h3>
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
              className="flex w-64 flex-col items-center gap-4 rounded-md bg-white p-6 shadow-sm"
            >
              {founder?.photo_url !== null || founder?.photo_url !== '' ? (
                <Image
                  className="rounded-full"
                  alt={founder?.nickname}
                  src={founder?.photo_url || defaultImageProfile}
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
                <p className="text-center text-sm font-semibold text-[#3C0560]">
                  {founder?.nickname}
                </p>
                <p className="text-center text-xs font-normal text-[#3C0560]">{founder?.role}</p>
                <div className="mt-2 flex w-full justify-center gap-1">
                  {founder?.linkedin_url && (
                    <a target="_blank" rel="noreferrer" href={founder?.linkedin_url}>
                      <FaLinkedin className="size-5" />
                    </a>
                  )}
                  {founder?.phone_number && (
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={`https://wa.me/${founder?.country_code}${founder?.phone_number}`}
                    >
                      <FaWhatsapp className="size-5" />
                    </a>
                  )}
                  {founder?.contact_email ? (
                    <a target="_blank" rel="noreferrer" href={`mailto:${founder?.contact_email}`}>
                      <EnvelopeIcon className="size-5" />
                    </a>
                  ) : (
                    <a target="_blank" rel="noreferrer" href={`mailto:${founder?.email}`}>
                      <EnvelopeIcon className="size-5" />
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
