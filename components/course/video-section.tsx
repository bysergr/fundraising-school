'use client';

import { YouTubeEmbed } from '@next/third-parties/google';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  NoSymbolIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { slugify } from '@/utils/validations';

async function completeClass({ sessionID, email }: { sessionID: number; email: string }) {
  const response = await fetch(`/api/courses/class/${sessionID}/user/${email}/mark`, {
    method: 'POST',
  });

  if (!response.ok) {
    console.error('Error');
  }
}

export default function VideoSection({
  videoId,
  courseName,
  sessionName,
  nextSessionName,
  prevSessionName,
  sessionID,
  email,
  numberOfLessons,
  currentLesson,
}: {
  videoId: string;
  courseName: string;
  sessionName: string;
  nextSessionName: string | null;
  prevSessionName: string | null;
  sessionID: number;
  email: string;
  numberOfLessons: number;
  currentLesson: number;
}) {
  const router = useRouter();

  return (
    <div>
      <h3 className="text-xl font-bold text-fsGray">{courseName}</h3>
      <h2 className="mb-2 text-3xl font-bold">{sessionName}</h2>
      <div className="mb-4">
        <p className="text-sm font-semibold">{`Lesson ${currentLesson} of ${numberOfLessons}`}</p>
        <YouTubeEmbed videoid={videoId} params="controls=1&autoplay=1" />
        <div className="mt-3 flex flex-row justify-between">
          <button
            onClick={() => {
              if (prevSessionName) {
                router.push(
                  `/product/courses/${slugify(courseName)}/class/${slugify(prevSessionName)}`,
                );
              }
            }}
            className="flex w-40 items-center justify-center gap-2 rounded-md bg-ctwPurple px-3 py-2 text-white"
          >
            <ChevronLeftIcon className="size-4" />
            <span className="text-xs font-semibold">Previous lesson</span>
          </button>
          <div className="flex gap-1">
            <button
              onClick={() => {
                completeClass({ sessionID, email });
                router.refresh();
              }}
              className="flex w-40 items-center justify-center gap-2 rounded-md border border-ctwPurple bg-white px-3 py-2 text-ctwPurple"
            >
              <CheckCircleIcon className="size-4" />
              <span className="text-xs font-semibold">I Completed This</span>
            </button>
            <button
              onClick={() => {
                if (nextSessionName) {
                  router.push(
                    `/product/courses/${slugify(courseName)}/class/${slugify(nextSessionName)}`,
                  );
                }
              }}
              className="flex w-40 items-center justify-center gap-2 rounded-md border border-ctwPurple bg-white px-3 py-2 text-ctwPurple"
            >
              <NoSymbolIcon className="size-4" />
              <span className="text-xs font-semibold">Skip - Not Relevant</span>
            </button>
          </div>
          <button
            onClick={() => {
              completeClass({ sessionID, email });
              if (nextSessionName) {
                router.push(
                  `/product/courses/${slugify(courseName)}/class/${slugify(nextSessionName)}`,
                );
              } else {
                router.refresh();
              }
            }}
            className="flex w-40 items-center justify-center gap-2 rounded-md bg-ctwPurple px-3 py-2 text-white"
          >
            <span className="text-xs font-semibold">Next lesson</span>
            <ChevronRightIcon className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
