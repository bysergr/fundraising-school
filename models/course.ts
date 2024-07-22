interface Class {
  id: number;
  title: string;
  description: string;
  video_link: string;
}

interface Module {
  id: number;
  title: string;
  classes: Class[];
}

interface Course {
  id: number;
  photo: string;
  title: string;
  description: string;
  modules: Module[];
}

interface CourseInfo {
  course: Course;
  progress: string;
  last_class_name: string;
}

export type { Course, CourseInfo, Module, Class };
