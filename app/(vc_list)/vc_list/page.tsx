'use client';

import { useState, MouseEventHandler } from 'react';
import DownloadVC from '@/components/vc_list/download-vc';
import FilterBar from '@/components/vc_list/filter-bar';
import SearchInput from '@/components/vc_list/search-input';
import TableVC from '@/components/vc_list/table-vc';
import TitleSection from '@/components/vc_list/title-section';
import InfoVC from '@/components/vc_list/vc_info';

export default function Page() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleVCClick: MouseEventHandler<HTMLTableRowElement> = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <TitleSection nameSection="VC List" />
      <div className="size-full bg-white px-7">
        <div className="flex items-end justify-between pt-4">
          <SearchInput />
          <DownloadVC />
        </div>
        <FilterBar />
        <TableVC onVCClick={handleVCClick} />
        <InfoVC isOpen={isDialogOpen} onClose={handleDialogClose} />
      </div>
    </>
  );
}
