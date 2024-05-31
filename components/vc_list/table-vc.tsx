import { MouseEventHandler } from 'react';

interface TableVCProps {
  onVCClick: MouseEventHandler<HTMLTableRowElement>;
}

export default function TableVC({ onVCClick }: TableVCProps) {
  return (
    <table className="mt-4 size-full">
      <thead className="h-14">
        <tr className="flex justify-between text-lg text-fsGray">
          <th>6068 Investors</th>
          <th>Fav</th>
          <th>Match</th>
          <th>Geography</th>
          <th>Checks</th>
          <th>Stages</th>
        </tr>
      </thead>
      <tbody className="block h-[calc(100%-9.85rem)] overflow-y-auto">
        {Array(10)
          .fill(null)
          .map((_, index) => (
            <tr
              key={index}
              className="flex h-36 cursor-pointer justify-between" // Añadir cursor-pointer aquí
              onClick={onVCClick}
            >
              <td>VC 1</td>
              <td>Location 1</td>
              <td>Investment Stage 1</td>
              <td>Check Size 1</td>
              <td>Investment Focus 1</td>
              <td>Stages</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
