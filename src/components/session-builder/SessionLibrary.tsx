import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRight, Plus, Clock } from "lucide-react";
import { MscSession, MscItem, ITEM_TYPES, TYPE_COLORS } from "./types";
import { cn } from "@/lib/utils";

interface SessionLibraryProps {
  sessions: MscSession[];
  items: MscItem[];
  selectedIds: Set<string>;
  onAddItem: (item: MscItem) => void;
}

export default function SessionLibrary({ sessions, items, selectedIds, onAddItem }: SessionLibraryProps) {
  const [openSessions, setOpenSessions] = useState<Set<string>>(new Set());

  const toggleSession = (id: string) => {
    setOpenSessions((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const getSessionItems = (sessionId: string) =>
    items.filter((i) => i.session_id === sessionId).sort((a, b) => a.sort_order - b.sort_order);

  return (
    <div className="space-y-1">
      <h2 className="text-lg font-medium text-foreground mb-3 flex items-center gap-2">
        <span>Groepsprogramma</span>
        <Badge variant="secondary" className="text-xs">{sessions.length} sessies</Badge>
      </h2>

      {sessions
        .sort((a, b) => a.week_number - b.week_number)
        .map((session) => {
          const sessionItems = getSessionItems(session.id);
          const isOpen = openSessions.has(session.id);
          const addedCount = sessionItems.filter((i) => selectedIds.has(i.id)).length;

          return (
            <Collapsible key={session.id} open={isOpen} onOpenChange={() => toggleSession(session.id)}>
              <CollapsibleTrigger className="w-full">
                <Card className={cn(
                  "transition-all hover:bg-muted/50",
                  isOpen && "ring-1 ring-primary/20 bg-primary/5"
                )}>
                  <CardContent className="p-3 flex items-center gap-2">
                    <ChevronRight className={cn("h-4 w-4 text-muted-foreground transition-transform shrink-0", isOpen && "rotate-90")} />
                    <div className="flex-1 text-left min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Week {session.week_number}</span>
                        <span className="text-xs text-muted-foreground truncate">{session.title}</span>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{sessionItems.length} items</span>
                    {addedCount > 0 && (
                      <Badge variant="default" className="text-xs">{addedCount} gekozen</Badge>
                    )}
                  </CardContent>
                </Card>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="ml-4 mt-1 space-y-0.5 mb-2">
                  {sessionItems.map((item) => {
                    const isAdded = selectedIds.has(item.id);
                    return (
                      <button
                        key={item.id}
                        onClick={() => !isAdded && onAddItem(item)}
                        disabled={isAdded}
                        className={cn(
                          "w-full text-left rounded-md border px-3 py-2 flex items-center gap-2 transition-all text-sm",
                          isAdded
                            ? "bg-primary/10 border-primary/30 opacity-60 cursor-not-allowed"
                            : "bg-background hover:bg-muted/60 hover:border-primary/40 cursor-pointer border-border"
                        )}
                      >
                        {!isAdded && <Plus className="h-3.5 w-3.5 text-primary shrink-0" />}
                        <span className={cn("flex-1 truncate", isAdded && "line-through text-muted-foreground")}>
                          {item.title}
                        </span>
                        <Badge variant="secondary" className={cn("text-[10px] shrink-0", TYPE_COLORS[item.type] || "")}>
                          {ITEM_TYPES[item.type] || item.type}
                        </Badge>
                        {item.is_optional && (
                          <Badge variant="outline" className="text-[10px] shrink-0">Opt</Badge>
                        )}
                        <span className="text-xs text-muted-foreground flex items-center gap-0.5 shrink-0">
                          <Clock className="h-3 w-3" />
                          {item.duration_minutes}
                        </span>
                      </button>
                    );
                  })}
                  {sessionItems.length === 0 && (
                    <p className="text-xs text-muted-foreground py-3 text-center">Geen items in deze sessie</p>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
          );
        })}

      {sessions.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground text-sm">
            Geen sessies gevonden in het groepsprogramma.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
