import Image from 'next/image';
import defaultImageProfile from '@/public/images/default-profile.jpg';
import { FormEvent, useEffect, useState } from 'react';
import { FaLinkedin, FaMailBulk, FaPhone, FaGlobeAmericas } from 'react-icons/fa';
import PhoneInput, { isValidPhoneNumber, parsePhoneNumber } from 'react-phone-number-input';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Countries } from '@/data/enums';
import { toast } from 'react-toastify';

type AddFounderProps = {
  setAddFounder: React.Dispatch<React.SetStateAction<boolean>>;
  updateFounders: () => void;
  nameStartup: string;
};

export default function AddFounder({
  setAddFounder,
  updateFounders,
  nameStartup,
}: AddFounderProps) {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const [phoneNumber, setPhoneNumber] = useState<any>();
  const [validPhoneNumber, setValidPhoneNumber] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [linkedinURL, setLinkedinURL] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [country, setCountry] = useState<string>('Colombia');

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

  const handleAddFounderSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body_request: { [key: string]: string } = {
      startup: nameStartup,
    };

    if (country && country.trim() !== '') {
      body_request['location'] = country;
    } else {
      toast('Country is required', {
        theme: 'light',
        type: 'error',
      });

      return;
    }

    if (name && name.trim() !== '') {
      body_request['nickname'] = name;
    } else {
      toast('Name is required', {
        theme: 'light',
        type: 'error',
      });

      return;
    }

    if (role && role.trim() !== '') {
      body_request['role'] = role;
    } else {
      toast('Role is required', {
        theme: 'light',
        type: 'error',
      });

      return;
    }

    if (email && email.trim() !== '') {
      body_request['email'] = email;
    } else {
      toast('LinkedIn Email is required', {
        theme: 'light',
        type: 'error',
      });

      return;
    }

    if (linkedinURL && linkedinURL.trim() !== '') {
      body_request['linkedin_url'] = linkedinURL;
    } else {
      toast('LinkedIn URL is required', {
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
    } else {
      toast('Phone number is required', {
        theme: 'light',
        type: 'error',
      });

      return;
    }

    console.log({ body_request });

    try {
      const response = await fetch('/api/user/founder', {
        method: 'POST',
        body: JSON.stringify(body_request),
      });

      if (!response.ok) {
        toast('Error adding founder', {
          theme: 'light',
          type: 'error',
        });
        return;
      }

      updateFounders();
      setAddFounder(false);
      toast('Founder Added', {
        theme: 'light',
        type: 'success',
      });
    } catch (error) {
      toast('Error adding founder', {
        theme: 'light',
        type: 'error',
      });
    }
  };

  return (
    <form
      onSubmit={handleAddFounderSubmit}
      className="size-full overflow-hidden rounded border p-4 pb-8 shadow-lg"
    >
      <div className="flex items-center">
        <Image
          className="mr-4 size-16 rounded-full"
          src={defaultImageProfile}
          alt={`User placeholder`}
          width={64}
          height={64}
        />
        <div className="w-full text-left">
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            className="mt-1 w-full rounded-lg py-0.5 text-sm text-gray-500"
            placeholder={'Name'}
            required
          />
          <input
            onChange={(e) => setRole(e.target.value)}
            value={role}
            type="text"
            className="mt-1 w-full rounded-lg py-0.5 text-sm text-gray-500"
            placeholder={'Role'}
            required
          />
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center text-gray-700">
          <FaMailBulk className="mr-2" />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="ml-2 w-full rounded-lg py-0.5"
            placeholder={'LinkedIn Email'}
            required
          />
        </div>
        <div className="mt-2 flex items-center text-gray-700">
          <FaPhone className="mr-2" />
          <div className="ml-2 flex w-full items-center rounded-lg border border-gray-700 bg-white px-2">
            <PhoneInput
              defaultCountry="CO"
              onChange={(value) => setPhoneNumber(value)}
              placeholder={'Phone Number'}
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
            type="url"
            onChange={(e) => setLinkedinURL(e.target.value)}
            value={linkedinURL}
            className="ml-2 w-full rounded-lg py-0.5"
            placeholder={'LinkedIn URL'}
            required
          />
        </div>
      </div>
      <div className="mt-2 flex items-center text-gray-700">
        <FaGlobeAmericas className="mr-2" />
        <select
          className="ml-2 w-full rounded-lg py-0.5"
          onChange={(e) => setCountry(e.target.value)}
          value={country}
          required
        >
          {Countries.map((Name, i) => (
            <option key={i}>{Name}</option>
          ))}
        </select>
      </div>
      <div className="mt-4 text-right">
        <button
          className="mr-2 rounded-sm border border-red-500 px-4 py-2 text-red-500 hover:text-red-700"
          onClick={() => setAddFounder(false)}
          type="button"
        >
          Cancel
        </button>
        <button
          className="rounded-sm border border-green-500 px-4 py-2 text-green-500 hover:text-green-700"
          type="submit"
        >
          Add
        </button>
      </div>
    </form>
  );
}
