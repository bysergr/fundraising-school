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

  // const [round, setRound] = useState<number>(0);
  // const [traction, setTraction] = useState<number>(0);
  // const [industry, setIndustry] = useState<number>(0);

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
          const status = response.status;
          console.log({ status });
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
  }, [email, role]);

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

    console.log('submit');
  };

  return (
    <dialog
      id="modal-update-startup"
      className="left-auto right-0 top-0 m-0 h-screen w-1/2 max-w-[763px] overflow-y-auto bg-neutral-50 px-14 py-8 focus:outline-none"
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
              src={startup?.photo}
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
                <input required type="text" name="" id="" placeholder="Startup Name" />
              </label>
              <label className="flex flex-col gap-1 text-sm font-semibold">
                Email
                <input required type="text" name="" id="" placeholder="Email" />
              </label>
              <label className="flex flex-col gap-1 text-sm font-semibold">
                Phone Number
                <input required type="text" name="" id="" placeholder="Phone Numer" />
              </label>
              <label className="flex flex-col gap-1 text-sm font-semibold">
                Location
                <select required name="" id="">
                  <option value="Lagos">- Select your country -</option>
                  {countries.map((country) => {
                    return <option key={country}>{country}</option>;
                  })}
                </select>
              </label>
              <label className="flex flex-col gap-1 text-sm font-semibold">
                Calendly
                <input required type="text" name="" id="" placeholder="Calendly" />
              </label>
              <label className="flex flex-col gap-1 text-sm font-semibold">
                Deck
                <input required type="text" name="" id="" placeholder="Deck" />
              </label>
              <label className="flex flex-col gap-1 text-sm font-semibold">
                URL
                <input required type="text" name="" id="" placeholder="URL" />
              </label>
              <label className="flex flex-col gap-1 text-sm font-semibold">
                Linkedin
                <input required type="text" name="" id="" placeholder="Linkedin" />
              </label>
            </div>
            <label className="mt-4 flex flex-col gap-1 text-sm font-semibold">
              Your Startup in one sectence
              <input required type="text" name="" id="" placeholder="Linkedin" />
            </label>
            <label className="mt-4 flex flex-col gap-1 text-sm font-semibold">
              About Me
              <textarea name="" id="" placeholder="Linkedin" />
            </label>
            <div className="mt-4 flex w-full justify-end">
              <button className="rounded-lg bg-red-300 px-4 py-2" type="submit">
                Save Profile
              </button>
            </div>
          </form>

          <hr className="my-4" />
          <h3 className="mb-6 text-xl font-semibold text-neutral-700">Investment and traction</h3>
        </div>
      )}
    </dialog>
  );
}
