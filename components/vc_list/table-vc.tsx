'use client';

import { useEffect, useState } from 'react';
import RowTableVC from '@/components/vc_list/table_vc/row-table-vc';
import { useAppStore } from '@/providers/app-store-providers';
import useLazyFundsLoad from '@/hooks/useLazyFundsLoad';
import { useUserStore } from '@/providers/user-store-provider';
import ClipLoader from 'react-spinners/ClipLoader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import '../search_list/styles.css';
import type { VCProfile } from '@/models/vc_list';
import { FaBuildingCircleExclamation } from 'react-icons/fa6';
import { IoPaperPlaneOutline } from 'react-icons/io5';

export default function TableVC({ email_linkedin }: { email_linkedin: string }) {
  const {
    funds_page: page,
    setFundPage: setPage,
    funds,
    setFunds,
    setFundTotal: setTotal,
    selected_funds_filter_options: selected_filter_options,
  } = useAppStore((state) => state);

  const { email } = useUserStore((state) => state);
  const { showNext } = useLazyFundsLoad({ email_linkedin });
  const [activeTab, setActiveTab] = useState('general');
  const [favorites, setFavorites] = useState<VCProfile[]>([]);

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

    fetch(`/api/funds?${url_params}`, {
      method: 'GET',
      cache: 'no-store',
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

  useEffect(() => {
    if (funds.length === 0) {
      return;
    }

    const fav = funds.filter(({ favorite }) => favorite);
    setFavorites(fav);
  }, [funds]);

  return (
    <div className="flex h-[30vh] w-full items-center justify-center ">
      <div className="flex w-full flex-col items-center justify-center space-y-2.5">
        <h3 className="text-center text-2xl font-bold leading-7 text-gray-500">Coming Soon</h3>
        <IoPaperPlaneOutline className="size-10 text-[#818181]" />
        <p className="px-5 text-center text-base font-normal leading-6 text-gray-500">
          coming Soon
        </p>
      </div>
    </div>
  );

  return (
    <div>
      <div className="mt-5 size-full min-h-[50vh]">
        <Tabs
          value={activeTab}
          defaultValue="matches"
          className="flex flex-col items-start justify-center space-y-10"
          id="myMatchesTab"
        >
          <TabsList className="grid w-full grid-cols-2 bg-transparent md:max-w-xl ">
            <TabsTrigger
              activeTab={activeTab}
              onClick={() => setActiveTab('general')}
              className="font-bold"
              value="general"
            >
              General list
            </TabsTrigger>
            <TabsTrigger
              activeTab={activeTab}
              onClick={() => setActiveTab('favorites')}
              className="font-bold"
              value="favorites"
            >
              Favorites
            </TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="!mt-3 h-screen w-full">
            <div className="w-full ">
              <div className="flex flex-wrap items-center gap-5 px-0 py-4">
                {loading && (
                  <tr className="mr-12 grid  h-full w-[calc(100%-3rem)] place-content-center">
                    <td className="m-auto block">
                      <ClipLoader color="#637EE0" size={55} />
                    </td>
                  </tr>
                )}

                {funds.length === 0 && !loading ? (
                  <div className="flex h-[30vh] w-full items-center justify-center ">
                    <div className="flex w-full flex-col items-center justify-center space-y-2.5">
                      <h3 className="text-center text-2xl font-bold leading-7 text-gray-500">
                        Empty
                      </h3>
                      <FaBuildingCircleExclamation className="size-10 text-[#818181]" />
                      <p className="px-5 text-center text-base font-normal leading-6 text-gray-500">
                        No funds found
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    {funds.map((fund, index) => {
                      if (index === funds.length - 1) {
                        return <RowTableVC refProp={showNext} vc_profile={fund} key={fund.id} />;
                      }

                      return <RowTableVC vc_profile={fund} key={fund.id} />;
                    })}
                  </>
                )}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="favorites" className="!mt-3 h-screen w-full">
            <div className="w-full ">
              <div className="flex flex-wrap items-center gap-5 px-0 py-4 ">
                {favorites.length === 0 ? (
                  <div className="flex h-[30vh] w-full items-center justify-center ">
                    <div className="flex w-full flex-col items-center justify-center space-y-2.5">
                      <h3 className="text-center text-2xl font-bold leading-7 text-gray-500">
                        Empty
                      </h3>
                      <FaBuildingCircleExclamation className="size-10 text-[#818181]" />
                      <p className="px-5 text-center text-base font-normal leading-6 text-gray-500">
                        No funds added to favorites
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    {favorites.map((favorite) => (
                      <RowTableVC vc_profile={favorite} key={favorite.id} />
                    ))}
                  </>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
