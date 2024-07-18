import { useAppStore } from '@/providers/app-store-providers';
import { useUserStore } from '@/providers/user-store-provider';
import { useCallback, useRef } from 'react';

function useLazyStartupsLoad({ email_linkedin }: { email_linkedin: string }) {
  const {
    startups_page: page,
    setStartupPage: setPage,
    addStartups,
    startups,
    startups_total: total,
    selected_startups_filter_options: selected_filter_options,
  } = useAppStore((state) => state);

  const { email } = useUserStore((state) => state);

  const lastItem = useRef<IntersectionObserver | null>(null);

  const showNext = useCallback(
    (element: HTMLTableRowElement | null) => {
      if (!element) return;

      if (lastItem.current) {
        lastItem.current.disconnect();
      }

      const intersection = (entries: IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting) {
          if (startups.length === total) {
            return;
          }

          const newPage = page + 1;

          const url_params = new URLSearchParams({ page: newPage.toString(), limit: '25' });

          if (selected_filter_options.traction) {
            url_params.append('traction', selected_filter_options.traction);
          }
          if (selected_filter_options.sector) {
            url_params.append('sector', selected_filter_options.sector);
          }
          if (selected_filter_options.location) {
            url_params.append('country', selected_filter_options.location);
          }

          if (email.trim() === '') {
            url_params.append('user_email', email_linkedin);
          } else {
            url_params.append('user_email', email);
          }

          fetch(`/api/startups?` + url_params, {
            method: 'GET',
          })
            .then((response) => response.json())
            .then((data) => {
              addStartups(data.data);
              setPage(newPage);
            })
            .catch((error) => console.error('Error:', error));
        }
      };

      lastItem.current = new IntersectionObserver(intersection, {
        rootMargin: '400px',
      });

      lastItem.current.observe(element);
    },
    [addStartups, page, selected_filter_options, setPage, startups, total, email, email_linkedin],
  );

  return { showNext };
}

export default useLazyStartupsLoad;
