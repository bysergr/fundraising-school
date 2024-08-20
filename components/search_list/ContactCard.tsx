'use client';

import Image from 'next/image';
import type React from 'react';
import { FaMailBulk } from 'react-icons/fa';
import { FaLinkedin, FaPhone } from 'react-icons/fa6';
import defaultImageProfile from '@/public/images/default-profile.jpg';
import { PencilSquareIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';

import { useEffect, useState } from 'react';

export type ContactInfo = {
  name: string;
  title: string;
  email: string;
  phone: string;
  linkedin: string;
  photo: string;
  phone_number: string;
  country_code: string;
};

type ContactCardProps = {
  contact: ContactInfo;
};

export const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const [phoneNumber, setPhoneNumber] = useState<any>();
  const [validPhoneNumber, setValidPhoneNumber] = useState<boolean>(true);

  useEffect(() => {
    if (!phoneNumber) {
      setValidPhoneNumber(false);

      if (contact.phone_number && contact.phone_number.trim() !== '') {
        setValidPhoneNumber(true);
      }
      return;
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      setValidPhoneNumber(false);
      return;
    }

    setValidPhoneNumber(true);
  }, [phoneNumber, contact.phone_number]);

  const handleUpdateSubmit = async () => {};

  if (editMode) {
    return (
      <form
        onSubmit={handleUpdateSubmit}
        className="size-full overflow-hidden rounded border p-4 pb-8 shadow-lg"
      >
        <div className="flex items-center">
          <Image
            className="mr-4 size-16 rounded-full"
            src={contact.photo || defaultImageProfile}
            alt={`${contact.name} profile`}
            width={64}
            height={64}
          />
          <div className="w-full text-left">
            <p className="text-xl font-bold">{contact.name}</p>
            <input
              type="text"
              className="mt-1 w-full rounded-lg py-0.5 text-sm text-gray-500"
              placeholder={contact.title || 'Title'}
            />
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center text-gray-700">
            <FaMailBulk className="mr-2" />
            <input
              type="text"
              className="ml-2 w-full rounded-lg py-0.5"
              placeholder={contact.email}
            />
          </div>
          <div className="mt-2 flex items-center text-gray-700">
            <FaPhone className="mr-2" />
            <div className="ml-2 flex w-full items-center rounded-lg border border-gray-700 bg-white px-2">
              <PhoneInput
                defaultCountry="CO"
                onChange={(value) => setPhoneNumber(value)}
                placeholder={contact.phone_number ? contact.phone_number : 'Phone Number'}
                value={phoneNumber}
              />
              {validPhoneNumber ? (
                <CheckIcon className="size-6 text-blue-500" />
              ) : (
                <XMarkIcon className="size-6 text-red-500" />
              )}
            </div>
          </div>
          <div className="mt-2 flex items-center text-gray-700">
            <FaLinkedin className="mr-2" />
            <input
              type="text"
              className="ml-2 w-full rounded-lg py-0.5"
              placeholder={contact.linkedin || 'LinkedIn URL'}
            />
          </div>
        </div>
        <div className="mt-4 text-right">
          <button
            className="mr-2 rounded-sm border border-red-500 px-4 py-2 text-red-500 hover:text-red-700"
            onClick={() => setEditMode(false)}
            type="button"
          >
            Cancel
          </button>
          <button
            className="rounded-sm border border-green-500 px-4 py-2 text-green-500 hover:text-green-700"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    );
  }

  return (
    <article className="size-full overflow-hidden rounded border p-4 pb-8 shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <Image
            className="mr-4 size-16 rounded-full"
            src={contact.photo || defaultImageProfile}
            alt={`${contact.name} profile`}
            width={64}
            height={64}
          />
          <div className="text-left">
            <h4 className="text-xl font-bold">{contact.name}</h4>
            <p className="text-gray-500">{contact.title}</p>
          </div>
        </div>
        <button onClick={() => setEditMode(true)} className="mt-3">
          <PencilSquareIcon className="size-6 text-blue-500" />
        </button>
      </div>
      <div className="mt-4">
        <div className="flex items-center text-gray-700">
          <FaMailBulk className="mr-2" />
          <a href={`mailto:${contact.email}`} className="hover:underline">
            {contact.email}
          </a>
        </div>
        <div className="mt-2 flex items-center text-gray-700">
          <FaPhone className="mr-2" />
          <span>{contact.phone}</span>
        </div>
        <div className="mt-2 flex items-center text-gray-700">
          <FaLinkedin className="mr-2" />
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {contact.linkedin === null
              ? 'No LinkedIn'
              : contact.linkedin.length > 40
                ? `${contact.linkedin.slice(0, 40)}...`
                : contact.linkedin}
          </a>
        </div>
      </div>
      {/* <div className="mt-4 text-right">
        <button
          className="rounded-sm border border-red-500 p-2 text-red-500 hover:text-red-700"
          onClick={() => console.log('Remove contact')}
          type="button"
        >
          <TrashIcon className="w-4 text-red-500 " />
        </button>
      </div> */}
    </article>
  );
};
