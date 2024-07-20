'use client';

import { useEffect, useState } from 'react';
import RowTableStartups from '@/components/startups_list/table_startups/row-table-startups';
import { useAppStore } from '@/providers/app-store-providers';
import useLazyStartupsLoad from '@/hooks/useLazyStartupsLoad';
import { useUserStore } from '@/providers/user-store-provider';
import ClipLoader from 'react-spinners/ClipLoader';

export default function TableStartups({ email_linkedin }: { email_linkedin: string }) {
  const {
    startups_total: total,
    startups_page: page,
    setStartupPage: setPage,
    startups,
    setStartups,
    setStartupTotal: setTotal,
    selected_startups_filter_options: selected_filter_options,
  } = useAppStore((state) => state);

  const { email } = useUserStore((state) => state);
  const { showNext } = useLazyStartupsLoad({ email_linkedin });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (startups.length !== 0) {
      return;
    }

    if (page === undefined) {
      setPage(1);
      return;
    }

    const url_params = new URLSearchParams({ page: page.toString(), limit: '25' });

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

    setLoading(true);

    fetch(`/api/startups?` + url_params, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.data) {
          setStartups(data.data);
        }

        setTotal(data.total);
        setPage(data.page);
      })
      .catch((error) => console.error('Error:', error))
      .finally(() => setLoading(false));
  }, [
    startups.length,
    page,
    selected_filter_options,
    setStartups,
    setPage,
    setTotal,
    email,
    email_linkedin,
  ]);

  return (
    <table className="mt-6 size-full">
      <thead className="h-14 border-b border-neutral-200">
        <tr className="mr-16 flex items-center justify-between  [&>th]:text-left [&>th]:text-neutral-500">
          <th className="w-60">
            {total} <br />
            Startups
          </th>
          <th className="w-8">
            <p className="text-center">Fav</p>
          </th>
          <th className="w-72">
            <p className="text-center"> </p>
          </th>
          <th className="w-36">
            <p className="text-center">Traction</p>
          </th>
          <th className="w-44">
            <p className="text-center">Looking for</p>
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

        {startups.map((startup, index) => {
          if (index === startups.length - 1) {
            return (
              <RowTableStartups refProp={showNext} startups_profile={startup} key={startup.id} />
            );
          }

          return <RowTableStartups startups_profile={startup} key={startup.id} />;
        })}
      </tbody>
    </table>
  );
}
