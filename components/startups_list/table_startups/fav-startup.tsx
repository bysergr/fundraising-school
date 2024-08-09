'use client';

import clsx from 'clsx';
import { StarIcon } from '@heroicons/react/24/outline';
import { useAppStore } from '@/providers/app-store-providers';
import { useUserStore } from '@/providers/user-store-provider';

const IS_FAV_STYLES = 'fill-ctwLightPurple text-ctwLightPurple hover:fill-white hover:text-black';
const IS_NOT_FAV_STYLES = 'text-black hover:fill-ctwLightPurple hover:text-ctwLightPurple';

export default function FavStartup({
  startup_id,
  favorite,
  is_modal = false,
  size = 'size-5',
}: {
  startup_id: number;
  favorite: boolean;
  size?: string;
  is_modal?: boolean;
}) {
  const { setFavoriteStartup: setFavorite, openStartupModal: openModal } = useAppStore(
    (state) => state,
  );
  const { email } = useUserStore((state) => state);

  const handleClick = () => {
    setFavorite(startup_id, !favorite);

    fetch(`/api/startups/fav/toggle`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ favorite: !favorite, startup_id: startup_id, email: email }),
    })
      .then((response) => {
        if (!response.ok) {
          setFavorite(startup_id, favorite);
          return;
        }

        if (response.status !== 200 && response.status !== 201) {
          setFavorite(startup_id, favorite);
          return;
        }

        if (is_modal) {
          openModal(startup_id);
        }
      })
      .catch(() => {
        setFavorite(startup_id, favorite);
      });
  };

  if (is_modal) {
    return (
      <div className="grid place-content-center">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleClick();
          }}
        >
          <StarIcon
            className={clsx(
              'transition duration-100 ease-in-out',
              size,
              favorite ? IS_FAV_STYLES : IS_NOT_FAV_STYLES,
            )}
          />
        </button>
      </div>
    );
  }

  return (
    <td className="grid w-8 place-content-center">
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleClick();
        }}
      >
        <StarIcon
          className={clsx(
            'transition duration-100 ease-in-out',
            size,
            favorite ? IS_FAV_STYLES : IS_NOT_FAV_STYLES,
          )}
        />
      </button>
    </td>
  );
}
