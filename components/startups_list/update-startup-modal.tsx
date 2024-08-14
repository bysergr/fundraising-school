'use client';

import { useUserStore } from '@/providers/user-store-provider';
import { useAppStore } from '@/providers/app-store-providers';
import Image from 'next/image';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Founder, StartupProfile } from '@/models/vc_list';
import ClipLoader from 'react-spinners/ClipLoader';
import edit_button from '@/public/images/ctw/edit_button.png';
import { FancyMultiSelect, type Framework } from '../search_list/MultiSelect';
import { ContactCard, ContactInfo } from '../search_list/ContactCard';

const lookingForOptions: Framework[] = [
  { value: 'funding', label: 'Funding' },
  { value: 'partnerships', label: 'Partnerships' },
  { value: 'mentorship', label: 'Mentorship' },
  { value: 'networking', label: 'Networking' },
  { value: 'talent', label: 'Talent' },
];
const tractionUSDOptions: Framework[] = [
  { value: '0-500k', label: '0 - 500K USD' },
  { value: '500k-1m', label: '500K - 1M USD' },
  { value: '1m-5m', label: '1M - 5M USD' },
  { value: '5m-10m', label: '5M - 10M USD' },
  { value: '10m+', label: '10M+ USD' },
];
const mainIndustryOptions: Framework[] = [
  { value: 'technology', label: 'Technology' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'finance', label: 'Finance' },
  { value: 'education', label: 'Education' },
  { value: 'manufacturing', label: 'Manufacturing' },
];

