import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRight, Plus, Clock, Library, User } from "lucide-react";
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

  const renderItemButton = (item: MscItem) => {
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
  };

  return (
    <div className="space-y-6">
      {/* MSC Standard Library (system content) */}
      <div>
        <div className="flex items-center gap-2 mb-3 px-1">
          <Library className="h-4 w-4 text-primary" />
          <h2 className="text-lg font-medium text-foreground">MSC Standaard Curriculum</h2>
          <Badge className="text-[10px] bg-primary/15 text-primary border-primary/30 hover:bg-primary/20">
            Vooraf ingebouwd
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mb-3 px-1">
          Dit is het standaard 8-weekse MSC groepsprogramma. Deze items zijn vooraf ingebouwd en kunnen niet worden gewijzigd.
        </p>

        <div className="space-y-1 rounded-lg border border-primary/20 bg-primary/[0.02] p-2">
          {sessions
            .sort((a, b) => a.week_number - b.week_number)
            .map((session) => {
              const sessionItems = getSessionItems(session.id).filter((i) => i.is_system);
              const isOpen = openSessions.has(session.id);
              const addedCount = sessionItems.filter((i) => selectedIds.has(i.id)).length;

              return (
                <Collapsible key={session.id} open={isOpen} onOpenChange={() => toggleSession(session.id)}>
                  <CollapsibleTrigger className="w-full">
                    <Card className={cn(
                      "transition-all hover:bg-muted/50 border-primary/10",
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
                      {sessionItems.map(renderItemButton)}
                      {sessionItems.length === 0 && (
                        <p className="text-xs text-muted-foreground py-3 text-center">Geen standaard items voor deze sessie</p>
                      )}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              );
            })}

          {sessions.length === 0 && (
            <p className="text-sm text-muted-foreground py-6 text-center">Geen sessies gevonden.</p>
          )}
        </div>
      </div>

      {/* User-added custom content */}
      {(() => {
        const customItems = items.filter((i) => !i.is_system);
        if (customItems.length === 0) return null;

        // Group by session
        const customBySession = new Map<string, MscItem[]>();
        customItems.forEach((item) => {
          const list = customBySession.get(item.session_id) || [];
          list.push(item);
          customBySession.set(item.session_id, list);
        });

        return (
          <div>
            <div className="flex items-center gap-2 mb-3 px-1">
              <User className="h-4 w-4 text-accent-foreground" />
              <h2 className="text-lg font-medium text-foreground">Eigen Toevoegingen</h2>
              <Badge variant="outline" className="text-[10px]">Door jou toegevoegd</Badge>
            </div>
            <p className="text-xs text-muted-foreground mb-3 px-1">
              Items die je zelf hebt toegevoegd aan het programma.
            </p>

            <div className="space-y-1 rounded-lg border border-border bg-muted/30 p-2">
              {Array.from(customBySession.entries()).map(([sessionId, sessionCustomItems]) => {
                const session = sessions.find((s) => s.id === sessionId);
                const key = `custom-${sessionId}`;
                const isOpen = openSessions.has(key);

                return (
                  <Collapsible key={key} open={isOpen} onOpenChange={() => toggleSession(key)}>
                    <CollapsibleTrigger className="w-full">
                      <Card className={cn("transition-all hover:bg-muted/50", isOpen && "ring-1 ring-border")}>
                        <CardContent className="p-3 flex items-center gap-2">
                          <ChevronRight className={cn("h-4 w-4 text-muted-foreground transition-transform shrink-0", isOpen && "rotate-90")} />
                          <span className="text-sm font-medium">
                            {session ? `Week ${session.week_number}` : "Overig"}
                          </span>
                          <span className="text-xs text-muted-foreground">{sessionCustomItems.length} items</span>
                        </CardContent>
                      </Card>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="ml-4 mt-1 space-y-0.5 mb-2">
                        {sessionCustomItems.sort((a, b) => a.sort_order - b.sort_order).map(renderItemButton)}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                );
              })}
            </div>
          </div>
        );
      })()}
    </div>
  );
}
