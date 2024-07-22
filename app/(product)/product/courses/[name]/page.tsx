import TitleSection from '@/components/vc_list/title-section';

import Summary from '@/components/course/summary';
import Progress from '@/components/course/progress';
import Lesson from '@/components/course/lesson';
import VideoSection from '@/components/course/video-section';

export default async function Page() {
  const source = `
  # David Velez's Session

## Summary:
David Velez shared his journey from working in his father's button factory to founding a successful bank in Brazil. He emphasized the importance of persistence, customer-centric approaches, and building teams with diverse backgrounds. He discussed the challenges of raising capital, especially in an environment where traditional investors were skeptical, and highlighted the necessity of defining success through the learning journey rather than just the outcome.

## Highlights:
1. **Early Entrepreneurial Influences:** David's entrepreneurial spirit was nurtured from a young age, working in his father's factory.
2. **Customer-Centric Focus:** He drew inspiration from companies like Amazon and Disney, emphasizing the long-term value of treating customers well.
3. **Team Building:** David favored hiring people outside the traditional banking sector to foster innovation and fresh perspectives.
4. **Raising Capital:** He shared the challenges of raising funds for a Brazilian bank, particularly from skeptical Silicon Valley investors.
5. **Defining Success:** Success is defined by the journey and learning experiences, not just by the final outcome of the startup.

# Mike Maples' Session 

## Summary:
Mike Maples discussed the different stages of VC funding, the importance of product-market fit, and the pitfalls of focusing on growth before establishing value. He highlighted the need for founders to have a unique insight into the future and the ability to navigate that insight to create a product that meets desperate needs. He also emphasized the importance of avoiding vanity metrics and ensuring sustainable, value-driven growth.

## Highlights: 
1. **Stages of VC Funding:** Mike provided an overview of the various funding stages and what VCs look for at each stage.
2. **Product-Market Fit:** He stressed the importance of achieving product-market fit before aggressively pursuing growth.
3. **Value Before Growth:** Founders should focus on creating real value and understanding their unique offering before scaling.
4. **Unique Insights:** Successful startups often have a unique, non-consensus insight about the future that drives their innovation.
5. **Avoiding Vanity Metrics:** Mike cautioned against focusing on metrics that look good on paper but do not contribute to long-term success.`;

  return (
    <>
      <TitleSection
        icon="camera"
        nameSection="Courses"
        description="All you need for fundraising"
      />
      <div className="grid h-[calc(100vh-84px-0.25rem)] w-full grid-cols-courseLayout bg-white pl-7">
        <div className="h-full overflow-y-auto pb-12 pr-4 pt-4">
          <VideoSection
            currentLesson={6}
            moduleName="Lives"
            numberOfLessons={32}
            sessionName="Welcoming session with David Velez & Mike Maples"
            videoId={'P-LCtajEr7Q'}
          />
          <div className="pt-2">
            <Summary sourceText={source} />
          </div>
        </div>
        <div className="h-full overflow-y-auto p-4">
          <Progress />
          <Lesson />
        </div>
      </div>
    </>
  );
}
