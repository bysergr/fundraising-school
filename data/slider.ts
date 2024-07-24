import { Profiles, Startups } from '@/data/assets';

const sliderProfiles = {
  'david-velez': {
    name: 'David Vélez',
    message: 'Who do you want to learn from',
    nameCompany: 'Nubank',
    companyPosition: 'Founder & CEO',
    srcImageProfile: Profiles.david_velez_profile,
    srcImageCompany: Startups.nubank,
    imageProfileProps: { width: 160, height: 160 },
    imageCompanyProps: { width: 50, height: 25 },
  },
  'simon-borrero': {
    name: 'Simón Borrero',
    message: 'Who you will learn from',
    nameCompany: 'Rappi',
    companyPosition: 'Founder & CEO',
    srcImageProfile: Profiles.simon_borrero_profile,
    srcImageCompany: Startups.rappi,
    imageProfileProps: { width: 160, height: 160 },
    imageCompanyProps: { width: 80, height: 30 },
  },
};

export default sliderProfiles;
