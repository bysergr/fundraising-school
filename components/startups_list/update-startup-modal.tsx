'use client';

import { useUserStore } from '@/providers/user-store-provider';
import { useAppStore } from '@/providers/app-store-providers';
import Image from 'next/image';
import { ChangeEvent, FormEvent, useEffect, useRef, useState, useCallback } from 'react';
import { CheckIcon, UserPlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Founder, StartupProfile } from '@/models/vc_list';
import ClipLoader from 'react-spinners/ClipLoader';
import edit_button from '@/public/images/ctw/edit_button.png';
import { FancyMultiSelect, type Framework } from '../search_list/MultiSelect';
import { ContactCard, ContactInfo } from '../search_list/ContactCard';
import { Countries } from '@/data/enums';
import { toast, ToastContainer } from 'react-toastify';
import PhoneInput, { isValidPhoneNumber, parsePhoneNumber } from 'react-phone-number-input';
import logo from '@/public/images/ctw/logo.svg';
import AddFounder from './add-founder';

const lookingForOptions: Framework[] = [
  { value: 'Pre-Seed', label: 'Pre-Seed' },
  { value: 'Seed', label: 'Seed' },
  { value: 'Series A', label: 'Series A' },
  { value: 'Series B+', label: 'Series B+' },
];
const tractionUSDOptions: Framework[] = [
  { value: '0-500k', label: '0 - 500K USD' },
  { value: '500k-1m', label: '500K - 1M USD' },
  { value: '1m-5m', label: '1M - 5M USD' },
  { value: '5m-10m', label: '5M - 10M USD' },
  { value: '10m+', label: '10M+ USD' },
];
const mainIndustryOptions: Framework[] = [
  { value: 'Fintech', label: 'Fintech' },
  { value: 'Healthtech', label: 'Healthtech' },
  { value: 'Edtech', label: 'Edtech' },
  { value: 'E-commerce', label: 'E-commerce' },
  { value: 'Logistics', label: 'Logistics' },
  { value: 'Agtech', label: 'Agtech' },
  { value: 'Proptech', label: 'Proptech' },
  { value: 'SaaS', label: 'SaaS' },
  { value: 'Foodtech', label: 'Foodtech' },
  { value: 'Others', label: 'Others' },
];

