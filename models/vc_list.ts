interface CheckSize {
  id: number;
  size: string;
}

interface Country {
  id: number;
  name: string;
}

interface Partner {
  id: number;
  name: string;
  role: string;
  email: string;
  linkedin: string;
  website: string | null;
  crunch_base: string;
  description: string;
  photo: string;
  twitter: string;
  vc_link: string;
}

interface Round {
  id: number;
  stage: string;
}

interface Sector {
  id: number;
  name: string;
}

interface VCProfile {
  id: number;
  name: string;
  description: string;
  website: string;
  linkedin: string;
  contact: string;
  photo: string;
  crunch_base: string;
  location: string;
  twitter: string;
  check_size: CheckSize[];
  countries: Country[];
  partners: Partner[];
  rounds: Round[];
  sectors: Sector[];
  favorite: boolean;
}

export type { CheckSize, Country, Partner, Round, Sector, VCProfile };
