'use client';

import React, { useEffect, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { CourseInfo } from '@/models/course';
import Link from 'next/link';
import { slugify } from '@/utils/validations';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

export default function Lesson({ courseData }: { courseData: CourseInfo }) {
  const [visibleSection, setVisibleSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    if (visibleSection === section) {
      setVisibleSection(null);
    } else {
      setVisibleSection(section);
    }
  };

  const pathname = usePathname();

  useEffect(() => {
    courseData.course.modules.map((module) => {
      module.classes.map((classObj) => {
        if (pathname.includes(slugify(classObj.title))) {
          setVisibleSection(module.title);
        }
      });
    });
  }, [courseData.course.modules, pathname]);

  return (
    <div>
      <h3 className="text-3xl font-bold">Lesson</h3>
      <ul className="list-none">
        {courseData.course.modules.map((module) => (
          <>
            <li key={module.title} className="py-2">
              <strong onClick={() => toggleSection(module.title)} className="cursor-pointer">
                <div className="flex items-center">
                  <ChevronDownIcon className="mr-2 size-5" />
                  <p>{module.title}</p>
                </div>
              </strong>
            </li>
            {visibleSection === module.title && (
              <ul className="list-inside list-disc pl-4">
                {module.classes.map((classObj) => (
                  <li
                    key={classObj.title}
                    className={clsx(
                      'my-2 flex items-center px-2 py-1 text-sm',
                      pathname.includes(slugify(classObj.title)) && 'rounded-md bg-ctwDarkGreen/20',
                    )}
                  >
                    <input
                      disabled
                      type="checkbox"
                      checked={classObj.taken}
                      className={clsx(
                        'form-checkbox mr-2 size-5 rounded border-gray-300 text-green-500 focus:ring-green-500',
                      )}
                    />
                    <Link
                      href={`/matchmaking/courses/${slugify(courseData.course.title)}/class/${slugify(classObj.title)}`}
                    >
                      {classObj.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </>
        ))}
      </ul>
    </div>
  );
}
