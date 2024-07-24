import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export type Speaker = {
  name: string;
  description: string;
  srcImageProfile: StaticImport;
  srcImageStartUp: StaticImport;
  imageStartUpSize: { width: number; height: number };
};

export type SliderProfileProps = {
  name: string;
  message: string;
  nameCompany: string;
  companyPosition: string;
  srcImageProfile: StaticImport;
  srcImageCompany: StaticImport;
  imageProfileProps: { width: number; height: number };
  imageCompanyProps: { width: number; height: number };
};
