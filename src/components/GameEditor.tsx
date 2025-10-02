import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface GameObject {
  id: string;
  type: 'player' | 'enemy' | 'obstacle' | 'collectible' | 'text' | 'line' | 'sound';
  x: number;
  y: number;
  text?: string;
  width?: number;
  height?: number;
  soundType?: 'jump' | 'collect' | 'hit';
}

const GameEditor = () => {
  const [objects, setObjects] = useState<GameObject[]>([]);
  const [selectedTool, setSelectedTool] = useState<GameObject['type'] | null>(null);
  const [gameName, setGameName] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem('currentGame');
    if (saved) {
      const data = JSON.parse(saved);
      setObjects(data.objects || []);
      setGameName(data.name || '');
    }
  }, []);

  useEffect(() => {
    if (objects.length > 0 || gameName) {
      localStorage.setItem('currentGame', JSON.stringify({ objects, name: gameName }));
    }
  }, [objects, gameName]);

  const tools = [
    { type: 'player' as const, icon: 'User', label: 'Игрок', color: 'bg-primary' },
    { type: 'enemy' as const, icon: 'Skull', label: 'Враг', color: 'bg-destructive' },
    { type: 'obstacle' as const, icon: 'Box', label: 'Препятствие', color: 'bg-muted' },
    { type: 'collectible' as const, icon: 'Star', label: 'Предмет', color: 'bg-accent' },
    { type: 'text' as const, icon: 'Type', label: 'Текст', color: 'bg-secondary' },
    { type: 'line' as const, icon: 'Minus', label: 'Линия', color: 'bg-muted' },
    { type: 'sound' as const, icon: 'Volume2', label: 'Звук', color: 'bg-accent' },
  ];

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedTool) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newObject: GameObject = {
      id: `obj-${Date.now()}`,
      type: selectedTool,
      x,
      y,
    };

    if (selectedTool === 'text') {
      newObject.text = 'Текст';
    } else if (selectedTool === 'line') {
      newObject.width = 100;
      newObject.height = 2;
    } else if (selectedTool === 'sound') {
      newObject.soundType = 'jump';
    }

    setObjects([...objects, newObject]);
  };

  const clearCanvas = () => {
    setObjects([]);
    setGameName('');
    localStorage.removeItem('currentGame');
    toast({ title: 'Игра очищена', description: 'Все объекты удалены' });
  };

  const saveGame = () => {
    if (!gameName.trim()) {
      toast({ title: 'Ошибка', description: 'Введите название игры', variant: 'destructive' });
      return;
    }

    const savedGames = JSON.parse(localStorage.getItem('savedGames') || '[]');
    const gameData = {
      id: `game-${Date.now()}`,
      name: gameName,
      objects,
      createdAt: new Date().toISOString(),
    };
    
    savedGames.push(gameData);
    localStorage.setItem('savedGames', JSON.stringify(savedGames));
    toast({ title: 'Сохранено!', description: `Игра "${gameName}" успешно сохранена` });
  };

  const exportGame = () => {
    if (!gameName.trim()) {
      toast({ title: 'Ошибка', description: 'Введите название игры', variant: 'destructive' });
      return;
    }

    const gameData = {
      name: gameName,
      objects,
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(gameData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${gameName.replace(/\s+/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({ title: 'Экспорт завершён', description: 'Файл игры загружен' });
  };

  const getObjectColor = (type: GameObject['type']) => {
    const tool = tools.find(t => t.type === type);
    return tool?.color || 'bg-muted';
  };

  return (
    <div className="space-y-4">
      <Card className="p-6 border-2 border-primary/20">
        <div className="mb-4">
          <label className="text-sm font-medium mb-2 block">Название игры</label>
          <Input
            placeholder="Моя первая игра"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            className="max-w-md"
          />
        </div>
        <h3 className="text-xl font-bold mb-4 text-primary">Инструменты</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {tools.map((tool) => (
            <Button
              key={tool.type}
              variant={selectedTool === tool.type ? 'default' : 'outline'}
              className={`flex flex-col items-center gap-2 h-auto py-4 transition-all ${
                selectedTool === tool.type ? 'animate-pulse-glow' : ''
              }`}
              onClick={() => setSelectedTool(tool.type)}
            >
              <Icon name={tool.icon} size={24} />
              <span className="text-xs">{tool.label}</span>
            </Button>
          ))}
        </div>
      </Card>

      <Card className="p-6 border-2 border-secondary/20">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-secondary">Игровое поле</h3>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={saveGame}
              className="flex items-center gap-2"
            >
              <Icon name="Save" size={16} />
              Сохранить
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={exportGame}
              className="flex items-center gap-2"
            >
              <Icon name="Download" size={16} />
              Экспорт
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={clearCanvas}
              className="flex items-center gap-2"
            >
              <Icon name="Trash2" size={16} />
              Очистить
            </Button>
            <Button
              size="sm"
              className="flex items-center gap-2"
            >
              <Icon name="Play" size={16} />
              Тест
            </Button>
          </div>
        </div>
        
        <div
          className="relative w-full h-[500px] bg-background/50 rounded-lg border-2 border-dashed border-muted-foreground/30 cursor-crosshair overflow-hidden"
          onClick={handleCanvasClick}
        >
          {objects.map((obj) => {
            if (obj.type === 'text') {
              return (
                <div
                  key={obj.id}
                  className="absolute text-foreground font-bold animate-scale-in cursor-pointer hover:scale-110 transition-transform"
                  style={{ left: `${obj.x}px`, top: `${obj.y}px` }}
                >
                  {obj.text}
                </div>
              );
            }
            if (obj.type === 'line') {
              return (
                <div
                  key={obj.id}
                  className="absolute bg-muted animate-scale-in cursor-pointer"
                  style={{
                    left: `${obj.x}px`,
                    top: `${obj.y}px`,
                    width: `${obj.width}px`,
                    height: `${obj.height}px`,
                  }}
                />
              );
            }
            if (obj.type === 'sound') {
              return (
                <div
                  key={obj.id}
                  className="absolute w-8 h-8 rounded-full bg-accent/30 border-2 border-accent flex items-center justify-center animate-scale-in cursor-pointer hover:scale-110 transition-transform"
                  style={{ left: `${obj.x - 16}px`, top: `${obj.y - 16}px` }}
                >
                  <Icon name="Volume2" size={16} />
                </div>
              );
            }
            return (
              <div
                key={obj.id}
                className={`absolute w-8 h-8 rounded-full ${getObjectColor(obj.type)} animate-scale-in hover:scale-110 transition-transform cursor-pointer`}
                style={{
                  left: `${obj.x - 16}px`,
                  top: `${obj.y - 16}px`,
                }}
              />
            );
          })
          
          {objects.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <Icon name="MousePointerClick" size={48} className="mx-auto mb-2 opacity-50" />
                <p>Выберите инструмент и кликните, чтобы добавить объект</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="Info" size={16} />
          <span>Объектов на поле: {objects.length}</span>
        </div>
      </Card>
    </div>
  );
};

export default GameEditor;