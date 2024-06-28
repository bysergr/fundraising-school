import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { nanoid } from 'nanoid';

import { Country } from '@/models/vc_list';

export default function CountriesVC({ countries }: { countries: Country[] }) {
  if (countries.length === 0) {
    return (
      <td className="grid w-56 place-content-center">
        <div className="w-20 rounded-sm bg-secondLightFsPurple px-2 py-1 text-center text-xs font-semibold text-fsPurple">
          <span>😔</span>
        </div>
      </td>
    );
  }

  return (
    <td className="grid w-56 place-content-center">
      <div className="tooltip rounded-sm bg-secondLightFsPurple px-2 py-1 text-xs font-semibold text-fsPurple">
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

        <span className="tooltiptext">{countries.map((country) => country.name).join(', ')}</span>
      </div>
    </td>
  );
}
