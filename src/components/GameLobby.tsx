import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GameBoard } from './GameBoard';
import Icon from '@/components/ui/icon';

interface GameRoom {
  id: string;
  name: string;
  players: number;
  maxPlayers: number;
  status: 'waiting' | 'playing' | 'finished';
  creator: string;
}

interface Player {
  id: string;
  name: string;
  wins: number;
  losses: number;
  rating: number;
}

export function GameLobby() {
  const [activeTab, setActiveTab] = useState('rooms');
  const [newRoomName, setNewRoomName] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [inGame, setInGame] = useState(false);

  if (inGame) {
    return <GameBoard />;
  }

  const gameRooms: GameRoom[] = [
    { id: '1', name: 'Быстрая игра', players: 1, maxPlayers: 2, status: 'waiting', creator: 'Алексей' },
    { id: '2', name: 'Турнир мастеров', players: 2, maxPlayers: 2, status: 'playing', creator: 'Мария' },
    { id: '3', name: 'Дружеская партия', players: 1, maxPlayers: 2, status: 'waiting', creator: 'Дмитрий' },
  ];

  const leaderboard: Player[] = [
    { id: '1', name: 'Алексей', wins: 45, losses: 12, rating: 1850 },
    { id: '2', name: 'Мария', wins: 38, losses: 15, rating: 1720 },
    { id: '3', name: 'Дмитрий', wins: 32, losses: 18, rating: 1650 },
    { id: '4', name: 'Анна', wins: 28, losses: 20, rating: 1580 },
    { id: '5', name: 'Игорь', wins: 25, losses: 22, rating: 1520 },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'waiting':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Ожидание</Badge>;
      case 'playing':
        return <Badge variant="default" className="bg-yellow-100 text-yellow-800">В игре</Badge>;
      case 'finished':
        return <Badge variant="outline">Завершена</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-game-wheat via-game-golden to-game-brown p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            ДУРАК ONLINE
          </h1>
          <p className="text-xl text-game-wheat opacity-90">
            Классическая карточная игра с уникальными фигурами
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6 bg-white/10 backdrop-blur-sm">
            <TabsTrigger value="rooms" className="data-[state=active]:bg-white/20">
              <Icon name="Home" size={16} className="mr-2" />
              Комнаты
            </TabsTrigger>
            <TabsTrigger value="create" className="data-[state=active]:bg-white/20">
              <Icon name="Plus" size={16} className="mr-2" />
              Создать игру
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="data-[state=active]:bg-white/20">
              <Icon name="Trophy" size={16} className="mr-2" />
              Лидеры
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-white/20">
              <Icon name="User" size={16} className="mr-2" />
              Профиль
            </TabsTrigger>
          </TabsList>

          <TabsContent value="rooms" className="space-y-4">
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="GamepadIcon" size={24} />
                  Доступные игры
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {gameRooms.map((room) => (
                    <div key={room.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div>
                          <h3 className="font-semibold">{room.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Создал: {room.creator}
                          </p>
                        </div>
                        {getStatusBadge(room.status)}
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-sm">
                          <Icon name="Users" size={16} className="inline mr-1" />
                          {room.players}/{room.maxPlayers}
                        </div>
                        <Button 
                          variant={room.status === 'waiting' ? 'default' : 'secondary'}
                          disabled={room.status !== 'waiting'}
                          className="bg-game-golden hover:bg-game-brown text-white"
                          onClick={() => room.status === 'waiting' && setInGame(true)}
                        >
                          {room.status === 'waiting' ? 'Присоединиться' : 'Недоступна'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create" className="space-y-4">
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Plus" size={24} />
                  Создать новую игру
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Название комнаты</label>
                  <Input
                    placeholder="Введите название игры..."
                    value={newRoomName}
                    onChange={(e) => setNewRoomName(e.target.value)}
                    className="mb-4"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Ваше имя</label>
                  <Input
                    placeholder="Введите ваше имя..."
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    className="mb-4"
                  />
                </div>
                <Button 
                  className="w-full bg-game-golden hover:bg-game-brown text-white font-semibold py-3"
                  disabled={!newRoomName || !playerName}
                >
                  <Icon name="Plus" size={20} className="mr-2" />
                  Создать игру
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-4">
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Trophy" size={24} />
                  Таблица лидеров
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {leaderboard.map((player, index) => (
                    <div key={player.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-game-golden text-white rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold">{player.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {player.wins} побед / {player.losses} поражений
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-game-brown">{player.rating}</div>
                        <div className="text-xs text-muted-foreground">рейтинг</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="User" size={24} />
                  Профиль игрока
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <div className="w-24 h-24 bg-game-golden rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Icon name="User" size={40} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Гость</h2>
                  <p className="text-muted-foreground mb-4">Войдите, чтобы сохранить прогресс</p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-game-brown">0</div>
                      <div className="text-sm text-muted-foreground">Игр сыграно</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">0</div>
                      <div className="text-sm text-muted-foreground">Побед</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-game-golden">1000</div>
                      <div className="text-sm text-muted-foreground">Рейтинг</div>
                    </div>
                  </div>
                  
                  <Button className="bg-game-golden hover:bg-game-brown text-white font-semibold">
                    <Icon name="LogIn" size={20} className="mr-2" />
                    Войти в аккаунт
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}