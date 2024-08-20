'use client';

import Image from 'next/image';
import type React from 'react';
import { FaMailBulk } from 'react-icons/fa';
import { FaLinkedin, FaPhone } from 'react-icons/fa6';
import defaultImageProfile from '@/public/images/default-profile.jpg';
import { PencilSquareIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import PhoneInput, { isValidPhoneNumber, parsePhoneNumber } from 'react-phone-number-input';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export type ContactInfo = {
  name: string;
  title: string;
  email: string;
  contact_email: string;
  phone: string;
  linkedin: string;
  photo: string;
  phone_number: string;
  country_code: string;
};

type ContactCardProps = {
  updateFounders: () => void;
  contact: ContactInfo;
};

export const ContactCard: React.FC<ContactCardProps> = ({ contact, updateFounders }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const [phoneNumber, setPhoneNumber] = useState<any>();
  const [validPhoneNumber, setValidPhoneNumber] = useState<boolean>(true);
  const [contactEmail, setContactEmail] = useState<string>('');
  const [linkedinURL, setLinkedinURL] = useState<string>('');
  const [role, setRole] = useState<string>('');

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

  const handleUpdateClick = async () => {
    const body_request: { [key: string]: string } = {};
    let hasChanges = false;

    body_request['email'] = contact.email;

    if (role && role.trim() !== '') {
      hasChanges = true;
      body_request['role'] = role;
    }

    if (contactEmail && contactEmail.trim() !== '') {
      hasChanges = true;
      body_request['contact_email'] = contactEmail;
    }

    if (linkedinURL && linkedinURL.trim() !== '') {
      hasChanges = true;
      body_request['linkedin_url'] = linkedinURL;
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
      hasChanges = true;
    }

    if (!hasChanges) {
      setEditMode(false);
      return;
    }

    try {
      const response = await fetch('/api/user/update', {
        method: 'POST',
        body: JSON.stringify(body_request),
      });

      if (!response.ok) {
        toast('Error updating founder', {
          theme: 'light',
          type: 'error',
        });
        return;
      }

      updateFounders();
      toast('Founder updated', {
        theme: 'light',
        type: 'success',
      });

      setEditMode(false);
    } catch (error) {
      toast('Error updating founder', {
        theme: 'light',
        type: 'error',
      });
    }
  };

  if (editMode) {
    return (
      <article className="size-full overflow-hidden rounded border p-4 pb-8 shadow-lg">
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
              onChange={(e) => setRole(e.target.value)}
              value={role}
              type="text"
              className="mt-1 w-full rounded-lg py-0.5 text-sm text-gray-500"
              placeholder={contact.title || 'Role'}
            />
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center text-gray-700">
            <FaMailBulk className="mr-2" />
            <input
              onChange={(e) => setContactEmail(e.target.value)}
              value={contactEmail}
              type="text"
              className="ml-2 w-full rounded-lg py-0.5"
              placeholder={
                contact.contact_email ? contact.contact_email : contact.email || 'Contact Email'
              }
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
              onChange={(e) => setLinkedinURL(e.target.value)}
              value={linkedinURL}
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
            type="button"
            onClick={handleUpdateClick}
          >
            Save
          </button>
        </div>
      </article>
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
          <a href={`mailto:${contact.contact_email || contact.email}`} className="hover:underline">
            {contact.contact_email || contact.email}
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
