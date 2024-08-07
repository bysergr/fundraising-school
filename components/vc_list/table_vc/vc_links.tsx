import { LinkIcon } from '@heroicons/react/24/outline';
import { FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import { SiCrunchbase } from 'react-icons/si';

import { VCProfile } from '@/models/vc_list';

const LINK_CLASS = 'text-black';

export default function VCLinks({
  vc_profile,
  size = 'size-4',
}: {
  vc_profile: VCProfile;
  size?: string;
}) {
  return (
    <ul className="mt-2 flex gap-1">
      {vc_profile.website && vc_profile.website.length !== 0 && (
        <li>
          <a href={vc_profile.website} target="_blank" rel="noreferrer" className={LINK_CLASS}>
            <LinkIcon className={size} />
          </a>
        </li>
      )}
      {vc_profile.linkedin && vc_profile.linkedin.length !== 0 && (
        <li>
          <a href={vc_profile.linkedin} target="_blank" rel="noreferrer" className={LINK_CLASS}>
            <FaLinkedin className={size} />
          </a>
        </li>
      )}
      {vc_profile.twitter && vc_profile.twitter.length !== 0 && (
        <li>
          <a href={vc_profile.twitter} target="_blank" rel="noreferrer" className={LINK_CLASS}>
            <FaXTwitter className={size} />
          </a>
        </li>
      )}
      {vc_profile.crunch_base && vc_profile.crunch_base.length !== 0 && (
        <li>
          <a href={vc_profile.crunch_base} target="_blank" rel="noreferrer" className={LINK_CLASS}>
            <SiCrunchbase className={size} />
          </a>
        </li>
      )}
    </ul>
  );
}
