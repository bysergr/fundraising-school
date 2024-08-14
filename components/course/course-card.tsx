import type { CourseInfo } from '@/models/course';
import { slugify } from '@/utils/validations';
import Image from 'next/image';
import Link from 'next/link';

export default function CourseCard({ courseData }: { courseData: CourseInfo }) {
  let link_class = '#';

  try {
    const first_class_name = courseData.course.modules[0].classes[0].title;
    link_class =
      courseData.last_class_name !== null
        ? `/matchmaking/courses/${slugify(courseData.course.title)}/class/${slugify(courseData.last_class_name)}`
        : `/matchmaking/courses/${slugify(courseData.course.title)}/class/${slugify(first_class_name)}`;
  } catch (error) {
    link_class =
      courseData.last_class_name !== null
        ? `/matchmaking/courses/${slugify(courseData.course.title)}/class/${slugify(courseData.last_class_name)}`
        : `/matchmaking/courses/#`;
  }

  return (
    <article
      key={courseData.course.title}
      className="flex size-full flex-col rounded-md bg-gray-100"
    >
      <div className="h-[180px] w-full">
        <Image
          className="block h-[180px] w-full rounded-t-md object-cover object-top "
          src={courseData.course.photo}
          alt={courseData.course.title}
          width={280}
          height={180}
        />
      </div>
      <div className="m-2 flex h-full flex-col justify-between">
        <div className="">
          <div className="flex h-2.5 overflow-hidden rounded bg-ctwGreen/40 text-xs">
            <div
              style={{ width: courseData.progress }}
              className="flex flex-col justify-center whitespace-nowrap bg-ctwGreen text-center text-white shadow-none"
            ></div>
          </div>
          <span className="text-xs text-gray-500">{courseData.progress}</span>
          <h3 className="text-base font-semibold">{courseData.course.title}</h3>
          <p className="mt-1 text-xs text-gray-600">{courseData.course.description}</p>
        </div>
        <Link
          className="mb-1 mt-6 block w-full rounded-lg bg-ctwLightPurple py-1 text-center font-semibold text-white"
          href={link_class}
        >
          View Course
        </Link>
      </div>
    </article>
  );
}