export default function UpdateStartupModal() {
  const [startup, setStartup] = useState<StartupProfile>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fileStr, setFileStr] = useState<string>(startup?.photo || logo);
  const [file, setFile] = useState<File>();
  const [founders, setFounders] = useState<ContactInfo[]>([]);
  const [selectedLooking, setSelectedLooking] = useState<Framework[]>([]);
  const [selectedTraction, setSelectedTraction] = useState<Framework[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<Framework[]>([]);
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const [phoneNumber, setPhoneNumber] = useState<any>();
  const [validPhoneNumber, setValidPhoneNumber] = useState<boolean>(true);
  const [addFounder, setAddFounder] = useState<boolean>(false);

  useEffect(() => {
    if (selectedLooking.length > 1) {
      setSelectedLooking([selectedLooking[selectedLooking.length - 1]]);
    }
  }, [selectedLooking]);

  useEffect(() => {
    if (selectedTraction.length > 1) {
      setSelectedTraction([selectedTraction[selectedTraction.length - 1]]);
    }
  }, [selectedTraction]);

  useEffect(() => {
    if (selectedIndustry.length > 1) {
      setSelectedIndustry([selectedIndustry[selectedIndustry.length - 1]]);
    }
  }, [selectedIndustry]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;

    if (event.target.files.length === 0) return;

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

  useEffect(() => {
    if (!phoneNumber) {
      setValidPhoneNumber(false);
      return;
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      setValidPhoneNumber(false);
      return;
    }

    setValidPhoneNumber(true);
  }, [phoneNumber]);

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
          if (!response.ok) {
            return;
          }
          response
            .json()
            .then((data) => {
              setFileStr(data.photo || logo);

              if (data.traction) {
                setSelectedTraction([{ value: data.traction.name, label: data.traction.name }]);
              }

              if (data.round) {
                setSelectedLooking([{ value: data.round.stage, label: data.round.stage }]);
              }

              if (data.sector) {
                setSelectedIndustry([{ value: data.sector.name, label: data.sector.name }]);
              }

              if (data.phone_number) {
                setValidPhoneNumber(true);
              }

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
    } else {
      dialogRef.current?.close();
    }
  }, [email, role, modal_update_startup]);

  const updateFounders = useCallback(() => {
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
            const founders: ContactInfo[] = data.map((founder: Founder) => {
              return {
                name: founder.nickname,
                email: founder.email,
                contact_email: founder.contact_email,
                title: founder.role,
                phone: `+${founder.country_code} ${founder.phone_number}`,
                linkedin: founder.linkedin_url,
                photo: founder.photo_url,
                phone_number: founder.phone_number,
                country_code: founder.country_code,
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
    updateFounders();
  }, [startup, updateFounders]);

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
    } else if (!startup?.email) {
      toast('The startup email is required', {
        theme: 'light',
        type: 'error',
      });

      return;
    }

    if ((e.currentTarget.elements.namedItem('startup_deck') as HTMLInputElement)?.value) {
      const deckLink = (e.currentTarget.elements.namedItem('startup_deck') as HTMLInputElement)
        ?.value;

      if (!deckLink.includes('docsend')) {
        toast('Invalid deck link: The link must be from DocSend', {
          theme: 'light',
          type: 'error',
        });
        return;
      }

      body_request['deck'] = (
        e.currentTarget.elements.namedItem('startup_deck') as HTMLInputElement
      )?.value;
    } else if (!startup?.deck) {
      toast('The startup deck is required', {
        theme: 'light',
        type: 'error',
      });

      return;
    }

    if ((e.currentTarget.elements.namedItem('startup_description') as HTMLInputElement)?.value) {
      body_request['description'] = (
        e.currentTarget.elements.namedItem('startup_description') as HTMLInputElement
      )?.value;
    } else if (!startup?.description) {
      toast('The startup description is required', {
        theme: 'light',
        type: 'error',
      });

      return;
    }

    if (phoneNumber) {
      if (!validPhoneNumber) {
        toast('Invalid phone number', {
          theme: 'light',
          type: 'error',
        });
        return;
      }

      body_request['phone_number'] = parsePhoneNumber(phoneNumber)?.nationalNumber as string;
      body_request['country_code'] = parsePhoneNumber(phoneNumber)?.countryCallingCode as string;
    } else if (!startup?.phone_number) {
      toast('The startup phone number is required', {
        theme: 'light',
        type: 'error',
      });

      return;
    }

    if ((e.currentTarget.elements.namedItem('startup_url') as HTMLInputElement)?.value) {
      body_request['website'] = (
        e.currentTarget.elements.namedItem('startup_url') as HTMLInputElement
      )?.value;
    }

    if ((e.currentTarget.elements.namedItem('startup_sentence') as HTMLInputElement)?.value) {
      if (
        (e.currentTarget.elements.namedItem('startup_sentence') as HTMLInputElement)?.value.length >
        115
      ) {
        toast('The one sentence description must be less than 115 characters', {
          theme: 'light',
          type: 'error',
        });
        return;
      }

      body_request['one_sentence_description'] = (
        e.currentTarget.elements.namedItem('startup_sentence') as HTMLInputElement
      )?.value;
    } else if (!startup?.one_sentence_description) {
      toast('The startup one sentence description is required', {
        theme: 'light',
        type: 'error',
      });

      return;
    }

    if ((e.currentTarget.elements.namedItem('startup_country') as HTMLSelectElement)?.value) {
      body_request['country'] = (
        e.currentTarget.elements.namedItem('startup_country') as HTMLSelectElement
      )?.value;
    }

    if (selectedTraction.length > 0) {
      body_request['traction'] = selectedTraction[0].value;
    }

    if (selectedIndustry.length > 0) {
      body_request['sector'] = selectedIndustry[0].value;
    }

    if (selectedLooking.length > 0) {
      body_request['round'] = selectedLooking[0].value;
    }

    if (!file && !startup?.photo) {
      toast('The startup logo is required', {
        theme: 'light',
        type: 'error',
      });

      return;
    }

    let closeDialog = false;

    if (file) {
      try {
        const formData = new FormData();
        formData.append('startup_photo', file);
        const response = await fetch(
          `https://ctw-backend-service-zfymtlnmgq-ue.a.run.app/startup/${startup?.id}/startup_photo/`,
          {
            method: 'POST',
            body: formData,
          },
        );
        if (!response.ok) {
          throw new Error('Failed to upload startup photo');
        }
        closeDialog = true;
      } catch (error) {
        console.error('Error:', error);
      }
    }

    try {
      console.log({ body_request });

      const response = await fetch(`/api/startups/${startup?.id}`, {
        method: 'PUT',
        body: JSON.stringify(body_request),
      });

      if (!response.ok) {
        throw new Error('Failed to update startup profile');
      }

      closeDialog = true;
    } catch (error) {
      console.error('Error:', error);
    }

    if (closeDialog) {
      dialogRef.current?.close();

      setStartupSelectedFilterOptions(selected_startups_filter_options);
      closeUpdateStartupModal();
    }
  };

  return (
    <dialog
      id="modal-update-startup"
      className="left-auto right-0 top-0 m-0 h-screen w-full max-w-[100vw] overflow-y-auto bg-neutral-50 px-2  lg:w-4/5 lg:px-14"
      ref={dialogRef}
      onCancel={closeUpdateStartupModal}
    >
      <ToastContainer position="bottom-left" limit={3} />

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
          <form id="updateStartup" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center justify-center gap-5 align-middle lg:flex-row lg:justify-start">
              <Image
                className="my-auto block rounded-md bg-white"
                alt={startup?.name}
                src={fileStr}
                width={120}
                height={120}
              />
              <div className="flex flex-col items-center lg:items-start">
                <p className="text-lg font-normal">Upload your logo</p>
                <p className="text-sm font-normal">Should be in PNG or JPG format</p>
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

            <div className="mt-6 grid grid-cols-1 gap-x-6  gap-y-4 lg:grid-cols-3">
              <label className="flex flex-col gap-1 text-sm font-semibold">
                Startup Name
                {startup?.name ? (
                  <input
                    className="rounded-md border border-[#DBDBDB] p-2"
                    type="text"
                    id="startup_name"
                    placeholder={startup?.name}
                  />
                ) : (
                  <input
                    className="rounded-md border border-[#DBDBDB] p-2"
                    type="text"
                    id="startup_name"
                    placeholder="Your Amazing Startup"
                    required
                  />
                )}
              </label>
              <label className="flex flex-col gap-1 text-sm font-semibold">
                Email
                {startup?.email ? (
                  <input
                    className="rounded-md border border-[#DBDBDB] p-2"
                    type="email"
                    id="startup_email"
                    placeholder={startup.email}
                  />
                ) : (
                  <input
                    className="rounded-md border border-[#DBDBDB] p-2"
                    type="email"
                    id="startup_email"
                    placeholder={'contact@your-amazing-startup.com'}
                    required
                  />
                )}
              </label>
              <label className="row-span-2 flex flex-col gap-1 text-sm font-semibold">
                Your Startup in One Sentence
                {startup.one_sentence_description ? (
                  <textarea
                    className="rounded-md border border-[#DBDBDB] p-2 lg:h-full"
                    id="startup_sentence"
                    maxLength={115}
                    placeholder={startup.one_sentence_description}
                  />
                ) : (
                  <textarea
                    className="rounded-md border border-[#DBDBDB] p-2 lg:h-full"
                    id="startup_sentence"
                    maxLength={115}
                    placeholder={'Describe your startup in a single sentence'}
                    required
                  />
                )}
              </label>
              <label className="flex flex-col gap-1 text-sm font-semibold">
                Phone Number
                <div className="flex items-center rounded-md border border-[#DBDBDB] bg-white px-2">
                  <PhoneInput
                    defaultCountry="CO"
                    onChange={(value) => setPhoneNumber(value)}
                    placeholder={
                      startup.phone_number
                        ? startup.country_code
                          ? `+${startup.country_code} ${startup.phone_number}`
                          : startup.phone_number
                        : 'Phone Number'
                    }
                    value={phoneNumber}
                  />
                  {validPhoneNumber ? (
                    <CheckIcon className="size-6 text-blue-500" />
                  ) : (
                    <XMarkIcon className="size-6 text-red-500" />
                  )}
                </div>
              </label>
              <label className="flex flex-col gap-1 text-sm font-semibold">
                Location
                <select
                  id="startup_country"
                  required
                  className="rounded-md border border-[#DBDBDB] p-2"
                >
                  {startup.country ? (
                    <>
                      <option>{startup.country.name}</option>
                      {Countries.map((country) => {
                        if (country !== startup.country.name)
                          return <option key={country}>{country}</option>;
                      })}
                    </>
                  ) : (
                    Countries.map((country) => {
                      return <option key={country}>{country}</option>;
                    })
                  )}
                </select>
              </label>
              <label className="flex flex-col gap-1 text-sm font-semibold">
                Calendly
                <input
                  className="rounded-md border border-[#DBDBDB] p-2"
                  type="url"
                  id="startup_calendly"
                  placeholder={startup.calendly || 'calendly.com/your-amazing-startup'}
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
                {startup.deck ? (
                  <input
                    className="rounded-md border border-[#DBDBDB] p-2"
                    type="url"
                    id="startup_deck"
                    placeholder={startup.deck}
                  />
                ) : (
                  <input
                    className="rounded-md border border-[#DBDBDB] p-2"
                    type="url"
                    id="startup_deck"
                    required
                    placeholder={'docsend.com/view/amazingdeck'}
                  />
                )}
              </label>
              <label className="row-span-2 flex flex-col gap-1 text-sm font-semibold">
                Description
                {startup.description ? (
                  <textarea
                    className="rounded-md border border-[#DBDBDB] p-2 lg:h-full"
                    id="startup_description"
                    placeholder={startup.description}
                  />
                ) : (
                  <textarea
                    required
                    id="startup_description"
                    className="rounded-md border border-[#DBDBDB] p-2 lg:h-full"
                    placeholder={'Provide a brief description of your startup.'}
                  />
                )}
              </label>
              <label className="flex flex-col gap-1 text-sm font-semibold">
                URL
                <input
                  className="rounded-md border border-[#DBDBDB] p-2"
                  type="text"
                  id="startup_url"
                  placeholder={startup.website || ' www.your-amazing-startup.com'}
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-semibold">
                LinkedIn Link
                <input
                  className="rounded-md border border-[#DBDBDB] p-2"
                  type="url"
                  id="startup_linkedin"
                  placeholder={startup.linkedin || 'linkedin.com/company/your-amazing-startup '}
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
                <FancyMultiSelect
                  selected={selectedLooking}
                  setSelected={setSelectedLooking}
                  data={lookingForOptions}
                />
              </div>
              <div className="flex flex-col gap-1 text-sm font-semibold">
                Traction USD
                <FancyMultiSelect
                  selected={selectedTraction}
                  setSelected={setSelectedTraction}
                  data={tractionUSDOptions}
                />
              </div>
              <div className="flex flex-col gap-1 text-sm font-semibold">
                Main Industry
                <FancyMultiSelect
                  selected={selectedIndustry}
                  setSelected={setSelectedIndustry}
                  data={mainIndustryOptions}
                />
              </div>
            </div>
          </form>

          <hr className="my-5 h-0.5 w-full bg-[#DBDBDB] text-[#DBDBDB]" />

          <div className="mb-2.5 flex justify-between">
            <h2 className="text-xl font-normal text-darkFsGray">Founders</h2>
            <button
              className="mt-2 flex rounded-md bg-ctwLightPurple px-3 py-1 text-sm font-semibold text-white"
              type="button"
              onClick={() => setAddFounder(true)}
            >
              <UserPlusIcon className="mr-2 w-5 text-white" color="#fff" />
              Add founder
            </button>
          </div>
          <div className="flex grid-cols-1 flex-col items-center justify-center gap-x-6 gap-y-4  lg:grid lg:grid-cols-3">
            {addFounder && (
              <AddFounder
                setAddFounder={setAddFounder}
                updateFounders={updateFounders}
                nameStartup={startup.name}
              />
            )}

            {founders.map((founder) => {
              return (
                <ContactCard
                  key={founder.email}
                  updateFounders={updateFounders}
                  contact={founder}
                />
              );
            })}
          </div>
          <div className="mb-12 mt-4 flex w-full justify-between">
            <p className="">
              If you’re having trouble or need assistance, feel free to contact us at{' '}
              <a className="text-ctwLightPurple underline" href="mailto:hello@colombiatechweek.co">
                hello@colombiatechweek.co
              </a>
            </p>

            <button
              form="updateStartup"
              className="rounded-lg bg-ctwLightPurple px-4 py-2 text-white"
              type="submit"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}
