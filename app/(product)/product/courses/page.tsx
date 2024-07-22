import CourseCard from '@/components/course/course-card';
import TitleSection from '@/components/vc_list/title-section';
import { Course } from '@/models/course';

export default async function Page() {
  const courses: Course[] = [
    {
      id: 1,
      imageSrc:
        'https://images.pexels.com/photos/17247893/pexels-photo-17247893/free-photo-of-ramas-primavera-arbol-flores.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Course 1',
      description: 'This is the description of course 1',
    },
    {
      id: 2,
      imageSrc:
        'https://images.pexels.com/photos/15378172/pexels-photo-15378172/free-photo-of-ciudad-amanecer-panorama-urbano-skyline.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Course 2',
      description: 'This is the description of course 2',
    },
  ];

  return (
    <>
      <TitleSection
        icon="camera"
        nameSection="Courses"
        description="All you need for fundraising"
      />
      <div className="grid h-[calc(100vh-0.25rem)] w-full grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 bg-white px-7 pt-7">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </>
  );
}
