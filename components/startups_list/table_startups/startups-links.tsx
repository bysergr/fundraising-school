import { LinkIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { FaLinkedin } from 'react-icons/fa6';

import { StartupProfile } from '@/models/vc_list';

export default function StartupsLinks({
  startup_profile,
  size = 'size-4',
}: {
  startup_profile: StartupProfile;
  size?: string;
}) {
  return (
    <ul className="mt-2 flex gap-1">
      {startup_profile.website && startup_profile.website.length !== 0 && (
        <li>
          <a
            href={startup_profile.website}
            target="_blank"
            rel="noreferrer"
            className="text-neutral-600"
          >
            <LinkIcon className={size} />
          </a>
        </li>
      )}
      {startup_profile.linkedin && startup_profile.linkedin.length !== 0 && (
        <li>
          <a
            href={startup_profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-neutral-600"
          >
            <FaLinkedin className={size} />
          </a>
        </li>
      )}
      {startup_profile.email && startup_profile.email.length !== 0 && (
        <li>
          <a
            href={startup_profile.email}
            target="_blank"
            rel="noreferrer"
            className="text-neutral-600"
          >
            <EnvelopeIcon className={size} />
          </a>
        </li>
      )}
    </ul>
  );
}