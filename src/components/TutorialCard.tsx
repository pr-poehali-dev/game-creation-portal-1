import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface TutorialCardProps {
  title: string;
  description: string;
  duration: string;
  difficulty: 'easy' | 'medium' | 'hard';
  icon: string;
}

const TutorialCard = ({ title, description, duration, difficulty, icon }: TutorialCardProps) => {
  const difficultyColors = {
    easy: 'bg-green-500/20 text-green-400 border-green-500/30',
    medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    hard: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  const difficultyLabels = {
    easy: 'Легко',
    medium: 'Средне',
    hard: 'Сложно',
  };

  return (
    <Card className="hover:border-secondary/50 transition-all cursor-pointer group animate-fade-in hover:shadow-lg hover:shadow-secondary/10">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-secondary to-accent flex items-center justify-center group-hover:scale-110 transition-transform">
            <Icon name={icon} size={24} />
          </div>
          <Badge variant="outline" className={difficultyColors[difficulty]}>
            {difficultyLabels[difficulty]}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <h4 className="font-bold text-base mb-2 line-clamp-1">{title}</h4>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{description}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Icon name="Clock" size={12} />
          <span>{duration}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default TutorialCard;
