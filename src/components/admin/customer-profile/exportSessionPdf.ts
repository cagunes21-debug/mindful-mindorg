import jsPDF from "jspdf";

interface SessionData {
  session_number: number | null;
  session_date: string | null;
  helpvraag: string;
  achtergrond: string;
  belangrijkste_themas: string;
  doelstelling: string;
  observaties: string;
  interventies: string;
}

const FIELDS: { key: keyof SessionData; label: string }[] = [
  { key: "helpvraag", label: "Helpvraag" },
  { key: "achtergrond", label: "Achtergrond" },
  { key: "belangrijkste_themas", label: "Belangrijkste thema's" },
  { key: "doelstelling", label: "Doelstelling van de therapie" },
  { key: "observaties", label: "Observaties van de therapeut" },
  { key: "interventies", label: "Mogelijke interventies of technieken" },
];

export function exportSessionPdf(session: SessionData, clientName?: string) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const addPageIfNeeded = (requiredSpace: number) => {
    if (y + requiredSpace > doc.internal.pageSize.getHeight() - margin) {
      doc.addPage();
      y = margin;
    }
  };

  // Header
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("Sessienotities", margin, y);
  y += 8;

  // Client & session meta
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100);

  const meta: string[] = [];
  if (clientName) meta.push(`Cliënt: ${clientName}`);
  meta.push(`Sessie ${session.session_number || "?"}`);
  if (session.session_date) {
    meta.push(
      `Datum: ${new Date(session.session_date).toLocaleDateString("nl-NL", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })}`
    );
  }
  doc.text(meta.join("  •  "), margin, y);
  y += 4;

  // Divider
  doc.setDrawColor(200);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  // Fields
  doc.setTextColor(0);

  for (const { key, label } of FIELDS) {
    const value = session[key];
    if (!value || typeof value !== "string") continue;

    addPageIfNeeded(20);

    // Label
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(80);
    doc.text(label.toUpperCase(), margin, y);
    y += 5;

    // Value
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(30);
    const lines = doc.splitTextToSize(value, contentWidth);
    for (const line of lines) {
      addPageIfNeeded(6);
      doc.text(line, margin, y);
      y += 5;
    }
    y += 4;
  }

  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(
      `Vertrouwelijk — Gegenereerd op ${new Date().toLocaleDateString("nl-NL")}`,
      margin,
      doc.internal.pageSize.getHeight() - 10
    );
    doc.text(
      `Pagina ${i} van ${pageCount}`,
      pageWidth - margin,
      doc.internal.pageSize.getHeight() - 10,
      { align: "right" }
    );
  }

  const dateStr = session.session_date
    ? new Date(session.session_date).toISOString().split("T")[0]
    : "onbekend";
  const safeName = (clientName || "client").replace(/[^a-zA-Z0-9]/g, "_");
  doc.save(`sessienotities_${safeName}_sessie${session.session_number || "x"}_${dateStr}.pdf`);
}
