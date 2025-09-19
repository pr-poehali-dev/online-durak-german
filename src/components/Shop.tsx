import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GameCard } from './GameCard';
import Icon from '@/components/ui/icon';

interface CardSkin {
  id: string;
  name: string;
  description: string;
  price: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  preview: string;
  owned: boolean;
}

interface ShopProps {
  gCoins: number;
  onPurchase: (skinId: string, price: number) => void;
}

export function Shop({ gCoins, onPurchase }: ShopProps) {
  const [selectedCategory, setSelectedCategory] = useState('skins');

  const cardSkins: CardSkin[] = [
    {
      id: 'classic',
      name: 'Классический',
      description: 'Стандартный вид карт',
      price: 0,
      rarity: 'common',
      preview: 'default',
      owned: true
    },
    {
      id: 'golden',
      name: 'Золотой блеск',
      description: 'Карты с золотым свечением',
      price: 500,
      rarity: 'rare',
      preview: 'golden',
      owned: false
    },
    {
      id: 'neon',
      name: 'Неоновые',
      description: 'Яркие неоновые карты',
      price: 1000,
      rarity: 'epic',
      preview: 'neon',
      owned: false
    },
    {
      id: 'diamond',
      name: 'Бриллиантовые',
      description: 'Роскошные карты с кристаллами',
      price: 2500,
      rarity: 'legendary',
      preview: 'diamond',
      owned: false
    },
    {
      id: 'fire',
      name: 'Огненные',
      description: 'Карты с языками пламени',
      price: 1500,
      rarity: 'epic',
      preview: 'fire',
      owned: false
    },
    {
      id: 'ice',
      name: 'Ледяные',
      description: 'Холодные ледяные карты',
      price: 1200,
      rarity: 'epic',
      preview: 'ice',
      owned: false
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-800';
      case 'rare': return 'bg-blue-100 text-blue-800';
      case 'epic': return 'bg-purple-100 text-purple-800';
      case 'legendary': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300';
      case 'rare': return 'border-blue-400';
      case 'epic': return 'border-purple-400';
      case 'legendary': return 'border-yellow-400';
      default: return 'border-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="ShoppingBag" size={24} />
              Магазин скинов
            </div>
            <div className="flex items-center gap-2 bg-yellow-100 px-3 py-1 rounded-full">
              <Icon name="Coins" size={16} className="text-yellow-600" />
              <span className="font-bold text-lg">{gCoins.toLocaleString()}</span>
              <span className="text-sm">G-coin</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cardSkins.map((skin) => (
              <Card 
                key={skin.id} 
                className={`border-2 ${getRarityBorder(skin.rarity)} hover:shadow-lg transition-all duration-300`}
              >
                <CardContent className="p-4">
                  <div className="text-center mb-4">
                    <div className="flex justify-center mb-3">
                      <GameCard
                        suit="hearts"
                        value="German"
                        rank={12}
                        className={`
                          ${skin.id === 'golden' ? 'bg-gradient-to-br from-yellow-200 to-yellow-400 border-yellow-500' : ''}
                          ${skin.id === 'neon' ? 'bg-gradient-to-br from-pink-400 to-purple-500 border-pink-400' : ''}
                          ${skin.id === 'diamond' ? 'bg-gradient-to-br from-cyan-200 to-blue-300 border-cyan-400' : ''}
                          ${skin.id === 'fire' ? 'bg-gradient-to-br from-red-400 to-orange-500 border-red-500' : ''}
                          ${skin.id === 'ice' ? 'bg-gradient-to-br from-blue-200 to-cyan-300 border-blue-400' : ''}
                        `}
                      />
                    </div>
                    <h3 className="font-bold text-lg mb-1">{skin.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{skin.description}</p>
                    
                    <Badge className={`mb-3 ${getRarityColor(skin.rarity)}`}>
                      {skin.rarity === 'common' && 'Обычный'}
                      {skin.rarity === 'rare' && 'Редкий'}
                      {skin.rarity === 'epic' && 'Эпический'}
                      {skin.rarity === 'legendary' && 'Легендарный'}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    {skin.owned ? (
                      <Button 
                        variant="outline" 
                        className="w-full bg-green-50 border-green-300 text-green-700"
                        disabled
                      >
                        <Icon name="Check" size={16} className="mr-2" />
                        Куплено
                      </Button>
                    ) : (
                      <>
                        <div className="flex items-center justify-center gap-2 text-lg font-bold">
                          <Icon name="Coins" size={18} className="text-yellow-600" />
                          <span>{skin.price.toLocaleString()}</span>
                        </div>
                        <Button 
                          className="w-full bg-game-golden hover:bg-game-brown text-white"
                          disabled={gCoins < skin.price}
                          onClick={() => onPurchase(skin.id, skin.price)}
                        >
                          {gCoins >= skin.price ? (
                            <>
                              <Icon name="ShoppingCart" size={16} className="mr-2" />
                              Купить
                            </>
                          ) : (
                            <>
                              <Icon name="Lock" size={16} className="mr-2" />
                              Недостаточно монет
                            </>
                          )}
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Раздел с бонусными предложениями */}
      <Card className="bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Gift" size={24} />
            Бонусные предложения
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-green-300 bg-green-50">
              <CardContent className="p-4 text-center">
                <Icon name="Trophy" size={32} className="mx-auto mb-2 text-green-600" />
                <h3 className="font-bold mb-2">Ежедневный бонус</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Заходи каждый день и получай бонусы!
                </p>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Получить +200 G-coin
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-purple-300 bg-purple-50">
              <CardContent className="p-4 text-center">
                <Icon name="Users" size={32} className="mx-auto mb-2 text-purple-600" />
                <h3 className="font-bold mb-2">Пригласи друга</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Получи 1000 G-coin за каждого друга!
                </p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  Пригласить
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}