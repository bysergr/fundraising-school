import { useEffect, useRef } from 'react';
import { StarIcon, LinkIcon } from '@heroicons/react/24/outline';

interface InfoVCProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InfoVC({ isOpen, onClose }: InfoVCProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen && dialog) {
      dialog.showModal();
    } else if (dialog) {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 overflow-y-auto rounded-lg bg-white p-5 shadow-lg md:inset-y-0 md:right-0 md:h-full md:w-1/2 md:p-20"
    >
      <button
        onClick={onClose}
        className="absolute right-6 top-6 p-2 text-3xl text-gray-400 hover:text-gray-600 md:p-4 md:text-4xl"
      >
        &times;
      </button>
      <div className="flex h-full flex-col">
        <div className="mt-auto">
          <div className="mb-10 ml-5 flex flex-col justify-between md:w-9/12 md:flex-row md:items-center">
            <img
              src="https://img.freepik.com/foto-gratis/gotas-agua-hojas_23-2147787448.jpg?size=626&ext=jpg&ga=GA1.1.87170709.1707091200&semt=ais"
              alt="Profile"
              className="h-20 w-20 rounded-lg"
            />
            <div className="mt-5 md:ml-10 md:mr-44 md:mt-0">
              <h2 className="text-2xl font-bold md:text-2xl">No Brand</h2>
              <p className="text-xl font-semibold text-gray-600 md:text-2xl">Family Office</p>
              <div className="mt-1 flex justify-around">
                <div className="h-6 w-6">
                  <LinkIcon />
                </div>
                <img
                  src="https://img.icons8.com/?size=100&id=98960&format=png&color=000000"
                  alt="linkedIn"
                  className="h-6 w-6"
                />
                <img
                  src="https://img.icons8.com/?size=100&id=102925&format=png&color=000000"
                  alt="twitter"
                  className="h-6 w-6"
                />
                <img
                  src="https://www.svgrepo.com/show/305916/crunchbase.svg"
                  alt="crunchbase"
                  className="h-5 w-5"
                />
              </div>
              <p className="mt-3 text-lg font-semibold">30% Match</p>
            </div>
            <div className="h-7 w-7 text-gray-600">
              <StarIcon />
            </div>
          </div>
          <p className="mb-4 text-base text-gray-700 md:text-lg">
            Invests in the people, products, and processes that power commerce in the physical and
            digital world because when you layer technology over daily life, it transforms how the
            real world works.
          </p>
          <div className="mb-4 flex flex-col md:flex-row">
            <h3 className="mb-2 text-lg font-bold text-gray-800 md:mb-0 md:mr-10">
              Best way to get in touch
            </h3>
            <p className="text-lg font-bold text-fsPurple">hey@alpaca.vc</p>
          </div>
          <hr className="mb-6 mt-2" />
        </div>
        <div className="mt-auto flex flex-col justify-between">
          <div className="mb-10 flex flex-col md:flex-row">
            <img src="/images/vc_info/handshake.png" alt="handshake" className="h-10 w-10" />
            <h3 className="ml-3 w-full text-lg font-semibold text-gray-800 md:w-1/2">
              Rounds they invest in
            </h3>
            <p className="text-base text-fsPurple">Pre-Seed, Seed, Series A, Series B</p>
          </div>
          <hr className="mb-4 mt-0" />
          <div className="mb-10 flex flex-col md:flex-row">
            <img src="/images/vc_info/dollar.png" alt="dollar" className="h-10 w-10" />
            <h3 className="ml-3 w-full text-lg font-semibold text-gray-800 md:w-1/2">
              Check size range(s)
            </h3>
            <p className="text-base text-fsPurple">$3M - $10M</p>
          </div>
          <hr className="mb-4 mt-0" />
          <div className="mb-10 flex flex-col md:flex-row">
            <img src="/images/vc_info/magnifier.png" alt="magnifier" className="h-10 w-10" />
            <h3 className="ml-3 w-full text-lg font-semibold text-gray-800 md:w-1/2">
              Sectors they invest in
            </h3>
            <p className="text-base text-fsPurple">
              Logistics, B2C/E-Commerce, Future of Work, Web3
            </p>
          </div>
          <hr className="mb-4 mt-0" />
          <div className="mb-10 flex flex-col md:flex-row">
            <img src="/images/vc_info/map.png" alt="map" className="h-10 w-10" />
            <h3 className="ml-3 w-full text-lg font-semibold text-gray-800 md:w-1/2">
              Geographies they invest in
            </h3>
            <p className="text-base text-fsPurple">
              Kenia, Nigeria, Brasil, Canada, Colombia, México, USA
            </p>
          </div>
        </div>
        <div className="mt-auto flex flex-col justify-around space-y-4 p-4 md:flex-row md:space-x-4 md:space-y-0">
          <div className="flex flex-col items-center rounded-lg bg-gray-50 p-8">
            <img
              src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
              alt="Profile"
              className="mb-2 w-28 h-28 rounded-full"
            />
            <p className="font-bold text-gray-800">Matthew Jackson</p>
            <p className="text-sm text-gray-600">Head of Products</p>
            <div className="mt-1 flex w-full justify-around">
              <div className="w-6 h-6">
                <LinkIcon />
              </div>
              <img
                src="https://img.icons8.com/?size=100&id=98960&format=png&color=000000"
                alt="linkedIn"
                className="h-6 w-6"
              />
              <img
                src="https://img.icons8.com/?size=100&id=102925&format=png&color=000000"
                alt="twitter"
                className="h-6 w-6"
              />
            </div>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-gray-50 p-8">
            <img
              src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
              alt="Profile"
              className="mb-2 w-28 h-28 rounded-full"
            />
            <p className="font-bold text-gray-800">Matthew Jackson</p>
            <p className="text-sm text-gray-600">Head of Products</p>
            <div className="mt-1 flex w-full justify-around">
              <div className="w-6 h-6">
                <LinkIcon />
              </div>
              <img
                src="https://img.icons8.com/?size=100&id=98960&format=png&color=000000"
                alt="linkedIn"
                className="h-6 w-6"
              />
              <img
                src="https://img.icons8.com/?size=100&id=102925&format=png&color=000000"
                alt="twitter"
                className="h-6 w-6"
              />
            </div>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-gray-50 p-8">
            <img
              src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
              alt="Profile"
              className="mb-2 w-28 h-28 rounded-full"
            />
            <p className="font-bold text-gray-800">Matthew Jackson</p>
            <p className="text-sm text-gray-600">Head of Products</p>
            <div className="mt-1 flex w-full justify-around">
              <div className="w-6 h-6">
                <LinkIcon />
              </div>
              <img
                src="https://img.icons8.com/?size=100&id=98960&format=png&color=000000"
                alt="linkedIn"
                className="h-6 w-6"
              />
              <img
                src="https://img.icons8.com/?size=100&id=102925&format=png&color=000000"
                alt="twitter"
                className="h-6 w-6"
              />
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
