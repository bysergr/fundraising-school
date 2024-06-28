import { CheckSize } from '@/models/vc_list';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { nanoid } from 'nanoid';

export default function CheckSizeVC({ check_size }: { check_size: CheckSize[] }) {
  if (check_size.length === 0) {
    return (
      <td className="grid w-36 place-content-center">
        <div className="w-36 px-2 py-1 text-center">😔</div>
      </td>
    );
  }

  return (
    <td className="grid w-36 place-content-center">
      <div className="tooltip w-36 px-2 py-1">
        {check_size.map((checkSize, index) => {
          if (index > 1) {
            return;
          }

          return (
            <p key={nanoid()} className="text-center text-xs text-black">
              {checkSize.size}
            </p>
          );
        })}
        <div className="mt-0.5 flex justify-center">
          {check_size.length > 1 && (
            <>
              <span className="text-center text-xs text-black" key={nanoid()}>
                +{check_size.length - 1}
              </span>

              <InformationCircleIcon
                className="mx-1 mb-0.5 inline-block size-4 text-center"
                key={nanoid()}
              />
            </>
          )}
        </div>

        <span className="tooltiptext">{check_size.map((check) => check.size).join(', ')}</span>
      </div>
    </td>
  );
}
