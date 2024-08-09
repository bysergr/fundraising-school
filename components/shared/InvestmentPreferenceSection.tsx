'use client';

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
  title,
  className,
  listItems,
}: {
  title: string;
  className?: string;
  listItems: string[];
}) {
  return (
    <div className="my-5 flex flex-col gap-2">
      <h4 className="my-auto ml-2 text-sm font-bold leading-5">{title}</h4>
      <ul className="my-auto flex flex-wrap gap-2 px-5">
        {listItems.map((item) => (
          <li
            key={item}
            className={className || 'rounded-full px-2 py-1 text-sm font-semibold text-gray-500'}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
