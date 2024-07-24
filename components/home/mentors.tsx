'use client';

import Profile from '@/components/ui/profile';
import MentorsData from '@/data/mentors';
import { Speaker } from '@/models/speaker';
import { useState, useEffect } from 'react';

export default function Mentors() {
  const [showMore, setShowMore] = useState<boolean>(false);
  const [mentors, setMentors] = useState<Speaker[]>(MentorsData.slice(0, 8));

  useEffect(() => {
    if (showMore) {
      setMentors(MentorsData);
    } else {
    }
  }, [showMore]);

  return (
    <section className="relative bg-[#f5f5f5] px-4 py-12 text-center sm:px-6 md:py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="h2 pb-12 md:pb-16" data-aos="zoom-y-out">
          Mentors
        </h2>
        <div className="mx-auto grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
          {mentors.map((mentor, index) => (
            <Profile key={index} profile={mentor} />
          ))}
        </div>
        {!showMore && (
          <button
            className="btn mb-4 w-full rounded-3xl border-fsPurple bg-white px-14 text-fsPurple duration-150 hover:bg-fsPurple hover:text-white focus:bg-darkFsPurple focus:text-white sm:mb-0 sm:w-auto"
            onClick={() => setShowMore(true)}
          >
            Show More
          </button>
        )}
      </div>
    </section>
  );
}
