import { getServerSession } from 'next-auth';
import Image from 'next/image';

import { authOptions } from '@/utils/auth';

// import ConfirmUserDataForm from '@/components/auth/confirm-user-data-form';
import { correctImage } from '@/utils/validations';

export default async function Page() {
  const data = await getServerSession(authOptions);

  const imageProfile = correctImage(data?.user?.image);

  return (
    <div className="flex h-full flex-col items-center justify-around px-8 py-6 lg:p-0">
      <div className="flex flex-col items-center justify-center gap-2">
        <Image
          src={imageProfile}
          className="rounded-full"
          width={150}
          height={150}
          quality={100}
          alt={`Linkedin Profile Picture of ${data?.user?.name}`}
        />
        <h3 className="h3 text-center">{data?.user?.name}</h3>
        <p className="h4">Nice to see you!</p>
      </div>
      {/* <ConfirmUserDataForm /> */}
    </div>
  );
}
