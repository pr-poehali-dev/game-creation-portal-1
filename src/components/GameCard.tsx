import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface GameCardProps {
  title: string;
  description: string;
  author: string;
  plays: number;
  likes: number;
  image?: string;
  tags?: string[];
}

const GameCard = ({ title, description, author, plays, likes, tags = [] }: GameCardProps) => {
  return (
    <Card className="group overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 animate-fade-in">
      <div className="relative h-48 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon name="Gamepad2" size={64} className="text-primary/30 group-hover:scale-110 transition-transform" />
        </div>
      </div>
      
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold line-clamp-1">{title}</h3>
            <p className="text-sm text-muted-foreground">by {author}</p>
          </div>
          <Button size="icon" variant="ghost" className="hover:text-accent">
            <Icon name="Heart" size={18} />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{description}</p>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between items-center">
        <div className="flex gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Icon name="Play" size={14} />
            <span>{plays}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="Heart" size={14} />
            <span>{likes}</span>
          </div>
        </div>
        <Button size="sm" className="group-hover:animate-pulse-glow">
          <Icon name="Play" size={14} className="mr-1" />
          Играть
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GameCard;
