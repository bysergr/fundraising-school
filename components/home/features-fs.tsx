type Card = {
  title: string;
  description: string;
};

const cards: Card[] = [
  {
    title: 'Masterclasses',
    description:
      "Navigate your fundraising journey with precision. Our masterclasses are more than just courses—they’re a hands-on, strategic playbook delivered by those who've excelled in the arena. Each session is a step towards turning your vision into a venture backed by the best.",
  },
  {
    title: 'Community',
    description:
      "Thrive in a collective of innovators. Our community is your network, sounding board, and support system all in one. Engage in rich, insightful dialogues with entrepreneurs and founders that challenge and champion your pitch, strategy, and growth, ensuring you're investor-ready.",
  },
];

export default function FeaturesFS() {
  return (
    <section className="relative bg-[#f5f5f5] px-4 py-12 text-center sm:px-6 md:py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="h2 mb-2" data-aos="zoom-y-out">
          Unlock your full potential
        </h2>
        <p className="pb-12 text-xl text-gray-600 md:pb-16" data-aos="zoom-y-out">
          Elevate your startup journey with tailored masterclasses, tactical expertise and
          transformative insights, designed to amplify your success in today&apos;s competitive
          business landscape.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {cards.map((card, index) => (
            <article
              key={index}
              className="m-2 flex flex-col gap-2 rounded-xl border-gray-300 bg-white p-6 text-left"
              data-aos="zoom-y-out"
            >
              <h3 className="text-lg font-semibold">{card.title}</h3>
              <hr className="my-2 w-full border-gray-300" />
              <p className="leading-6 text-gray-600">{card.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
