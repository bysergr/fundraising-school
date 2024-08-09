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
  FaBuilding,
  FaChartLine,
  FaPiggyBank,
  FaMoneyBillWave,
  FaRocket,
  FaCogs,
  FaRobot,
  FaUserFriends,
  FaStar,
  FaHeart,
} from 'react-icons/fa';
import { IconType } from 'react-icons/lib';

const NameToIconMap: Record<string, IconType> = {
  // Audience
  'Ecosystem Enthusiastic': FaHeart,
  Corporativos: FaBuilding,
  'Investors (VCs-LPs-Angel Investor-etc)': FaPiggyBank,
  Founders: FaRocket,

  // Event Types
  Workshop: FaTools,
  'Conferencia/Panel': FaMicrophone,
  Café: FaCoffee,
  Almuerzo: FaUtensils,
  'Happy Hour': FaBeer,
  'Evento Deportivo': FaFootballBall,
  Cena: FaUtensils,
  Fiesta: FaMusic,
  Coctel: FaCocktail,
  'Desayuno/Brunch': FaCoffee,

  // Topics
  'Ecosistema de Startups y Emprendimiento': FaRocket,
  'Inteligencia Artificial': FaRobot,
  'Tecnología e Innovación aplicada a otras industrias': FaCogs,
  Fintech: FaChartLine,
  'Experiencias únicas': FaStar,
  'Inversión y Levantamiento de Capital': FaMoneyBillWave,
  'Inclusión y Diversidad': FaUserFriends,

  // Goals
  Socializar: FaHandshake,
  Escuchar: FaMicrophone,
  Divertirme: FaMusic,
  Construir: FaTools,
  'Aprender de expertos': FaGraduationCap,
  'Hacer Networking': FaHandshake,
  'Conectar con VCs y/o Founders': FaHandHoldingUsd,
  'Inspirarte de cracks': FaLightbulb,

  // Fallback
  Unknown: FaQuestion,
};

export default function FilterIcons({ label, className }: { label: string; className?: string }) {
  const IconComponent = NameToIconMap[label] || FaQuestion; // FaQuestion as a fallback
  return <IconComponent className={className} />;
}
