import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Meditation {
  id: string;
  title: string;
  description: string | null;
  audio_url: string;
  duration_minutes: number | null;
}

interface MeditationPlayerProps {
  meditation: Meditation;
  isCompleted: boolean;
  onToggleComplete: () => void;
}

const MeditationPlayer = ({ meditation, isCompleted, onToggleComplete }: MeditationPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    if (!isCompleted) {
      onToggleComplete();
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <Card className={cn(
      "border-warm-200 transition-all",
      isCompleted && "bg-green-50/50 border-green-200"
    )}>
      <CardContent className="p-4">
        <audio
          ref={audioRef}
          src={meditation.audio_url}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
        />
        
        <div className="flex items-center gap-4">
          <Button
            size="icon"
            variant="outline"
            className="h-12 w-12 rounded-full shrink-0"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5 ml-0.5" />
            )}
          </Button>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-medium text-sm truncate">{meditation.title}</h4>
              {isCompleted && (
                <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
              )}
            </div>
            
            {meditation.description && (
              <p className="text-xs text-muted-foreground line-clamp-1 mb-2">
                {meditation.description}
              </p>
            )}
            
            {/* Progress bar */}
            <div className="relative h-1 bg-muted rounded-full overflow-hidden">
              <div 
                className="absolute left-0 top-0 h-full bg-primary transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            
            <div className="flex items-center justify-between mt-1 text-xs text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {meditation.duration_minutes ? `${meditation.duration_minutes} min` : formatTime(duration)}
              </span>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "shrink-0",
              isCompleted && "text-green-600 hover:text-green-700"
            )}
            onClick={onToggleComplete}
          >
            {isCompleted ? "Voltooid" : "Markeer als voltooid"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MeditationPlayer;
