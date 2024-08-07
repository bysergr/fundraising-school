import Image from 'next/image';

import ValidateUser from '@/components/auth/validate-user';
import { correctImage } from '@/utils/validations';
import { Session } from 'next-auth';
import ClipLoader from 'react-spinners/ClipLoader';

export default function ValidationStage({ data }: { data: Session | null }) {
  const imageProfile = correctImage(data?.user?.image);

  if (data === null) {
    return (
      <div className="grid h-full place-content-center">
        <ClipLoader color="#637EE0" size={55} />
      </div>
    );
  }

  return (
    <div className="flex size-full flex-col items-center justify-around gap-6  px-8 py-6  lg:p-0">
      <div className=" flex flex-col items-center justify-center gap-2">
        <Image
          src={imageProfile}
          className="rounded-full"
          width={150}
          height={150}
          quality={100}
          priority
          alt={`Linkedin Profile Picture of ${data?.user?.name}`}
        />
        <h3 className="h3 text-center">{data?.user?.name}</h3>
      </div>
      <ValidateUser user={data} />
    </div>
  );
}
