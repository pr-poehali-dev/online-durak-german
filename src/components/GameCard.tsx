import { useState } from 'react';
import { Card } from '@/components/ui/card';

interface GameCardProps {
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades';
  value: string;
  rank: number;
  isFlipped?: boolean;
  onClick?: () => void;
  className?: string;
}

export function GameCard({ suit, value, rank, isFlipped = false, onClick, className = '' }: GameCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const getSuitColor = () => {
    return suit === 'hearts' || suit === 'diamonds' ? 'text-red-600' : 'text-gray-800';
  };
  
  const getSuitSymbol = () => {
    switch (suit) {
      case 'hearts': return '♥';
      case 'diamonds': return '♦';
      case 'clubs': return '♣';
      case 'spades': return '♠';
    }
  };
  
  const getDisplayValue = () => {
    if (value === 'German') return 'G';
    if (value === 'Yarik') return 'Y';
    if (value === 'Roma') return 'R';
    return value;
  };
  
  const getCardName = () => {
    if (value === 'German') return 'German';
    if (value === 'Yarik') return 'Yarik';
    if (value === 'Roma') return 'Roma';
    return value;
  };

  if (isFlipped) {
    return (
      <Card 
        className={`w-16 h-24 flex items-center justify-center cursor-pointer transition-all duration-300 
          bg-gradient-to-br from-game-brown to-game-darkred border-2 border-game-golden
          hover:scale-105 ${className}`}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="text-game-golden text-2xl font-bold">?</div>
      </Card>
    );
  }

  return (
    <Card 
      className={`w-16 h-24 flex flex-col items-center justify-between p-2 cursor-pointer transition-all duration-300 
        bg-gradient-to-br from-white to-gray-50 border-2 border-game-golden
        hover:scale-105 hover:shadow-lg ${className}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`text-xs font-bold ${getSuitColor()}`}>
        {getDisplayValue()}
      </div>
      
      <div className="flex flex-col items-center">
        <div className={`text-2xl ${getSuitColor()}`}>
          {getSuitSymbol()}
        </div>
        {(value === 'German' || value === 'Yarik' || value === 'Roma') && (
          <div className="text-xs font-semibold text-game-brown mt-1">
            {getCardName()}
          </div>
        )}
      </div>
      
      <div className={`text-xs font-bold transform rotate-180 ${getSuitColor()}`}>
        {getDisplayValue()}
      </div>
    </Card>
  );
}