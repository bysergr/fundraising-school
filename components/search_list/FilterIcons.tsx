import {
  FaCocktail,
  FaMicrophone,
  FaTools,
  FaFootballBall,
  FaQuestion,
  FaBeer,
  FaUtensils,
  FaCoffee,
  FaMusic,
  FaHandshake,
  FaGraduationCap,
  FaHandHoldingUsd,
  FaLightbulb,
  FaUsers,
  FaBuilding,
  FaChartLine,
  FaPiggyBank,
  FaUniversity,
  FaFemale,
  FaBriefcase,
  FaMoneyBillWave,
  FaRocket,
  FaCogs,
} from 'react-icons/fa';
import { IconType } from 'react-icons/lib';

const LabelIconMap: Record<string, IconType> = {
  Coctel: FaCocktail,
  'Conference/Panel': FaMicrophone,
  Workshop: FaTools,
  'Sports event': FaFootballBall,
  'Happy Hour': FaBeer,
  Lunch: FaUtensils,
  Desayuno: FaCoffee,
  Party: FaMusic,
  'Hacer Networking': FaHandshake,
  'Aprender de expertos': FaGraduationCap,
  'Conectar con VCs': FaHandHoldingUsd,
  'Inspirarte de cracks': FaLightbulb,
  'Construyendo Ecosistema': FaUsers,
  Corporate: FaBuilding,
  Fintech: FaChartLine,
  "VC's": FaPiggyBank,
  Academy: FaUniversity,
  'Women in Tech': FaFemale,
  Empleability: FaBriefcase,
  'Levantamiento Capital': FaMoneyBillWave,
  'Startup Ecosystem': FaRocket,
  Innovation: FaCogs,
};

export default function FilterIcons({ label, className }: { label: string; className?: string }) {
  const IconComponent = LabelIconMap[label] || FaQuestion; // FaQuestion as a fallback
  return <IconComponent className={className} />;
}
