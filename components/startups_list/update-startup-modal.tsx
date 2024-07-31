'use client';

import { useUserStore } from '@/providers/user-store-provider';
import { useAppStore } from '@/providers/app-store-providers';
import Image from 'next/image';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { StartupProfile } from '@/models/vc_list';
import ClipLoader from 'react-spinners/ClipLoader';

export default function UpdateStartupModal() {
  const [startup, setStartup] = useState<StartupProfile>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [countries, setCountries] = useState<string[]>([]);

  const { role, email } = useUserStore((state) => state);
  const { openUpdateStartupModal, closeUpdateStartupModal, modal_update_startup } = useAppStore(
    (state) => state,
  );
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (modal_update_startup) {
      dialogRef.current?.showModal();
      openUpdateStartupModal();
    } else {
      dialogRef.current?.close();
      closeUpdateStartupModal();
    }
  }, [closeUpdateStartupModal, modal_update_startup, openUpdateStartupModal]);

  useEffect(() => {
    if (!modal_update_startup) {
      return;
    }

    setIsLoading(true);

    if (role === 'startup') {
      fetch(`/api/user/startup/${email}`)
        .then((response) => {
          if (!response.ok) {
            return;
          }
          response
            .json()
            .then((data) => {
              setStartup(data);
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

      fetch(`/api/startups/filter/countries`).then((response) => {
        if (!response.ok) {
          return;
        }
        response
          .json()
          .then((data) => {
            const countries = data.map((country: { name: string }) => country.name);

            setCountries(countries);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    } else {
      dialogRef.current?.close();
    }
  }, [email, role, modal_update_startup]);

  useEffect(() => {
    const dialog = document.getElementById('modal-update-startup');

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
          closeUpdateStartupModal();
        }
      },
      { once: true },
    );
  }, [modal_update_startup, closeUpdateStartupModal]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/startups/${startup?.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          linkedin:
            (e.currentTarget.elements.namedItem('startup_linkedin') as HTMLInputElement)?.value ||
            null,
          name:
            (e.currentTarget.elements.namedItem('startup_name') as HTMLInputElement)?.value || null,
          calendly:
            (e.currentTarget.elements.namedItem('startup_calendly') as HTMLInputElement)?.value ||
            null,
          email:
            (e.currentTarget.elements.namedItem('startup_email') as HTMLInputElement)?.value ||
            null,
          deck:
            (e.currentTarget.elements.namedItem('startup_deck') as HTMLInputElement)?.value || null,
          description:
            (e.currentTarget.elements.namedItem('startup_description') as HTMLInputElement)
              ?.value || null,
          phone_number:
            (e.currentTarget.elements.namedItem('startup_phone') as HTMLInputElement)?.value ||
            null,
          website:
            (e.currentTarget.elements.namedItem('startup_url') as HTMLInputElement)?.value || null,
          one_sentence_description:
            (e.currentTarget.elements.namedItem('startup_sentence') as HTMLInputElement)?.value ||
            null,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update startup profile');
      }

      dialogRef.current?.close();
      closeUpdateStartupModal();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <dialog
      id="modal-update-startup"
      className="left-auto right-0 top-0 m-0 h-screen w-full max-w-[763px] overflow-y-auto bg-neutral-50 px-6 py-8 lg:w-1/2 lg:px-14"
      ref={dialogRef}
      onCancel={closeUpdateStartupModal}
    >
      <div className="flex w-full justify-end ">
        <button onClick={closeUpdateStartupModal}>
          <XMarkIcon className="size-5 text-neutral-500" />
        </button>
      </div>

      {isLoading && (
        <div className="grid size-full place-content-center">
          <ClipLoader color="#637EE0" size={55} />
        </div>
      )}

      {startup && (
        <div>
          <div className="flex gap-8 align-middle">
            <Image
              className="my-auto block rounded-md bg-black"
              alt={startup?.name}
              src={startup?.photo || 'https://naurat.com/favicon.svg'}
              width={120}
              height={120}
            />
            <div className="my-auto">
              <p className="text-lg font-normal">Upload your photo</p>
              <p className="text-sm font-normal">Your photo should be in PNG or JPG format</p>
              <input type="file" accept="image/png, image/jpeg" className="mt-4" />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4">
              <label className="flex flex-col gap-1 text-sm font-semibold">
                Startup Name
                <input
                  required
                  type="text"
                  id="startup_name"
                  placeholder={startup?.name || 'Startup Name'}
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-semibold">
                Email
                <input
                  required
                  type="text"
                  id="startup_email"
                  placeholder={startup.email || 'Email'}
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-semibold">
                Phone Number
                <input
                  required
                  type="text"
                  id="startup_phone"
                  placeholder={startup.phone_number || 'Phone Numer'}
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-semibold">
                Location
                <select required id="startup_country">
                  {countries.map((country) => {
                    return <option key={country}>{country}</option>;
                  })}
                </select>
              </label>
              <label className="flex flex-col gap-1 text-sm font-semibold">
                Calendly
                <input
                  required
                  type="text"
                  id="startup_calendly"
                  placeholder={startup.calendly || 'Calendly'}
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-semibold">
                Deck
                <input
                  required
                  type="text"
                  id="startup_deck"
                  placeholder={startup.deck || 'Deck'}
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-semibold">
                URL
                <input
                  required
                  type="text"
                  id="startup_url"
                  placeholder={startup.website || 'URL'}
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-semibold">
                Linkedin Link
                <input
                  required
                  type="text"
                  id="startup_linkedin"
                  placeholder={startup.linkedin || 'Linkedin'}
                />
              </label>
            </div>
            <label className="mt-4 flex flex-col gap-1 text-sm font-semibold">
              Your Startup in One Sentence
              <input
                required
                type="text"
                id="startup_sentence"
                placeholder={startup.one_sentence_description || 'Your Startup in One Sentence'}
              />
            </label>
            <label className="mt-4 flex flex-col gap-1 text-sm font-semibold">
              Description
              <textarea
                id="startup_description"
                placeholder={startup.description || 'Description'}
              />
            </label>
            <div className="mt-4 flex w-full justify-end">
              <button className="rounded-lg bg-[#32083E] px-4 py-2 text-white" type="submit">
                Save Profile
              </button>
            </div>
          </form>
        </div>
      )}
    </dialog>
  );
}
