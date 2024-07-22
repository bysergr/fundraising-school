import CourseCard from '@/components/course/course-card';
import TitleSection from '@/components/vc_list/title-section';
import { CourseInfo } from '@/models/course';
import { authOptions } from '@/utils/auth';
import { getServerSession, Session } from 'next-auth';

export default async function Page() {
  const data: Session = (await getServerSession(authOptions)) as Session;

  const url_params = new URLSearchParams({ user_email: data.user?.email as string });

  const coursesResponse = await fetch(
    `${process.env.BACKEND_GATEWAY_URL}/courses?` + url_params.toString(),
    {
      method: 'GET',
    },
  );

  if (!coursesResponse.ok) {
    return <div>Error loading courses</div>;
  }

  const coursesData: CourseInfo[] = await coursesResponse.json();

  return (
    <>
      <TitleSection
        icon="camera"
        nameSection="Courses"
        description="All you need for fundraising"
      />
      <div className="h-[calc(100vh-0.25rem)] w-full overflow-y-auto bg-white px-7 pt-7">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-4 overflow-y-auto">
          {coursesData.map((courseData) => (
            <CourseCard key={courseData.course.id} courseData={courseData} />
          ))}
        </div>
      </div>
    </>
  );
}
