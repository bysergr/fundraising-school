import type { Speaker } from '@/models/speaker';
import { Profiles, Startups } from '@/data/assets';

const Speakers: Speaker[] = [
  {
    name: 'Brynne McNulty',
    description: 'Founder & CEO',
    srcImageProfile: Profiles.brynne_mcnulty_profile,
    srcImageStartUp: Startups.habi,
    imageStartUpSize: {
      height: 50,
      width: 50,
    },
  },
  {
    name: 'Mercedes Bent',
    description: 'Partner',
    srcImageProfile: Profiles.mercedes_bent_profile,
    srcImageStartUp: Startups.lightspeed,
    imageStartUpSize: {
      height: 50,
      width: 140,
    },
  },
  {
    name: 'Courtney Powell',
    description: 'Managing Partner & COO',
    srcImageProfile: Profiles.courtney_powell_profile,
    srcImageStartUp: Startups.logo_500,
    imageStartUpSize: {
      height: 50,
      width: 140,
    },
  },
  {
    name: 'David Vélez',
    description: 'Founder & CEO',
    srcImageProfile: Profiles.david_velez_profile,
    srcImageStartUp: Startups.nubank,
    imageStartUpSize: {
      height: 50,
      width: 60,
    },
  },
  {
    name: 'Simón Borrero',
    description: 'Founder & CEO',
    srcImageProfile: Profiles.simon_borrero_profile,
    srcImageStartUp: Startups.rappi,
    imageStartUpSize: {
      height: 50,
      width: 70,
    },
  },
  {
    name: 'Marcelo Claure',
    description: 'Founder & CEO',
    srcImageProfile: Profiles.marcelo_claure_profile,
    srcImageStartUp: Startups.claure_group,
    imageStartUpSize: {
      height: 80,
      width: 80,
    },
  },
  {
    name: 'Nico Berman',
    description: 'Partner',
    srcImageProfile: Profiles.nico_berman_profile,
    srcImageStartUp: Startups.kaszek,
    imageStartUpSize: {
      height: 50,
      width: 100,
    },
  },
  {
    name: 'Paulo Passoni',
    description: 'Managing Partner',
    srcImageProfile: Profiles.paulo_passoni_profile,
    srcImageStartUp: Startups.valor,
    imageStartUpSize: {
      height: 50,
      width: 100,
    },
  },
  {
    name: 'Mike Maples, Jr',
    description: 'Managing Partner',
    srcImageProfile: Profiles.mike_maples_jr_profile,
    srcImageStartUp: Startups.floodgate,
    imageStartUpSize: {
      height: 50,
      width: 140,
    },
  },
  {
    name: 'Carlo Dapuzzo',
    description: 'General Partner',
    srcImageProfile: Profiles.carlos_dapuzzo_profile,
    srcImageStartUp: Startups.monashees,
    imageStartUpSize: {
      height: 50,
      width: 140,
    },
  },
  {
    name: 'Connie Grossi',
    description: 'Leadership & Talent Advisor',
    srcImageProfile: Profiles.connie_grossi_profile,
    srcImageStartUp: Startups.leadership_advisor,
    imageStartUpSize: {
      height: 68,
      width: 68,
    },
  },
  {
    name: 'Rodrigo Baer',
    description: 'Co-founder and Managing Partner',
    srcImageProfile: Profiles.rodrigo_baer_profile,
    srcImageStartUp: Startups.upload,
    imageStartUpSize: {
      height: 70,
      width: 100,
    },
  },
  {
    name: 'Enrique Conde',
    description: 'Partner',
    srcImageProfile: Profiles.enrique_conde_profile,
    srcImageStartUp: Startups.hk,
    imageStartUpSize: {
      height: 50,
      width: 170,
    },
  },
  {
    name: 'Gabriel Vasquez',
    description: 'Investment Partner',
    srcImageProfile: Profiles.gabriel_vasquez_profile,
    srcImageStartUp: Startups.a16z,
    imageStartUpSize: {
      height: 45,
      width: 45,
    },
  },
  {
    name: 'Juan Felipe Muñoz',
    description: 'Partner',
    srcImageProfile: Profiles.juan_felipe_muñoz_profile,
    srcImageStartUp: Startups.britten,
    imageStartUpSize: {
      height: 60,
      width: 100,
    },
  },
  {
    name: 'Keith Ferrazzi',
    description: 'Author of "Never Eat Alone"',
    srcImageProfile: Profiles.keith_ferrazzi_profile,
    srcImageStartUp: Startups.green,
    imageStartUpSize: {
      height: 70,
      width: 140,
    },
  },
  {
    name: 'Ronen Olshansky',
    description: 'Co-Founder & CEO',
    srcImageProfile: Profiles.ronan_final_profile,
    srcImageStartUp: Startups.connected,
    imageStartUpSize: {
      height: 68,
      width: 68,
    },
  },
];

export default Speakers;
