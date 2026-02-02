import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Lock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseWeek {
  id: string;
  week_number: number;
  title: string;
  description: string | null;
  theme: string | null;
}

interface WeekCardProps {
  week: CourseWeek;
  isUnlocked: boolean;
  isSelected: boolean;
  progress: number;
  onClick: () => void;
}

const WeekCard = ({ week, isUnlocked, isSelected, progress, onClick }: WeekCardProps) => {
  return (
    <Card 
      className={cn(
        "transition-all duration-200 cursor-pointer border-warm-200",
        isUnlocked ? "hover:shadow-md hover:border-primary/30" : "opacity-60 cursor-not-allowed",
        isSelected && isUnlocked && "ring-2 ring-primary border-primary"
      )}
      onClick={isUnlocked ? onClick : undefined}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-light text-primary">{week.week_number}</span>
            {!isUnlocked && <Lock className="h-4 w-4 text-muted-foreground" />}
            {isUnlocked && progress === 100 && <CheckCircle2 className="h-4 w-4 text-green-500" />}
          </div>
          {isUnlocked && progress > 0 && progress < 100 && (
            <Badge variant="outline" className="text-xs">
              {progress}%
            </Badge>
          )}
        </div>
        
        <h3 className={cn(
          "font-medium text-sm mb-1 line-clamp-2",
          !isUnlocked && "text-muted-foreground"
        )}>
          {week.title}
        </h3>
        
        {week.theme && (
          <p className="text-xs text-muted-foreground line-clamp-1">
            {week.theme}
          </p>
        )}
        
        {isUnlocked && (
          <Progress value={progress} className="h-1 mt-3" />
        )}
      </CardContent>
    </Card>
  );
};

export default WeekCard;
