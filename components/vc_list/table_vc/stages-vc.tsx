import { Round } from '@/models/vc_list';
import { nanoid } from 'nanoid';

export default function stages({ stages }: { stages: Round[] }) {
  const rounds = new Set(stages.map((stage) => stage.stage));

  return (
    <td className="grid w-44 place-content-center">
      {Array.from(rounds).length === 0 && (
        <div key={nanoid()} className="w-44 px-2 py-1 text-center">
          😔
        </div>
      )}

      {Array.from(rounds).map((round) => {
        return (
          <span
            key={nanoid()}
            className="bg-ctwLightGreen/35 text-ctwDarkGreen mx-0.5 mt-1 w-full rounded-sm px-2 py-1 text-center text-xs font-semibold"
          >
            {round}
          </span>
        );
      })}
    </td>
  );
}
