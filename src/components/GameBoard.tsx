import { useState } from 'react';
import { GameCard } from './GameCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface GameMessage {
  id: string;
  player: string;
  message: string;
  timestamp: Date;
}

interface GameState {
  playerHand: Array<{suit: 'hearts' | 'diamonds' | 'clubs' | 'spades', value: string, rank: number}>;
  opponentHandSize: number;
  deck: number;
  trumpSuit: 'hearts' | 'diamonds' | 'clubs' | 'spades';
  currentPlayer: 'player' | 'opponent';
  gamePhase: 'attack' | 'defend' | 'discard';
}

export function GameBoard() {
  const [gameState] = useState<GameState>({
    playerHand: [
      { suit: 'hearts', value: '7', rank: 7 },
      { suit: 'clubs', value: 'German', rank: 12 },
      { suit: 'diamonds', value: 'Yarik', rank: 13 },
      { suit: 'spades', value: 'Roma', rank: 14 },
      { suit: 'hearts', value: '10', rank: 10 },
      { suit: 'diamonds', value: '9', rank: 9 },
    ],
    opponentHandSize: 6,
    deck: 24,
    trumpSuit: 'spades',
    currentPlayer: 'player',
    gamePhase: 'attack'
  });

  const [chatMessages, setChatMessages] = useState<GameMessage[]>([
    { id: '1', player: 'Алексей', message: 'Привет! Удачной игры!', timestamp: new Date() },
    { id: '2', player: 'Вы', message: 'И тебе тоже!', timestamp: new Date() },
    { id: '3', player: 'Алексей', message: 'Начинаем с семерки', timestamp: new Date() },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: GameMessage = {
        id: Date.now().toString(),
        player: 'Вы',
        message: newMessage,
        timestamp: new Date()
      };
      setChatMessages([...chatMessages, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const getTrumpIcon = () => {
    switch (gameState.trumpSuit) {
      case 'hearts': return '♥';
      case 'diamonds': return '♦';
      case 'clubs': return '♣';
      case 'spades': return '♠';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-game-wheat via-game-golden to-game-brown p-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Главная игровая область */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Верхняя панель с информацией */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {gameState.currentPlayer === 'player' ? 'Ваш ход' : 'Ход противника'}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <Icon name="Cards" size={20} />
                    <span>Колода: {gameState.deck}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-2xl ${gameState.trumpSuit === 'hearts' || gameState.trumpSuit === 'diamonds' ? 'text-red-600' : 'text-gray-800'}`}>
                      {getTrumpIcon()}
                    </span>
                    <span>Козырь</span>
                  </div>
                </div>
                <Button variant="outline" className="bg-white/50">
                  <Icon name="Settings" size={16} className="mr-2" />
                  Настройки
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Рука противника */}
          <div className="text-center">
            <div className="flex justify-center gap-2 mb-2">
              {Array.from({ length: gameState.opponentHandSize }, (_, i) => (
                <GameCard
                  key={i}
                  suit="hearts"
                  value="?"
                  rank={0}
                  isFlipped={true}
                  className="w-12 h-18"
                />
              ))}
            </div>
            <p className="text-white font-semibold">Алексей (Рейтинг: 1850)</p>
          </div>

          {/* Игровое поле */}
          <Card className="bg-white/90 backdrop-blur-sm min-h-64">
            <CardContent className="p-8">
              <div className="text-center text-gray-500 mb-4">
                <Icon name="Target" size={48} className="mx-auto mb-2 opacity-50" />
                <p>Игровое поле</p>
                <p className="text-sm">Карты будут появляться здесь во время игры</p>
              </div>
              
              {/* Пример карт на поле */}
              <div className="flex justify-center gap-4">
                <GameCard
                  suit="hearts"
                  value="7"
                  rank={7}
                  className="shadow-lg"
                />
                <div className="w-16 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 text-xs">Отбой</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Рука игрока */}
          <div className="text-center">
            <p className="text-white font-semibold mb-2">Ваша рука</p>
            <div className="flex justify-center gap-2">
              {gameState.playerHand.map((card, index) => (
                <GameCard
                  key={index}
                  suit={card.suit}
                  value={card.value}
                  rank={card.rank}
                  onClick={() => console.log(`Сыграна карта: ${card.value} ${card.suit}`)}
                  className="hover:scale-110 cursor-pointer transition-transform"
                />
              ))}
            </div>
          </div>

          {/* Кнопки действий */}
          <div className="flex justify-center gap-4">
            <Button 
              variant="default" 
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Icon name="CheckCircle" size={16} className="mr-2" />
              Завершить ход
            </Button>
            <Button 
              variant="outline" 
              className="bg-white/90"
            >
              <Icon name="RotateCcw" size={16} className="mr-2" />
              Отменить
            </Button>
            <Button 
              variant="outline" 
              className="bg-white/90"
            >
              <Icon name="Flag" size={16} className="mr-2" />
              Сдаться
            </Button>
          </div>
        </div>

        {/* Боковая панель с чатом */}
        <div className="space-y-6">
          
          {/* Чат */}
          <Card className="bg-white/95 backdrop-blur-sm h-96">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Icon name="MessageCircle" size={20} />
                Чат
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-64 px-4">
                <div className="space-y-3">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className="text-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-game-brown">{msg.player}:</span>
                        <span className="text-xs text-gray-500">
                          {msg.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-gray-700 ml-2">{msg.message}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Написать сообщение..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="text-sm"
                  />
                  <Button 
                    onClick={sendMessage}
                    size="sm"
                    className="bg-game-golden hover:bg-game-brown text-white"
                  >
                    <Icon name="Send" size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Статистика партии */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Icon name="BarChart" size={20} />
                Статистика
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Время партии:</span>
                <Badge variant="outline">05:42</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Ваши очки:</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">+15</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Очки противника:</span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">+12</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Карт сыграно:</span>
                <Badge variant="outline">8</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}