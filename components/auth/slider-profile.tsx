import Image from 'next/image';
import type { SliderProfileProps } from '@/models/speaker';

export default function SliderProfile({ profileInfo }: { profileInfo: SliderProfileProps }) {
  const {
    name,
    message,
    nameCompany,
    companyPosition,
    srcImageProfile,
    srcImageCompany,
    imageCompanyProps,
    imageProfileProps,
  } = profileInfo;

  return (
    <main className="flex flex-col items-center justify-center">
      <h3 className="h3 text-center text-white">{message}</h3>
      <Image
        src={srcImageProfile}
        alt={`Picture of ${name}`}
        width={imageProfileProps.width}
        height={imageProfileProps.height}
      />
      <p className="mb-2 text-white">{companyPosition}</p>
      <Image
        src={srcImageCompany}
        alt={`Picture of ${nameCompany}`}
        width={imageCompanyProps.width}
        height={imageCompanyProps.height}
      />
    </main>
  );
}
