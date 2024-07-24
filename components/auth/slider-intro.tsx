import { LightBulbIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';

export default function SliderIntro() {
  return (
    <main className="w-full ">
      <p className="mb-6 flex w-full items-center justify-between gap-4 text-3xl font-semibold leading-[48px] text-white">
        <LightBulbIcon className="size-7 text-white" />
        <span className="flex-1 ">Ready to be inspired?</span>
      </p>
      <ul className="grid gap-5">
        <li className="flex items-center justify-between gap-4 text-base font-normal leading-4 text-white">
          <CheckBadgeIcon className="size-6 text-white" />

          <span className="flex-1">
            We offer a comprehensive toolbox filled with resources to support creative pursuits
          </span>
        </li>
        <li className="flex items-center justify-between gap-4 text-base font-normal leading-4 text-white">
          <CheckBadgeIcon className="size-6 text-white" />

          <span className="flex-1">
            We host creative challenges and prompts to spark inspiration and encourage artistic
            exploration
          </span>
        </li>
        <li className="flex items-center justify-between gap-4 text-base font-normal leading-4 text-white">
          <CheckBadgeIcon className="size-6 text-white" />

          <span className="flex-1">
            Join creative teams, or simply engage in discussions that ignite new ideas and
            collaborations.
          </span>
        </li>
      </ul>
    </main>
  );
}
