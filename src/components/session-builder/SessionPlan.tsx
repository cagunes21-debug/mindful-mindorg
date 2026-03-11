import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { GripVertical, X, Clock, AlertTriangle, CheckCircle2, FileText, Copy, Printer, Download, Save } from "lucide-react";
import { MscItem, ITEM_TYPES, TYPE_COLORS } from "./types";
import { cn } from "@/lib/utils";

interface SessionPlanProps {
  planOrder: string[];
  allItems: MscItem[];
  durationOverrides: Record<string, number>;
  targetDuration: number;
  clientName: string;
  sessionDate: string;
  sessionNotes: string;
  generatedPlan: string | null;
  saving: boolean;
  onRemoveItem: (id: string) => void;
  onReorder: (newOrder: string[]) => void;
  onDurationChange: (id: string, duration: number) => void;
  onClientNameChange: (name: string) => void;
  onSessionDateChange: (date: string) => void;
  onTargetDurationChange: (dur: number) => void;
  onSessionNotesChange: (notes: string) => void;
  onGenerate: () => void;
  onSave: () => void;
  onCopy: () => void;
  onPrint: () => void;
  onExportPdf: () => void;
}

export default function SessionPlan({
  planOrder, allItems, durationOverrides, targetDuration,
  clientName, sessionDate, sessionNotes, generatedPlan, saving,
  onRemoveItem, onReorder, onDurationChange,
  onClientNameChange, onSessionDateChange, onTargetDurationChange, onSessionNotesChange,
  onGenerate, onSave, onCopy, onPrint, onExportPdf,
}: SessionPlanProps) {
  const selectedItems = useMemo(
    () => planOrder.map((id) => allItems.find((i) => i.id === id)).filter(Boolean) as MscItem[],
    [planOrder, allItems]
  );

  const getItemDuration = (item: MscItem) => durationOverrides[item.id] ?? item.duration_minutes;
  const totalMinutes = selectedItems.reduce((sum, i) => sum + getItemDuration(i), 0);
  const remaining = targetDuration - totalMinutes;

  // Drag state
  const handleDragStart = (e: React.DragEvent, idx: number) => {
    e.dataTransfer.setData("text/plain", String(idx));
  };
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleDrop = (e: React.DragEvent, dropIdx: number) => {
    e.preventDefault();
    const fromIdx = parseInt(e.dataTransfer.getData("text/plain"));
    if (isNaN(fromIdx) || fromIdx === dropIdx) return;
    const next = [...planOrder];
    const [moved] = next.splice(fromIdx, 1);
    next.splice(dropIdx, 0, moved);
    onReorder(next);
  };

  return (
    <div className="space-y-4">
      {/* Session info */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <Label className="text-xs">Cliënt</Label>
          <Input value={clientName} onChange={(e) => onClientNameChange(e.target.value)} placeholder="Naam cliënt" className="h-8 text-sm" />
        </div>
        <div>
          <Label className="text-xs">Datum</Label>
          <Input type="date" value={sessionDate} onChange={(e) => onSessionDateChange(e.target.value)} className="h-8 text-sm" />
        </div>
        <div>
          <Label className="text-xs">Doelduur (min)</Label>
          <Input type="number" value={targetDuration} onChange={(e) => onTargetDurationChange(parseInt(e.target.value) || 60)} className="h-8 text-sm" />
        </div>
      </div>

      {/* Duration bar */}
      <Card>
        <CardContent className="py-2.5 px-4 flex items-center gap-3">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <div className="flex-1">
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  totalMinutes > targetDuration ? "bg-destructive" : totalMinutes === targetDuration ? "bg-green-500" : "bg-primary"
                )}
                style={{ width: `${Math.min((totalMinutes / targetDuration) * 100, 100)}%` }}
              />
            </div>
          </div>
          <span className="text-xs font-medium whitespace-nowrap">{totalMinutes} / {targetDuration} min</span>
          {remaining > 0 && <span className="text-[10px] text-muted-foreground">({remaining} over)</span>}
          {remaining < 0 && (
            <span className="text-[10px] text-destructive flex items-center gap-0.5">
              <AlertTriangle className="h-3 w-3" /> {Math.abs(remaining)} over!
            </span>
          )}
          {remaining === 0 && (
            <span className="text-[10px] text-green-600 flex items-center gap-0.5">
              <CheckCircle2 className="h-3 w-3" /> Perfect
            </span>
          )}
        </CardContent>
      </Card>

      {/* Plan items */}
      <div>
        <h2 className="text-lg font-medium text-foreground mb-2 flex items-center gap-2">
          Individuele sessie
          <Badge variant="secondary" className="text-xs">{selectedItems.length} blokken</Badge>
        </h2>

        {selectedItems.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground text-sm">
              Klik op items in het groepsprogramma om blokken toe te voegen.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-1">
            {selectedItems.map((item, idx) => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, idx)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, idx)}
                className="flex items-center gap-1.5 rounded-md border bg-background px-2 py-1.5 cursor-grab active:cursor-grabbing hover:border-primary/30 transition-all group"
              >
                <GripVertical className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                <span className="text-[10px] font-mono text-muted-foreground w-4">{idx + 1}.</span>
                <div className="flex-1 min-w-0 flex items-center gap-1.5">
                  <span className="text-sm truncate">{item.title}</span>
                  <Badge variant="secondary" className={cn("text-[10px] shrink-0", TYPE_COLORS[item.type] || "")}>
                    {ITEM_TYPES[item.type] || item.type}
                  </Badge>
                </div>
                <Input
                  type="number"
                  min={1}
                  className="w-14 h-6 text-[10px] text-center"
                  value={getItemDuration(item)}
                  onChange={(e) => onDurationChange(item.id, parseInt(e.target.value) || 1)}
                  onClick={(e) => e.stopPropagation()}
                />
                <span className="text-[10px] text-muted-foreground">min</span>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded hover:bg-destructive/10"
                >
                  <X className="h-3.5 w-3.5 text-destructive" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Session notes */}
      {selectedItems.length > 0 && (
        <div>
          <Label className="text-xs">Sessienotities</Label>
          <Textarea
            value={sessionNotes}
            onChange={(e) => onSessionNotesChange(e.target.value)}
            placeholder="Notities voor deze sessie..."
            className="text-sm min-h-[60px]"
          />
        </div>
      )}

      {/* Generate / actions */}
      {selectedItems.length > 0 && (
        <div className="space-y-3">
          {!generatedPlan ? (
            <Button onClick={onGenerate} className="w-full gap-2">
              <FileText className="h-4 w-4" /> Genereer Sessieplan
            </Button>
          ) : (
            <>
              <Card>
                <CardContent className="p-4">
                  <pre className="whitespace-pre-wrap text-sm font-sans bg-muted/50 p-3 rounded-lg">{generatedPlan}</pre>
                </CardContent>
              </Card>
              <div className="flex flex-wrap gap-2">
                <Button onClick={onSave} disabled={saving} size="sm" className="gap-1.5">
                  <Save className="h-3.5 w-3.5" /> {saving ? "Opslaan..." : "Opslaan"}
                </Button>
                <Button variant="outline" onClick={onCopy} size="sm" className="gap-1.5">
                  <Copy className="h-3.5 w-3.5" /> Kopiëren
                </Button>
                <Button variant="outline" onClick={onPrint} size="sm" className="gap-1.5">
                  <Printer className="h-3.5 w-3.5" /> Printen
                </Button>
                <Button variant="outline" onClick={onExportPdf} size="sm" className="gap-1.5">
                  <Download className="h-3.5 w-3.5" /> PDF
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
