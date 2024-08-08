import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { nanoid } from 'nanoid';

import { Country } from '@/models/vc_list';

const CONTAINER_STYLES = 'py-1 text-xs font-normal';

export default function CountriesVC({ countries }: { countries: Country[] }) {
  if (countries.length === 0) {
    return (
      <div className="">
        <div className={`${CONTAINER_STYLES} w-20`}>
          <span>😔</span>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className={`${CONTAINER_STYLES} tooltip`}>
        {countries.slice(0, 6).map((country, index) => {
          if (index === 3) {
            if (index === countries.length - 1) {
              return (
                <span key={nanoid()}>
                  <br />
                  {country.name + ' '}
                </span>
              );
            }

            return (
              <span key={nanoid()}>
                <br />
                {country.name + ', '}
              </span>
            );
          }

          if (index === countries.length - 1 || index === 5) {
            return <span key={nanoid()}>{country.name + ' '}</span>;
          }

          return <span key={nanoid()}>{country.name + ', '}</span>;
        })}

        {countries.length > 6 && (
          <>
            <span className="text-black" key={nanoid()}>
              +{countries.length - 6}
            </span>

            <InformationCircleIcon className="mx-1 mb-0.5 inline-block size-4" key={nanoid()} />
          </>
        )}

        <span className="tooltiptext left-[-10px] max-h-24 overflow-hidden text-ellipsis whitespace-pre-wrap break-words">
          {countries.map((country) => country.name).join(', ')}
        </span>
      </div>
    </div>
  );
}
