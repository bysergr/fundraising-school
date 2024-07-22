'use client';

import { YouTubeEmbed } from '@next/third-parties/google';

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  NoSymbolIcon,
} from '@heroicons/react/24/outline';

export default function VideoSection({
  videoId,
  moduleName,
  sessionName,
  numberOfLessons,
  currentLesson,
}: {
  videoId: string;
  moduleName: string;
  sessionName: string;
  numberOfLessons: number;
  currentLesson: number;
}) {
  return (
    <div>
      <h3 className="text-xl font-bold text-fsGray">{moduleName}</h3>
      <h2 className="mb-2 text-3xl font-bold">{sessionName}</h2>
      <div className="mb-4">
        <p className="text-sm font-semibold">{`Lesson ${currentLesson} of ${numberOfLessons}`}</p>
        <YouTubeEmbed videoid={videoId} height={400} params="controls=1&autoplay=1" />
        <div className="mt-3 flex flex-row justify-between">
          <button
            onClick={() => console.log('Previous...')}
            className="flex w-40 items-center justify-center gap-2 rounded-md bg-ctwPurple px-3 py-2 text-white"
          >
            <ChevronLeftIcon className="size-4" />
            <span className="text-xs font-semibold">Previous lesson</span>
          </button>
          <div className="flex gap-1">
            <button
              onClick={() => console.log('Completed...')}
              className="flex w-40 items-center justify-center gap-2 rounded-md border border-ctwPurple bg-white px-3 py-2 text-ctwPurple"
            >
              <CheckCircleIcon className="size-4" />
              <span className="text-xs font-semibold">I Completed This</span>
            </button>
            <button
              onClick={() => console.log('Skip...')}
              className="flex w-40 items-center justify-center gap-2 rounded-md border border-ctwPurple bg-white px-3 py-2 text-ctwPurple"
            >
              <NoSymbolIcon className="size-4" />
              <span className="text-xs font-semibold">Skip - Not Relevant</span>
            </button>
          </div>
          <button
            onClick={() => console.log('Next...')}
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
