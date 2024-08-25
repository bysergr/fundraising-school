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

interface Traction {
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

type InvestmentAnalysis = {
  data: {
    justification: string;
    recommendation: string;
    alignment_score: number;
    confidence_level: "low" | "medium" | "high";
  };
  usage: {
    input_tokens: number;
    output_tokens: number;
    cache_read_input_tokens: number;
    cache_creation_input_tokens: number;
  };
  startupId: number;
};

interface StartupProfile {
  id: number;
  name: string;
  calendly: string;
  deck: string;
  email: string;
  fund_raised: string;
  description: string;
  phone_number: string;
  country_code: string;
  website: string;
  linkedin: string;
  photo: string;
  country: Country;
  sector: Sector;
  traction: Traction;
  round: Round;
  favorite: boolean;
  one_sentence_description: string;
  recommendation: InvestmentAnalysis;
}

interface Founder {
  followers_amount: number;
  photo_url: string | null;
  email: string;
  industry: string | null;
  terms_conditions: string | null;
  id: number;
  summary: string | null;
  created_at: string;
  first_name: string | null;
  role: string | null;
  updated_at: string;
  last_name: string | null;
  headline: string | null;
  deleted_at: string | null;
  nickname: string;
  linkedin_url: string;
  round_id: number | null;
  contact_email: string | null;
  location: string;
  phone_number: string;
  country_code: string;
  seeking_capital: boolean | null;
}

export type { CheckSize, Country, Partner, Round, Sector, VCProfile, StartupProfile, Founder };
