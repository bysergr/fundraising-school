type ListItem = {
  title: string;
  description: string;
};

type Card = {
  title: string;
  list: ListItem[];
};

const cards: Card[] = [
  {
    title: 'Investors',
    list: [
      {
        title: 'Discover Opportunities',
        description:
          'Access a curated list of startups that are raising capital and align with your investment criteria. Our platform makes it easy to find the most promising ventures in Latin America.',
      },
      {
        title: 'Arrange Meetings',
        description:
          'Set up one-on-one sessions with startups to discuss potential investments and collaborations. Use our scheduling tools to maximize your efficiency.',
      },
      {
        title: 'Network Efficiently',
        description:
          'Streamline your networking process and connect with key players in the tech ecosystem. Engage in meaningful conversations that can lead to strategic partnerships.',
      },
      {
        title: 'High-Quality Deal Flow',
        description:
          'Discover high-potential startups across various sectors. Our platform ensures you have access to the best opportunities available.',
      },
    ],
  },
  {
    title: 'Startups',
    list: [
      {
        title: 'Find the Right Investors',
        description:
          'Connect with top-tier funds that are actively investing in Latin America. Our platform helps you find the best match for your business.',
      },
      {
        title: 'Access to Capital',
        description:
          'Engage with a diverse group of investors ready to fund promising ventures. Secure the capital you need to grow your startup.',
      },
      {
        title: 'Strategic Connections',
        description:
          'Build relationships with key industry players and fellow entrepreneurs. Expand your network and create opportunities for collaboration and growth.',
      },
      {
        title: 'Showcase Your Deck',
        description:
          'Share your pitch deck with investors directly through our platform. Ensure your business gets the visibility it deserves.',
      },
    ],
  },
];

export default function FeaturesFS() {
  return (
    <section className="relative bg-[#f5f5f5] px-4 py-12 text-center sm:px-6 md:py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="h2 mb-2">Grasp This Unique Opportunity</h2>
        <p className="pb-12 text-xl text-gray-600 md:pb-16">
          Be part of a transformative week that promises to redefine the tech landscape in Latin
          America. Connect, innovate, and grow with us.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {cards.map((card, index) => (
            <article
              key={index}
              className="m-2 flex flex-col gap-2 rounded-xl border-gray-300 bg-white p-6 text-left"
            >
              <h3 className="text-lg font-semibold">{card.title}</h3>
              <hr className="my-2 w-full border-gray-300" />
              <ul>
                {card.list.map((item, index) => (
                  <li className="mt-3 text-sm leading-6 text-gray-600" key={index}>
                    <span className="font-semibold text-black">{item.title}:</span>{' '}
                    {item.description}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
