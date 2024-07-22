import type { Course } from '@/models/course';
import Image from 'next/image';
import Link from 'next/link';

export default function CourseCard({ course }: { course: Course }) {
  return (
    <article key={course.title} className="flex h-fit w-full flex-col rounded-md bg-gray-100">
      <Image
        className="rounded-t-md"
        src={course.imageSrc}
        alt={course.title}
        width={269}
        height={180}
      />
      <div className="m-2">
        <div className="flex h-2 overflow-hidden rounded bg-lightFsPurple text-xs">
          <div
            style={{ width: '65%' }}
            className="flex flex-col justify-center whitespace-nowrap bg-fsPurple text-center text-white shadow-none"
          ></div>
        </div>
        <span className="text-xs text-gray-500">9/32</span>
        <h3 className="text-base font-semibold">{course.title}</h3>
        <p className="text-xs font-normal">{course.description}</p>
        <Link
          className="mb-1 mt-4 block w-full rounded-lg bg-fsPurple py-1 text-center font-semibold text-white"
          href="/product/courses/test"
        >
          View Course
        </Link>
      </div>
    </article>
  );
}
