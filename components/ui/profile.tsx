import Image from 'next/image';
import { Speaker } from '@/models/speaker';

export default function Profile({ profile }: { profile: Speaker }) {
  return (
    <article
      className="mx-auto flex h-[360px] min-w-[220px] flex-col items-center"
      data-aos="zoom-y-out"
    >
      <Image
        src={profile.srcImageProfile}
        alt={`Picture of ${profile.name}`}
        width={180}
        height={180}
        style={{ width: 'auto', height: 'auto' }}
      />
      <div className="flex h-auto flex-col items-center text-left">
        <h3 className="text-lg font-semibold">{profile.name}</h3>
        <p className="my-2 text-center font-light">{profile.description}</p>
        <Image
          src={profile.srcImageStartUp}
          alt={`Logo of startup where work ${profile.name}`}
          width={profile.imageStartUpSize.width}
          height={profile.imageStartUpSize.height}
          style={{ height: 'auto' }}
        />
      </div>
    </article>
  );
}
