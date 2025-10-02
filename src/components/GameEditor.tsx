import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface GameObject {
  id: string;
  type: 'player' | 'enemy' | 'obstacle' | 'collectible';
  x: number;
  y: number;
}

const GameEditor = () => {
  const [objects, setObjects] = useState<GameObject[]>([]);
  const [selectedTool, setSelectedTool] = useState<GameObject['type'] | null>(null);

  const tools = [
    { type: 'player' as const, icon: 'User', label: 'Игрок', color: 'bg-primary' },
    { type: 'enemy' as const, icon: 'Skull', label: 'Враг', color: 'bg-destructive' },
    { type: 'obstacle' as const, icon: 'Box', label: 'Препятствие', color: 'bg-muted' },
    { type: 'collectible' as const, icon: 'Star', label: 'Предмет', color: 'bg-accent' },
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

    setObjects([...objects, newObject]);
  };

  const clearCanvas = () => {
    setObjects([]);
  };

  const getObjectColor = (type: GameObject['type']) => {
    const tool = tools.find(t => t.type === type);
    return tool?.color || 'bg-muted';
  };

  return (
    <div className="space-y-4">
      <Card className="p-6 border-2 border-primary/20">
        <h3 className="text-xl font-bold mb-4 text-primary">Инструменты</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
          {objects.map((obj) => (
            <div
              key={obj.id}
              className={`absolute w-8 h-8 rounded-full ${getObjectColor(obj.type)} animate-scale-in hover:scale-110 transition-transform cursor-pointer`}
              style={{
                left: `${obj.x - 16}px`,
                top: `${obj.y - 16}px`,
              }}
            />
          ))}
          
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