export default function UpdateStartupModal() {
  const [startup, setStartup] = useState<StartupProfile>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [countries, setCountries] = useState<string[]>([]);
  const [fileStr, setFileStr] = useState<string>(
    startup?.photo || 'https://naurat.com/favicon.svg',
  );
  const [file, setFile] = useState<File>();
  const [founders, setFounders] = useState<ContactInfo[]>([]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    setFile(event.target.files[0]);
  }

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileStr(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [file]);

  const { role, email } = useUserStore((state) => state);
  const {
    openUpdateStartupModal,
    closeUpdateStartupModal,
    modal_update_startup,
    selected_startups_filter_options,
    setStartupSelectedFilterOptions,
  } = useAppStore((state) => state);
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
      fetch(`/api/user/startup/${email}`, {
        cache: 'no-store',
        method: 'GET',
      })
        .then((response) => {
          console.log({ response });

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
    if (!startup) {
      return;
    }

    fetch(`/api/startups/founders/${startup.name}`, {
      cache: 'no-store',
      method: 'GET',
    })
      .then((response) => {
        if (!response.ok) {
          return;
        }
        response
          .json()
          .then((data) => {
            console.log({ data });

            const founders: ContactInfo[] = data.map((founder: Founder) => {
              return {
                name: founder.nickname,
                email: founder.email,
                title: founder.role,
                phone: `+${founder.country_code} ${founder.phone_number}`,
                linkedin: founder.linkedin_url,
              };
            });

            setFounders(founders);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [startup]);

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

    const body_request: { [key: string]: string } = {};

    if ((e.currentTarget.elements.namedItem('startup_linkedin') as HTMLInputElement)?.value) {
      body_request['linkedin'] = (
        e.currentTarget.elements.namedItem('startup_linkedin') as HTMLInputElement
      )?.value;
    }

    if ((e.currentTarget.elements.namedItem('startup_name') as HTMLInputElement)?.value) {
      body_request['name'] = (
        e.currentTarget.elements.namedItem('startup_name') as HTMLInputElement
      )?.value;
    }

    if ((e.currentTarget.elements.namedItem('startup_calendly') as HTMLInputElement)?.value) {
      body_request['calendly'] = (
        e.currentTarget.elements.namedItem('startup_calendly') as HTMLInputElement
      )?.value;
    }

    if ((e.currentTarget.elements.namedItem('startup_email') as HTMLInputElement)?.value) {
      body_request['email'] = (
        e.currentTarget.elements.namedItem('startup_email') as HTMLInputElement
      )?.value;
    }

    if ((e.currentTarget.elements.namedItem('startup_deck') as HTMLInputElement)?.value) {
      body_request['deck'] = (
        e.currentTarget.elements.namedItem('startup_deck') as HTMLInputElement
      )?.value;
    }

    if ((e.currentTarget.elements.namedItem('startup_description') as HTMLInputElement)?.value) {
      body_request['description'] = (
        e.currentTarget.elements.namedItem('startup_description') as HTMLInputElement
      )?.value;
    }

    if ((e.currentTarget.elements.namedItem('startup_phone') as HTMLInputElement)?.value) {
      body_request['phone_number'] = (
        e.currentTarget.elements.namedItem('startup_phone') as HTMLInputElement
      )?.value;
    }

    if ((e.currentTarget.elements.namedItem('startup_url') as HTMLInputElement)?.value) {
      body_request['website'] = (
        e.currentTarget.elements.namedItem('startup_url') as HTMLInputElement
      )?.value;
    }

    if ((e.currentTarget.elements.namedItem('startup_sentence') as HTMLInputElement)?.value) {
      body_request['one_sentence_description'] = (
        e.currentTarget.elements.namedItem('startup_sentence') as HTMLInputElement
      )?.value;
    }

    try {
      if (file) {
        const formData = new FormData();
        formData.append('startup_photo', file);

        const response = await fetch(`/api/startups/image/${startup?.id}`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to upload startup photo');
        }
      }

      const response = await fetch(`/api/startups/${startup?.id}`, {
        method: 'PUT',
        body: JSON.stringify(body_request),
      });

      if (!response.ok) {
        throw new Error('Failed to update startup profile');
      }

      dialogRef.current?.close();

      setStartupSelectedFilterOptions(selected_startups_filter_options);
      closeUpdateStartupModal();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <dialog
      id="modal-update-startup"
      className="left-auto right-0 top-0 m-0 h-screen w-full max-w-[100vw] overflow-y-auto bg-neutral-50 px-2  lg:w-4/5 lg:px-14"
      ref={dialogRef}
      onCancel={closeUpdateStartupModal}
    >
      <div className="absolute right-3 top-6 z-30 justify-end lg:right-4 lg:top-6">
        <button onClick={closeUpdateStartupModal} type="button">
          <XMarkIcon className="size-5 text-neutral-500" />
        </button>
      </div>

      {isLoading && (
        <div className="grid size-full place-content-center">
          <ClipLoader color="#637EE0" size={55} />
        </div>
      )}

      {startup && !isLoading && (
        <div>
          <div className="mb-4 flex h-24 w-full flex-col justify-center pl-3">
            <div className="flex items-center">
              <h2 className="text-2xl font-black text-darkFsGray">Startup Profile</h2>
            </div>
            <p className="block font-normal ">You can edit and view profile preferences</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-5 align-middle lg:flex-row lg:justify-start">
            <Image
              className="my-auto block rounded-md bg-black"
              alt={startup?.name}
              src={fileStr}
              width={120}
              height={120}
            />
            <div className=" flex flex-col items-center lg:items-start">
              <p className="text-lg font-normal">Upload your photo</p>
              <p className="text-sm font-normal">Your photo should be in PNG or JPG format</p>
              <label
                htmlFor="edit_button"
                className="mt-4 flex cursor-pointer items-center justify-center"
              >
                <Image src={edit_button} alt="edit-button" className="w-16" />
              </label>
              <input
                type="file"
                id="edit_button"
                accept="image/png, image/jpeg"
                className="mt-4 hidden"
                onChange={handleChange}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mt-6 grid grid-cols-1 gap-x-6  gap-y-4 lg:grid-cols-3">
              <label className="flex flex-col gap-1 text-sm font-semibold">
                Startup Name
                <input
                  className="rounded-md border border-[#DBDBDB] p-2"
                  type="text"
                  id="startup_name"
                  placeholder={startup?.name || 'Startup Name'}
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-semibold">
                Email
                <input
                  className="rounded-md border border-[#DBDBDB] p-2"
                  type="text"
                  id="startup_email"
                  placeholder={startup.email || 'Email'}
                />
              </label>
              <label className="row-span-2 flex flex-col gap-1 text-sm font-semibold">
                Your Startup in One Sentence
                <textarea
                  className="rounded-md border border-[#DBDBDB] p-2 lg:h-full"
                  id="startup_sentence"
                  placeholder={startup.one_sentence_description || 'Your Startup in One Sentence'}
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-semibold">
                Phone Number
                <input
                  className="rounded-md border border-[#DBDBDB] p-2"
                  type="text"
                  id="startup_phone"
                  placeholder={startup.phone_number || 'Phone Numer'}
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-semibold">
                Location
                <select id="startup_country" className="rounded-md border border-[#DBDBDB] p-2">
                  {countries.map((country) => {
                    return <option key={country}>{country}</option>;
                  })}
                </select>
              </label>
              <label className="flex flex-col gap-1 text-sm font-semibold">
                Calendly
                <input
                  className="rounded-md border border-[#DBDBDB] p-2"
                  type="text"
                  id="startup_calendly"
                  placeholder={startup.calendly || 'Calendly'}
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-semibold">
                <span>
                  Deck (
                  <a
                    href="http://experience.docsend.com/hsturp95ijw5"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block text-ctwLightPurple"
                  >
                    DOCSEND
                  </a>
                  )
                </span>

                <input
                  className="rounded-md border border-[#DBDBDB] p-2"
                  type="text"
                  id="startup_deck"
                  placeholder={startup.deck || 'Deck'}
                />
              </label>
              <label className="row-span-2 flex flex-col gap-1 text-sm font-semibold">
                Description
                <textarea
                  className="rounded-md border border-[#DBDBDB] p-2 lg:h-full"
                  id="startup_description"
                  placeholder={startup.description || 'Description'}
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-semibold">
                URL
                <input
                  className="rounded-md border border-[#DBDBDB] p-2"
                  type="text"
                  id="startup_url"
                  placeholder={startup.website || 'URL'}
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-semibold">
                LinkedIn Link
                <input
                  className="rounded-md border border-[#DBDBDB] p-2"
                  type="text"
                  id="startup_linkedin"
                  placeholder={startup.linkedin || 'Linkedin'}
                />
              </label>
            </div>

            <hr className="my-5 h-0.5 w-full bg-[#DBDBDB] text-[#DBDBDB]" />

            <div className="mb-2.5 flex items-center">
              <h2 className="text-xl font-normal text-darkFsGray">Investment and Traction</h2>
            </div>
            <div className=" grid grid-cols-1 gap-x-6  gap-y-4 lg:grid-cols-3">
              <div className="flex flex-col gap-1 text-sm font-semibold">
                Looking for
                <FancyMultiSelect data={lookingForOptions} />
              </div>
              <div className="flex flex-col gap-1 text-sm font-semibold">
                Traction USD
                <FancyMultiSelect data={tractionUSDOptions} />
              </div>
              <div className="flex flex-col gap-1 text-sm font-semibold">
                Main Industry
                <FancyMultiSelect data={mainIndustryOptions} />
              </div>
            </div>

            <hr className="my-5 h-0.5 w-full bg-[#DBDBDB] text-[#DBDBDB]" />

            <div className="mb-2.5 flex justify-between">
              <h2 className="text-xl font-normal text-darkFsGray">Founders</h2>
              {/* <button
                className="mt-2 flex rounded-md bg-ctwLightPurple px-3 py-1 text-sm font-semibold text-white"
                type="button"
              >
                <UserPlusIcon className="mr-2 w-5 text-white" color="#fff" />
                Add founder
              </button> */}
            </div>
            <div className="flex grid-cols-1 flex-col items-center justify-center gap-x-6 gap-y-4  lg:grid lg:grid-cols-3">
              {founders.map((founder) => {
                return <ContactCard key={founder.email} contact={founder} />;
              })}
            </div>
            <div className="mb-12 mt-4 flex w-full justify-end">
              <button className="rounded-lg bg-ctwLightPurple px-4 py-2 text-white" type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </dialog>
  );
}
