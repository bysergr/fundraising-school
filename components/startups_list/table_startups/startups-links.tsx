import { LinkIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { FaLinkedin, FaWhatsapp } from 'react-icons/fa6';

import { StartupProfile } from '@/models/vc_list';
import { ensureHttpOrHttps } from '@/utils/validations';

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
          <a href={ensureHttpOrHttps(startup_profile.website)} target="_blank" rel="noreferrer">
            <LinkIcon className={size} />
          </a>
        </li>
      )}
      {startup_profile.linkedin && startup_profile.linkedin.length !== 0 && (
        <li>
          <a href={ensureHttpOrHttps(startup_profile.linkedin)} target="_blank" rel="noreferrer">
            <FaLinkedin className={size} />
          </a>
        </li>
      )}
      {startup_profile.email && startup_profile.email.length !== 0 && (
        <li>
          <a href={`mailto:${startup_profile.email}`}>
            <EnvelopeIcon className={size} />
          </a>
        </li>
      )}
      {startup_profile.phone_number && startup_profile.phone_number.length !== 0 && (
        <li>
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://wa.me/${startup_profile.country_code}${startup_profile.phone_number}`}
          >
            <FaWhatsapp className={size} />
          </a>
        </li>
      )}
    </ul>
  );
}
