import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import GameEditor from '@/components/GameEditor';
import GameCard from '@/components/GameCard';
import TutorialCard from '@/components/TutorialCard';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');

  const sampleGames = [
    {
      title: 'Космический бой',
      description: 'Защищайте галактику от вражеских захватчиков в этом динамичном шутере',
      author: 'GameMaster',
      plays: 1247,
      likes: 89,
      tags: ['Action', 'Space', '2D'],
    },
    {
      title: 'Лабиринт загадок',
      description: 'Решайте головоломки и находите выход из таинственного лабиринта',
      author: 'PuzzleKing',
      plays: 856,
      likes: 64,
      tags: ['Puzzle', 'Adventure'],
    },
    {
      title: 'Гонки на время',
      description: 'Соревнуйтесь с игроками со всего мира в захватывающих гонках',
      author: 'SpeedDemon',
      plays: 2103,
      likes: 156,
      tags: ['Racing', 'Multiplayer'],
    },
  ];

  const tutorials = [
    {
      title: 'Создание первой игры',
      description: 'Научитесь основам создания игр с нуля за 15 минут',
      duration: '15 мин',
      difficulty: 'easy' as const,
      icon: 'Rocket',
    },
    {
      title: 'Анимация персонажей',
      description: 'Добавьте жизнь вашим героям с помощью анимации',
      duration: '25 мин',
      difficulty: 'medium' as const,
      icon: 'Sparkles',
    },
    {
      title: 'Игровая физика',
      description: 'Реализуйте реалистичную физику для объектов в вашей игре',
      duration: '40 мин',
      difficulty: 'hard' as const,
      icon: 'Zap',
    },
    {
      title: 'Создание уровней',
      description: 'Проектируйте интересные и сбалансированные игровые уровни',
      duration: '30 мин',
      difficulty: 'medium' as const,
      icon: 'Map',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <header className="border-b border-border/50 backdrop-blur-sm bg-card/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-pulse-glow">
              <Icon name="Gamepad2" size={24} />
            </div>
            <h1 className="text-2xl font-black">GAME CREATOR</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Icon name="Bell" size={20} />
            </Button>
            <Avatar className="border-2 border-primary">
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent">
                <Icon name="User" size={20} />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-5 mb-8 h-auto p-1 bg-card/50 backdrop-blur">
            <TabsTrigger value="home" className="flex flex-col gap-1 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="Home" size={20} />
              <span className="text-xs">Главная</span>
            </TabsTrigger>
            <TabsTrigger value="editor" className="flex flex-col gap-1 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="Code" size={20} />
              <span className="text-xs">Редактор</span>
            </TabsTrigger>
            <TabsTrigger value="tutorials" className="flex flex-col gap-1 py-3 data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">
              <Icon name="GraduationCap" size={20} />
              <span className="text-xs">Обучение</span>
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex flex-col gap-1 py-3 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              <Icon name="Library" size={20} />
              <span className="text-xs">Галерея</span>
            </TabsTrigger>
            <TabsTrigger value="community" className="flex flex-col gap-1 py-3 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              <Icon name="Users" size={20} />
              <span className="text-xs">Сообщество</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-8 animate-fade-in">
            <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent p-12 text-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),rgba(255,255,255,0))]" />
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-black mb-4">Создавай игры мечты</h2>
                <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
                  Простой drag-and-drop редактор для создания потрясающих игр без программирования
                </p>
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="animate-pulse-glow font-bold"
                  onClick={() => setActiveTab('editor')}
                >
                  <Icon name="Sparkles" size={20} className="mr-2" />
                  Начать создавать
                </Button>
              </div>
            </section>

            <section>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">🔥 Популярные игры</h3>
                <Button variant="ghost" onClick={() => setActiveTab('gallery')}>
                  Смотреть все
                  <Icon name="ArrowRight" size={16} className="ml-2" />
                </Button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sampleGames.map((game, index) => (
                  <div key={index} style={{ animationDelay: `${index * 100}ms` }}>
                    <GameCard {...game} />
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">📚 Начни обучение</h3>
                <Button variant="ghost" onClick={() => setActiveTab('tutorials')}>
                  Все уроки
                  <Icon name="ArrowRight" size={16} className="ml-2" />
                </Button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {tutorials.slice(0, 4).map((tutorial, index) => (
                  <div key={index} style={{ animationDelay: `${index * 100}ms` }}>
                    <TutorialCard {...tutorial} />
                  </div>
                ))}
              </div>
            </section>
          </TabsContent>

          <TabsContent value="editor" className="animate-fade-in">
            <div className="max-w-6xl mx-auto">
              <div className="mb-6 text-center">
                <h2 className="text-3xl font-bold mb-2">Визуальный редактор игр</h2>
                <p className="text-muted-foreground">Создавайте игры с помощью простого drag-and-drop интерфейса</p>
              </div>
              <GameEditor />
            </div>
          </TabsContent>

          <TabsContent value="tutorials" className="animate-fade-in">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold mb-2">Обучение и туториалы</h2>
                <p className="text-muted-foreground">От основ до продвинутых техник создания игр</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tutorials.map((tutorial, index) => (
                  <div key={index} style={{ animationDelay: `${index * 50}ms` }}>
                    <TutorialCard {...tutorial} />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="gallery" className="animate-fade-in">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold mb-2">Галерея игр</h2>
                <p className="text-muted-foreground">Исследуйте тысячи игр, созданных сообществом</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...sampleGames, ...sampleGames].map((game, index) => (
                  <div key={index} style={{ animationDelay: `${index * 50}ms` }}>
                    <GameCard {...game} />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="community" className="animate-fade-in">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold mb-2">Сообщество разработчиков</h2>
                <p className="text-muted-foreground">Общайтесь, делитесь опытом и развивайтесь вместе</p>
              </div>
              
              <div className="grid gap-6">
                <Card className="animate-fade-in">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-gradient-to-br from-primary to-secondary">
                          GM
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold">GameMaster</p>
                        <p className="text-sm text-muted-foreground">2 часа назад</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-3">Только что выпустил новую версию моего платформера! Добавил систему сохранений и новые уровни 🎮</p>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <Button variant="ghost" size="sm">
                        <Icon name="Heart" size={16} className="mr-1" />
                        24
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Icon name="MessageCircle" size={16} className="mr-1" />
                        8
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-gradient-to-br from-accent to-secondary">
                          PK
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold">PuzzleKing</p>
                        <p className="text-sm text-muted-foreground">5 часов назад</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-3">Кто-нибудь знает, как реализовать систему подсказок в головоломке? Буду благодарен за советы! 🤔</p>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <Button variant="ghost" size="sm">
                        <Icon name="Heart" size={16} className="mr-1" />
                        15
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Icon name="MessageCircle" size={16} className="mr-1" />
                        12
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
