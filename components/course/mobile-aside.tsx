'use client';

import { CourseInfo } from '@/models/course';
import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';
import Progress from './progress';
import Lesson from './lesson';
import clsx from 'clsx';

export default function MobileAside({ courseData }: { courseData: CourseInfo }) {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (openModal) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [openModal]);

  useEffect(() => {
    const dialog = document.getElementById('modal-course');

    if (!dialog) return;

    dialog.addEventListener(
      'click',
      function (event) {
        const rect = dialog.getBoundingClientRect();
        const isInDialog =
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width;

        if (!isInDialog) {
          dialogRef.current?.close();
          setOpenModal(false);
        }
      },
      { once: true },
    );
  }, [openModal]);

  return (
    <>
      <button
        onClick={() => setOpenModal(!openModal)}
        className="ml-auto mr-2 rounded-md bg-ctwPurple p-1 lg:hidden"
      >
        <Bars3BottomRightIcon className="size-6 text-white" />
      </button>

      <dialog
        id="modal-course"
        className={clsx(
          openModal ? 'block' : 'hidden',
          'bottom-0 right-0 top-auto mx-0 block h-[calc(100%-185px)] w-full max-w-[100vw] overflow-y-auto bg-neutral-50 px-4 py-8',
        )}
        ref={dialogRef}
      >
        <div className="flex w-full justify-end">
          <button onClick={() => setOpenModal(false)}>
            <XMarkIcon className="size-5 text-black" />
          </button>
        </div>
        <Progress progress={courseData.progress} />
        <Lesson courseData={courseData} />
      </dialog>
    </>
  );
}
