import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, ChevronDown, ChevronUp, Save } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface Assignment {
  id: string;
  title: string;
  description: string | null;
  instructions: string | null;
}

interface AssignmentCardProps {
  assignment: Assignment;
  isCompleted: boolean;
  notes: string;
  onSaveNotes: (notes: string) => void;
}

const AssignmentCard = ({ assignment, isCompleted, notes, onSaveNotes }: AssignmentCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localNotes, setLocalNotes] = useState(notes);
  const [hasChanges, setHasChanges] = useState(false);

  const handleNotesChange = (value: string) => {
    setLocalNotes(value);
    setHasChanges(value !== notes);
  };

  const handleSave = () => {
    onSaveNotes(localNotes);
    setHasChanges(false);
  };

  return (
    <Card className={cn(
      "border-warm-200 transition-all",
      isCompleted && "bg-green-50/50 border-green-200"
    )}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardContent className="p-4 cursor-pointer hover:bg-muted/30 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center shrink-0",
                  isCompleted ? "bg-green-100 text-green-600" : "bg-muted text-muted-foreground"
                )}>
                  {isCompleted ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <span className="text-sm font-medium">!</span>
                  )}
                </div>
                <div className="min-w-0">
                  <h4 className="font-medium text-sm">{assignment.title}</h4>
                  {assignment.description && (
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {assignment.description}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {isCompleted && (
                  <span className="text-xs text-green-600 font-medium">Voltooid</span>
                )}
                {isOpen ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            </div>
          </CardContent>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0 px-4 pb-4 border-t border-warm-200">
            {assignment.instructions && (
              <div className="mb-4 mt-4">
                <h5 className="text-sm font-medium mb-2">Instructies</h5>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {assignment.instructions}
                </p>
              </div>
            )}
            
            <div>
              <h5 className="text-sm font-medium mb-2">Jouw reflecties & notities</h5>
              <Textarea
                placeholder="Schrijf hier je gedachten, inzichten en reflecties..."
                value={localNotes}
                onChange={(e) => handleNotesChange(e.target.value)}
                rows={4}
                className="resize-none"
              />
              
              <div className="flex justify-end mt-3">
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={!hasChanges && !localNotes}
                  className="gap-2"
                >
                  <Save className="h-4 w-4" />
                  {hasChanges ? "Wijzigingen opslaan" : "Opslaan"}
                </Button>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default AssignmentCard;
