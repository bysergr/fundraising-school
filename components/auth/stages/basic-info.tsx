import { correctImage } from '@/utils/validations';
import { Session } from 'next-auth';
import Image from 'next/image';
import ConfirmUserDataForm from '../confirm-user-data-form';
import FounderDataForm from '../founder-data-form';
import AttendeeDataForm from '../attendee-data-form';
import InvestorDataForm from '../investor-data-form';

export default function BasicInfoStage({ data, stage }: { data: Session | null; stage: string }) {
  const imageProfile = correctImage(data?.user?.image);

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
      {stage === 'basic' && <ConfirmUserDataForm data={data} />}
      {stage === 'founder' && <FounderDataForm data={data} />}
      {stage === 'attendee' && <AttendeeDataForm data={data} />}
      {stage === 'investor' && <InvestorDataForm data={data} />}
    </div>
  );
}
