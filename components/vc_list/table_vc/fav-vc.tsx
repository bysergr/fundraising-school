'use client';

import clsx from 'clsx';
import { StarIcon } from '@heroicons/react/24/outline';
import { useAppStore } from '@/providers/app-store-providers';
import { useUserStore } from '@/providers/user-store-provider';

export default function FavVC({
  fund_id,
  favorite,
  is_modal = false,
  size = 'size-5',
}: {
  fund_id: number;
  favorite: boolean;
  size?: string;
  is_modal?: boolean;
}) {
  const { setFavoriteFund: setFavorite, openFundModal: openModal } = useAppStore((state) => state);
  const { email } = useUserStore((state) => state);

  const handleClick = () => {
    setFavorite(fund_id, !favorite);

    fetch(`/api/funds/fav/toggle`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ favorite: !favorite, fund_id: fund_id, email: email }),
    })
      .then((response) => {
        if (!response.ok) {
          setFavorite(fund_id, favorite);
          return;
        }

        if (response.status !== 200 && response.status !== 201) {
          setFavorite(fund_id, favorite);
          return;
        }

        if (is_modal) {
          openModal(fund_id);
        }
      })
      .catch(() => {
        setFavorite(fund_id, favorite);
      });
  };

  if (is_modal) {
    return (
      <div className="grid place-content-center">
        <button onClick={handleClick}>
          <StarIcon
            className={clsx(
              'transition duration-100 ease-in-out',
              size,
              favorite
                ? 'fill-fsPurple text-fsPurple hover:fill-white hover:text-black'
                : 'text-black hover:fill-fsPurple hover:text-fsPurple',
            )}
          />
        </button>
      </div>
    );
  }

  return (
    <td className="grid w-8 place-content-center">
      <button onClick={handleClick}>
        <StarIcon
          className={clsx(
            'transition duration-100 ease-in-out',
            size,
            favorite
              ? 'fill-fsPurple text-fsPurple hover:fill-white hover:text-black'
              : 'text-black hover:fill-fsPurple hover:text-fsPurple',
          )}
        />
      </button>
    </td>
  );
}
