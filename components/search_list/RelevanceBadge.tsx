import React from 'react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { LuInfo } from 'react-icons/lu';

interface RelevanceBadgeProps {
  score: number;
  explanation?: string;
}

const RelevanceBadge: React.FC<RelevanceBadgeProps> = ({ score, explanation }) => {
  const { color, text, emoji, bgColor, hoverBgColor, textColor } = React.useMemo(() => {
    if (score >= 90) {
      return {
        color: 'green',
        text: 'Excelente ajuste',
        emoji: '🎯',
        bgColor: 'bg-green-100',
        hoverBgColor: 'hover:bg-green-200',
        textColor: 'text-green-800',
      };
    } else if (score >= 70) {
      return {
        color: 'yellow',
        text: 'Buen ajuste',
        emoji: '👍',
        bgColor: 'bg-yellow-100',
        hoverBgColor: 'hover:bg-yellow-200',
        textColor: 'text-yellow-800',
      };
    } else if (score >= 50) {
      return {
        color: 'orange',
        text: 'Algo relevante',
        emoji: '🤔',
        bgColor: 'bg-orange-100',
        hoverBgColor: 'hover:bg-orange-200',
        textColor: 'text-orange-800',
      };
    } else {
      return {
        color: 'red',
        text: 'Menos relevante',
        emoji: '🔍',
        bgColor: 'bg-red-100',
        hoverBgColor: 'hover:bg-red-200',
        textColor: 'text-red-800',
      };
    }
  }, [score]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Badge
            variant="outline"
            className={`
              ${bgColor} ${textColor} ${hoverBgColor}
              flex cursor-help items-center space-x-1 rounded-full
              px-3 py-1 text-sm
              font-medium transition-colors duration-200 ease-in-out
            `}
          >
            <span className="mr-1" role="img" aria-label={`Relevance: ${text}`}>
              {emoji}
            </span>
            <span>{text}</span>
            {/* <span className="ml-1 font-bold">({score}%)</span> */}
            {/* <LuInfo size={16} className="ml-1" /> */}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{explanation || 'No additional explanation available'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default RelevanceBadge;
