import jsPDF from "jspdf";

/**
 * Export a script/instructions markdown as a formatted PDF.
 */
export function exportScriptPdf(title: string, markdownContent: string, lang: string) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const maxWidth = pageWidth - margin * 2;
  let y = margin;

  const addPage = () => {
    doc.addPage();
    y = margin;
  };

  const checkSpace = (needed: number) => {
    if (y + needed > pageHeight - margin) {
      addPage();
    }
  };

  // Strip markdown syntax and split into lines
  const lines = markdownContent.split("\n");

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      y += 4;
      continue;
    }

    // Headings
    if (trimmed.startsWith("## ")) {
      checkSpace(14);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      const text = trimmed.replace(/^##\s*/, "").replace(/[*_]/g, "");
      const split = doc.splitTextToSize(text, maxWidth);
      doc.text(split, margin, y);
      y += split.length * 7 + 4;
      // Underline
      doc.setDrawColor(180, 180, 180);
      doc.line(margin, y - 2, pageWidth - margin, y - 2);
      y += 4;
      continue;
    }

    if (trimmed.startsWith("### ")) {
      checkSpace(12);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      const text = trimmed.replace(/^###\s*/, "").replace(/[*_]/g, "");
      const split = doc.splitTextToSize(text, maxWidth);
      y += 4;
      doc.text(split, margin, y);
      y += split.length * 6 + 3;
      continue;
    }

    if (trimmed.startsWith("#### ")) {
      checkSpace(10);
      doc.setFont("helvetica", "bolditalic");
      doc.setFontSize(11);
      const text = trimmed.replace(/^####\s*/, "").replace(/[*_]/g, "");
      const split = doc.splitTextToSize(text, maxWidth);
      y += 3;
      doc.text(split, margin, y);
      y += split.length * 5.5 + 2;
      continue;
    }

    // Blockquotes
    if (trimmed.startsWith(">")) {
      checkSpace(8);
      doc.setFont("helvetica", "italic");
      doc.setFontSize(10.5);
      doc.setTextColor(80, 80, 80);
      const text = trimmed.replace(/^>\s*/, "").replace(/[*_]/g, "");
      const split = doc.splitTextToSize(text, maxWidth - 8);
      doc.setDrawColor(160, 160, 160);
      doc.line(margin + 2, y - 2, margin + 2, y + split.length * 5);
      doc.text(split, margin + 6, y);
      y += split.length * 5 + 3;
      doc.setTextColor(0, 0, 0);
      continue;
    }

    // List items
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      checkSpace(8);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10.5);
      const text = trimmed.replace(/^[-*]\s*/, "").replace(/[*_'']/g, "");
      const split = doc.splitTextToSize(text, maxWidth - 8);
      doc.text("•", margin + 2, y);
      doc.text(split, margin + 8, y);
      y += split.length * 5 + 2;
      continue;
    }

    // Numbered list
    const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
    if (numMatch) {
      checkSpace(8);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10.5);
      const text = numMatch[2].replace(/[*_]/g, "");
      const split = doc.splitTextToSize(text, maxWidth - 10);
      doc.text(`${numMatch[1]}.`, margin + 1, y);
      doc.text(split, margin + 10, y);
      y += split.length * 5 + 2;
      continue;
    }

    // Emphasis lines (stage directions)
    if (trimmed.startsWith("*(") && trimmed.endsWith(")*")) {
      checkSpace(8);
      doc.setFont("helvetica", "italic");
      doc.setFontSize(9.5);
      doc.setTextColor(120, 120, 120);
      const text = trimmed.replace(/^\*\(/, "(").replace(/\)\*$/, ")");
      doc.text(text, margin, y);
      y += 5 + 2;
      doc.setTextColor(0, 0, 0);
      continue;
    }

    // Regular paragraph
    checkSpace(8);
    const isBold = trimmed.startsWith("**") && trimmed.endsWith("**");
    doc.setFont("helvetica", isBold ? "bold" : "normal");
    doc.setFontSize(10.5);
    const cleanText = trimmed.replace(/\*\*/g, "").replace(/['']/g, "'");
    const split = doc.splitTextToSize(cleanText, maxWidth);
    doc.text(split, margin, y);
    y += split.length * 5 + 2;
  }

  // Footer on each page
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`${title} — ${lang.toUpperCase()}`, margin, pageHeight - 10);
    doc.text(`${i} / ${totalPages}`, pageWidth - margin, pageHeight - 10, { align: "right" });
    doc.setTextColor(0, 0, 0);
  }

  const safeName = title.replace(/[^a-zA-Z0-9\s-]/g, "").replace(/\s+/g, "-").toLowerCase();
  doc.save(`${safeName}-${lang}.pdf`);
}
