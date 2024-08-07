import { TrashIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import type React from 'react';
import { FaMailBulk } from 'react-icons/fa';
import { FaLinkedin, FaPhone } from 'react-icons/fa6';

export type ContactInfo = {
  name: string;
  title: string;
  email: string;
  phone: string;
  linkedin: string;
  action: string;
};

type ContactCardProps = {
  contact: ContactInfo;
};

export const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
  return (
    <div className="w-full overflow-hidden rounded border p-4 shadow-lg">
      <div className="flex items-center">
        <Image
          className="mr-4 size-16 rounded-full"
          src="https://via.placeholder.com/64"
          alt={`${contact.name} profile`}
          width={64}
          height={64}
        />
        <div className="text-left">
          <div className="text-xl font-bold">{contact.name}</div>
          <div className="text-gray-500">{contact.title}</div>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-center text-gray-700">
          <FaMailBulk className="mr-2" />
          <span>{contact.email}</span>
        </div>
        <div className="mt-2 flex items-center text-gray-700">
          <FaPhone className="mr-2" />
          <span>{contact.phone}</span>
        </div>
        <div className="mt-2 flex items-center text-gray-700">
          <FaLinkedin className="mr-2" />
          <a
            href={`https://${contact.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {contact.linkedin}
          </a>
        </div>
      </div>
      <div className="mt-4 text-right">
        <button
          className="rounded-sm border border-red-500 p-2 text-red-500 hover:text-red-700"
          onClick={() => console.log('Remove contact')}
          type="button"
        >
          <TrashIcon className="w-4 text-red-500 " />
        </button>
      </div>
    </div>
  );
};
