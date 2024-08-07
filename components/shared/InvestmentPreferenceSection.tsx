'use client';

function InvestmentPreferenceIcon({
  IconComponent,
  title,
}: {
  IconComponent: React.ComponentType<{
    className?: string;
  }>;
  title: string;
}) {
  return (
    <div className="flex">
      <div className="my-auto size-fit rounded-md bg-ctwLightPurple p-2">
        <IconComponent className="size-8 text-ctwLightGreen" />
      </div>
      <p className="my-auto ml-2 w-24 text-sm font-bold leading-5">{title}</p>
    </div>
  );
}

/**
 * Renders an item of the "Investment Preferences" section of the VC modal or Startup modal (found by clicking a row in the VC List or Startups List page).
 *
 * @param {Object} props - The component props.
 * @param {React.ComponentType} props.IconComponent - The component to render as the icon.
 * @param {string} props.title - The title of the section.
 * @param {string[]} props.listItems - The list of investment preferences.
 * @returns {JSX.Element} The rendered component.
 */
export function InvestmentPreferenceSection({
  IconComponent,
  title,
  listItems,
}: {
  IconComponent: React.ComponentType<{
    className?: string;
  }>;
  title: string;
  listItems: string[];
}) {
  return (
    <div className="mb-10 flex gap-16">
      <InvestmentPreferenceIcon IconComponent={IconComponent} title={title} />
      <ul className="my-auto flex w-[65%] flex-wrap gap-2">
        {listItems.map((item) => (
          <li
            key={item}
            className="rounded-lg bg-ctwLightGreen/35 px-2 py-1 text-sm font-semibold text-ctwDarkGreen2"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
