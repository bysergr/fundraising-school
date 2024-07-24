'use client';

import { useEffect, useState } from 'react';
import RowTableVC from '@/components/vc_list/table_vc/row-table-vc';
import { useAppStore } from '@/providers/app-store-providers';
import useLazyFundsLoad from '@/hooks/useLazyFundsLoad';
import { useUserStore } from '@/providers/user-store-provider';
import ClipLoader from 'react-spinners/ClipLoader';

export default function TableVC({ email_linkedin }: { email_linkedin: string }) {
  const {
    funds_total: total,
    funds_page: page,
    setFundPage: setPage,
    funds,
    setFunds,
    setFundTotal: setTotal,
    selected_funds_filter_options: selected_filter_options,
  } = useAppStore((state) => state);

  const { email } = useUserStore((state) => state);
  const { showNext } = useLazyFundsLoad({ email_linkedin });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (funds.length !== 0) {
      return;
    }

    const url_params = new URLSearchParams({ page: page.toString(), limit: '25' });

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
    if (selected_filter_options.search_term) {
      url_params.append('fund_term', selected_filter_options.search_term);
    }

    if (email.trim() === '') {
      url_params.append('user_email', email_linkedin);
    } else {
      url_params.append('user_email', email);
    }

    setLoading(true);

    fetch(`/api/funds?` + url_params, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.data) {
          setFunds(data.data);
        }

        setTotal(data.total);
        setPage(data.page);
      })
      .catch((error) => console.error('Error:', error))
      .finally(() => setLoading(false));
  }, [
    funds.length,
    page,
    selected_filter_options,
    setFunds,
    setPage,
    setTotal,
    email,
    email_linkedin,
  ]);

  return (
    <table className="mt-6 size-full">
      <thead className="border-b border-neutral-200">
        <tr className="my-4 mr-16 flex items-center justify-between text-xs uppercase [&>th]:text-left [&>th]:text-black">
          <th className="w-80">Investors ({total})</th>
          <th className="w-8">
            <p className="text-center">Fav</p>
          </th>
          <th className="w-56">
            <p className="text-center">Geography</p>
          </th>
          <th className="w-36">
            <p className="text-center">Checks</p>
          </th>
          <th className="w-44">
            <p className="text-center">Stages</p>
          </th>
        </tr>
      </thead>
      <tbody className="mt-6 block h-[calc(100%-11.9rem)] overflow-y-scroll [&>tr]:mr-12 [&>tr]:flex [&>tr]:justify-between">
        {loading && (
          <tr className="mr-12 grid  h-full w-[calc(100%-3rem)] place-content-center">
            <td className="m-auto block">
              <ClipLoader color="#637EE0" size={55} />
            </td>
          </tr>
        )}

        {funds.map((fund, index) => {
          if (index === funds.length - 1) {
            return <RowTableVC refProp={showNext} vc_profile={fund} key={fund.id} />;
          }

          return <RowTableVC vc_profile={fund} key={fund.id} />;
        })}
      </tbody>
    </table>
  );
}
