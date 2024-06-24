import { useFundStore } from '@/providers/funds-store-providers';
import { useUserStore } from '@/providers/user-store-provider';
import { useCallback, useRef } from 'react';

function useLazyLoad({ email_linkedin }: { email_linkedin: string }) {
  const { page, setPage, addFunds, funds, total, selected_filter_options } = useFundStore(
    (state) => state,
  );

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
          if (funds.length === total) {
            return;
          }

          const newPage = page + 1;

          const url_params = new URLSearchParams({ page: newPage.toString(), limit: '25' });

          if (selected_filter_options.round) {
            url_params.append('round', selected_filter_options.round);
          }
          if (selected_filter_options.check_size) {
            url_params.append('check_size', selected_filter_options.check_size);
          }
          if (selected_filter_options.sector) {
            url_params.append('sector', selected_filter_options.sector);
          }
          if (selected_filter_options.location) {
            url_params.append('location', selected_filter_options.location);
          }

          if (email.trim() === '') {
            url_params.append('user_email', email_linkedin);
          } else {
            url_params.append('user_email', email);
          }

          fetch(`/api/funds?` + url_params, {
            method: 'GET',
          })
            .then((response) => response.json())
            .then((data) => {
              addFunds(data.data);
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
    [addFunds, page, selected_filter_options, setPage, funds, total, email, email_linkedin],
  );

  return { showNext };
}

export default useLazyLoad;
