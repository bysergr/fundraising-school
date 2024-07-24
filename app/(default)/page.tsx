export const metadata = {
  title: 'Fundraising School - Be a great deal for investors and raise money like a pro',
  description:
    'Fuel your LATAM startup at Fundraising School. Master fundraising with expert-led courses on pitch decks and venture capital. Join to accelerate growth, achieve goals, and network with founders. Unleash fundraising expertise for success!',
};

import Hero from '@/components/home/hero';
import Sponsors from '@/components/home/sponsors';
import Speakers from '@/components/home/speakers';
import Hosts from '@/components/home/hosts';
import Questions from '@/components/home/questions';
import Features from '@/components/home/features-fs';
import YtVideo from '@/components/home/yt-video';
import Curriculum from '@/components/home/curriculum';
import Mentors from '@/components/home/mentors';

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Hosts />
      <Speakers />
      <Mentors />
      <Curriculum />
      <Sponsors />
      <YtVideo />
      <Questions />
    </>
  );
}
