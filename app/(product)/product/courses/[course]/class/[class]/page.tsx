import TitleSection from '@/components/vc_list/title-section';

import Summary from '@/components/course/summary';
import Progress from '@/components/course/progress';
import Lesson from '@/components/course/lesson';
import VideoSection from '@/components/course/video-section';

import { redirect } from 'next/navigation';
import { CourseInfo } from '@/models/course';

import { authOptions } from '@/utils/auth';
import { getServerSession, Session } from 'next-auth';
import { slugify } from '@/utils/validations';

export default async function Page({ params }: { params: { course: string; class: string } }) {
  if (params.course.trim() === '') {
    redirect('/product/courses');
  }

  if (params.class.trim() === '') {
    redirect('/product/courses');
  }
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

  const courseData = coursesData
    .filter((courseInfo) => slugify(courseInfo.course.title) === params.course.trim())
    .at(0);

  if (courseData === undefined) {
    redirect('/product/courses');
  }

  const classes = courseData.course.modules.flatMap((module) => module.classes);

  let classID = 0;
  let classRelativeIndex = 0;

  const currentClass = classes
    .filter((classObj, id) => {
      if (slugify(classObj.title) === params.class) {
        classID = classObj.id;
        classRelativeIndex = id + 1;

        return true;
      }

      return false;
    })
    .at(0);

  if (currentClass === undefined) {
    redirect('/product/courses');
  }

  const currentModule = courseData.course.modules.find((module) =>
    module.classes.includes(currentClass),
  );

  let prevClassName: string | null = null;
  let nextClassName: string | null = null;

  const nextClassResponse = await fetch(
    `${process.env.BACKEND_GATEWAY_URL}/course/module/${currentModule?.id}/classes/${classID}/next`,
    {
      method: 'GET',
    },
  );

  if (nextClassResponse.ok) {
    try {
      const nextClass = await nextClassResponse.json();

      nextClassName = nextClass.title;
    } catch (error) {
      console.error('Error');
    }
  }

  const prevClassResponse = await fetch(
    `${process.env.BACKEND_GATEWAY_URL}/course/module/${currentModule?.id}/classes/${classID}/prev`,
    {
      method: 'GET',
    },
  );

  if (prevClassResponse.ok) {
    try {
      const prevClass = await prevClassResponse.json();

      prevClassName = prevClass.title;
    } catch (error) {
      console.error('Error');
    }
  }

  return (
    <>
      <TitleSection
        icon="camera"
        nameSection="Courses"
        description="All you need for fundraising"
      />
      <div className="grid h-[calc(100vh-84px-0.25rem)] w-full bg-white pl-7 lg:grid-cols-courseLayout">
        <div className="h-full overflow-y-auto pb-12 pr-4 pt-4">
          <VideoSection
            nextSessionName={nextClassName}
            prevSessionName={prevClassName}
            currentLesson={classRelativeIndex}
            courseName={courseData.course.title}
            numberOfLessons={classes.length}
            sessionName={currentClass?.title}
            sessionID={currentClass?.id}
            email={data.user?.email as string}
            videoId={currentClass?.video_link}
          />
          <div className="pt-2">
            <Summary sourceText={currentClass?.description} />
          </div>
        </div>
        <div className="hidden h-full overflow-y-auto p-4 lg:block">
          <Progress progress={courseData.progress} />
          <Lesson courseData={courseData} />
        </div>
      </div>
    </>
  );
}
