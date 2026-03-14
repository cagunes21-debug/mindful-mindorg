import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

// ── DEMO DATA ──────────────────────────────────────────────────────────────
const CONTENT_DATA = [
  { id: 1, icon: "🎬", name: "Intro Mindfulness Session", type: "video", meta: "Video · 24 min", session: "individual", visible: true, date: "Mar 10, 2026" },
  { id: 2, icon: "🎬", name: "Group Breathwork Exercise", type: "video", meta: "Video · 18 min", session: "group", visible: true, date: "Mar 8, 2026" },
  { id: 3, icon: "📄", name: "Weekly Journal Worksheet", type: "doc", meta: "PDF · 2 pages", session: "both", visible: true, date: "Mar 5, 2026" },
  { id: 4, icon: "🖼️", name: "Group Session Diagram", type: "image", meta: "Image · PNG", session: "group", visible: false, date: "Mar 1, 2026" },
  { id: 5, icon: "📄", name: "1-on-1 Session Notes Template", type: "doc", meta: "Document · DOCX", session: "individual", visible: true, date: "Feb 28, 2026" },
  { id: 6, icon: "🎬", name: "Advanced Group Techniques", type: "video", meta: "Video · 42 min", session: "group", visible: false, date: "Feb 25, 2026" },
];

const CLIENTS_DATA = [
  { id: 1, initials: "AM", name: "Alex Martin", email: "alex@email.com", session: "individual", access: ["🎬 3 videos", "📄 2 docs"], status: "active", lastLogin: "Today", color: "linear-gradient(135deg,#6c63ff,#574ef0)" },
  { id: 2, initials: "JL", name: "Jordan Lee", email: "jordan@email.com", session: "individual", access: ["🎬 1 video", "📄 1 doc"], status: "active", lastLogin: "Mar 12", color: "linear-gradient(135deg,#38d9a9,#20c997)" },
  { id: 3, initials: "MG", name: "Morning Group", email: "8 members", session: "group", access: ["🎬 2 videos", "📄 1 doc", "🖼️ 1 img"], status: "active", lastLogin: "Mar 13", color: "linear-gradient(135deg,#f59e0b,#f04a5a)" },
  { id: 4, initials: "SP", name: "Sam Parker", email: "sam@email.com", session: "group", access: ["🎬 1 video"], status: "inactive", lastLogin: "Feb 20", color: "linear-gradient(135deg,#6c63ff,#a855f7)" },
];

// ── STYLES ─────────────────────────────────────────────────────────────────
const s = {
  root: { fontFamily: "'DM Sans', sans-serif", background: "#0d0f14", color: "#e8eaf0", minHeight: "100vh", display: "flex" } as React.CSSProperties,
  sidebar: { width: 240, minHeight: "100vh", background: "#161a23", borderRight: "1px solid #252b3b", display: "flex", flexDirection: "column" as const, padding: "28px 0", position: "fixed" as const, top: 0, left: 0, zIndex: 100 },
  main: { marginLeft: 240, flex: 1, padding: "36px 40px", minHeight: "100vh" } as React.CSSProperties,
  topbar: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 36 } as React.CSSProperties,
  pageTitle: { fontFamily: "'Syne', sans-serif", fontSize: "1.6rem", fontWeight: 700 },
  pageSub: { color: "#7a8299", fontSize: "0.9rem", marginTop: 2 },
  card: { background: "#161a23", border: "1px solid #252b3b", borderRadius: 12, overflow: "hidden" } as React.CSSProperties,
  table: { width: "100%", borderCollapse: "collapse" as const },
  th: { padding: "12px 20px", textAlign: "left" as const, fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#7a8299", background: "#1e2330", fontWeight: 500 },
  td: { padding: "14px 20px", fontSize: "0.88rem", borderTop: "1px solid #252b3b" },
};

// ── SHARED UI ──────────────────────────────────────────────────────────────
function Tag({ type }: { type: string }) {
  const map: Record<string, { bg: string; color: string; label: string }> = {
    individual: { bg: "rgba(108,99,255,0.15)", color: "#6c63ff", label: "Individual" },
    group: { bg: "rgba(56,217,169,0.15)", color: "#38d9a9", label: "Group" },
    both: { bg: "rgba(245,158,11,0.15)", color: "#f59e0b", label: "Both" },
  };
  const t = map[type] || map.both;
  return <span style={{ display: "inline-flex", alignItems: "center", padding: "3px 10px", borderRadius: 20, fontSize: "0.75rem", fontWeight: 500, background: t.bg, color: t.color }}>{t.label}</span>;
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <label style={{ position: "relative", width: 38, height: 22, cursor: "pointer", display: "inline-block" }}>
      <input type="checkbox" checked={checked} onChange={onChange} style={{ opacity: 0, width: 0, height: 0 }} />
      <span style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: checked ? "#38d9a9" : "#252b3b", borderRadius: 22, transition: "0.3s" }}>
        <span style={{ position: "absolute", width: 16, height: 16, left: checked ? 19 : 3, top: 3, background: "#fff", borderRadius: "50%", transition: "0.3s" }} />
      </span>
    </label>
  );
}

function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#161a23", border: "1px solid #252b3b", borderRadius: 16, padding: 32, width: 520, maxWidth: "95vw" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, fontFamily: "'Syne',sans-serif", fontSize: "1.2rem", fontWeight: 700 }}>
          {title}
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#7a8299", cursor: "pointer", fontSize: "1.4rem", lineHeight: 1 }}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function FInput({ label, ...props }: { label?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div style={{ marginBottom: 18 }}>
      {label && <label style={{ display: "block", fontSize: "0.82rem", color: "#7a8299", marginBottom: 7, fontWeight: 500 }}>{label}</label>}
      <input {...props} style={{ width: "100%", background: "#1e2330", border: "1.5px solid #252b3b", borderRadius: 8, padding: "10px 14px", color: "#e8eaf0", fontSize: "0.88rem", fontFamily: "'DM Sans',sans-serif", outline: "none", boxSizing: "border-box" }} />
    </div>
  );
}

function FSelect({ label, options }: { label?: string; options: string[] }) {
  return (
    <div style={{ marginBottom: 18 }}>
      {label && <label style={{ display: "block", fontSize: "0.82rem", color: "#7a8299", marginBottom: 7, fontWeight: 500 }}>{label}</label>}
      <select style={{ width: "100%", background: "#1e2330", border: "1.5px solid #252b3b", borderRadius: 8, padding: "10px 14px", color: "#e8eaf0", fontSize: "0.88rem", fontFamily: "'DM Sans',sans-serif", outline: "none" }}>
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}

function Btn({ children, variant = "primary", onClick, style: sx = {} }: { children: React.ReactNode; variant?: "primary" | "ghost"; onClick?: () => void; style?: React.CSSProperties }) {
  const base: React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 8, fontSize: "0.88rem", fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", transition: "all 0.2s" };
  const vs: Record<string, React.CSSProperties> = { primary: { background: "#6c63ff", color: "#fff", border: "none" }, ghost: { background: "#1e2330", color: "#e8eaf0", border: "1px solid #252b3b" } };
  return <button onClick={onClick} style={{ ...base, ...vs[variant], ...sx }}>{children}</button>;
}

// ── CONTENT PANEL ──────────────────────────────────────────────────────────
function ContentPanel() {
  const [items, setItems] = useState(CONTENT_DATA);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = items.filter(i => {
    const matchFilter = filter === "all" || i.type === filter || i.session === filter;
    return matchFilter && i.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      <div style={s.topbar}>
        <div><div style={s.pageTitle}>Content Library</div><div style={s.pageSub}>Manage all session media, documents and resources</div></div>
        <Btn onClick={() => setModalOpen(true)}>+ Add Content</Btn>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18, marginBottom: 36 }}>
        {[{ label: "Total Items", num: items.length, sub: "↑ 3 this week", color: "#6c63ff" }, { label: "Videos", num: items.filter(i => i.type === "video").length, sub: "Individual & group", color: "#38d9a9" }, { label: "Documents", num: items.filter(i => i.type === "doc").length, sub: "PDFs & worksheets", color: "#f59e0b" }, { label: "Images", num: items.filter(i => i.type === "image").length, sub: "Visible to all", color: "#f04a5a" }].map(stat => (
          <div key={stat.label} style={{ background: "#161a23", border: "1px solid #252b3b", borderRadius: 12, padding: 22, borderTop: `3px solid ${stat.color}` }}>
            <div style={{ fontSize: "0.78rem", color: "#7a8299", marginBottom: 8 }}>{stat.label}</div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "2rem", fontWeight: 700 }}>{stat.num}</div>
            <div style={{ fontSize: "0.75rem", color: "#7a8299", marginTop: 4 }}>{stat.sub}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 4, background: "#161a23", border: "1px solid #252b3b", borderRadius: 10, padding: 5, marginBottom: 28, width: "fit-content" }}>
        {[{ key: "all", label: "All" }, { key: "individual", label: "Individual" }, { key: "group", label: "Group" }, { key: "video", label: "Videos" }, { key: "doc", label: "Documents" }].map(t => (
          <button key={t.key} onClick={() => setFilter(t.key)} style={{ padding: "8px 20px", borderRadius: 7, cursor: "pointer", fontSize: "0.88rem", fontWeight: 500, border: "none", fontFamily: "'DM Sans',sans-serif", background: filter === t.key ? "#6c63ff" : "none", color: filter === t.key ? "#fff" : "#7a8299" }}>{t.label}</button>
        ))}
      </div>
      <div style={s.card}>
        <div style={{ display: "flex", gap: 12, padding: "16px 20px", borderBottom: "1px solid #252b3b" }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search content…" style={{ flex: 1, background: "#1e2330", border: "1px solid #252b3b", borderRadius: 8, padding: "9px 14px", color: "#e8eaf0", fontSize: "0.88rem", fontFamily: "'DM Sans',sans-serif", outline: "none" }} />
        </div>
        <table style={s.table}>
          <thead><tr>{["Content", "Session Type", "Visible to Clients", "Uploaded", "Actions"].map(h => <th key={h} style={s.th}>{h}</th>)}</tr></thead>
          <tbody>
            {filtered.map(item => (
              <tr key={item.id} style={{ borderTop: "1px solid #252b3b" }}>
                <td style={s.td}><div style={{ display: "flex", alignItems: "center", gap: 12 }}><div style={{ width: 40, height: 40, borderRadius: 8, background: "#1e2330", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>{item.icon}</div><div><div style={{ fontWeight: 500 }}>{item.name}</div><div style={{ fontSize: "0.75rem", color: "#7a8299" }}>{item.meta}</div></div></div></td>
                <td style={s.td}><Tag type={item.session} /></td>
                <td style={s.td}><div style={{ display: "flex", alignItems: "center", gap: 8 }}><Toggle checked={item.visible} onChange={() => setItems(prev => prev.map(i => i.id === item.id ? { ...i, visible: !i.visible } : i))} /><span style={{ fontSize: "0.8rem", color: item.visible ? "#38d9a9" : "#7a8299" }}>{item.visible ? "On" : "Off"}</span></div></td>
                <td style={{ ...s.td, color: "#7a8299" }}>{item.date}</td>
                <td style={s.td}><div style={{ display: "flex", gap: 6 }}>{["✏️", "🗑️"].map(ic => <div key={ic} style={{ width: 32, height: 32, borderRadius: 7, background: "#1e2330", border: "1px solid #252b3b", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "0.85rem" }}>{ic}</div>)}</div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add New Content">
        <FInput label="Content Title" placeholder="e.g. Week 1 Breathwork Session" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}><FSelect label="Content Type" options={["Video", "Document / PDF", "Image", "Audio"]} /><FSelect label="Session Type" options={["Individual", "Group", "Both"]} /></div>
        <div style={{ border: "2px dashed #252b3b", borderRadius: 10, padding: 32, textAlign: "center", color: "#7a8299", cursor: "pointer", marginBottom: 18 }}>
          <div style={{ fontSize: "2rem", marginBottom: 8 }}>⬆️</div>
          <p style={{ fontSize: "0.85rem" }}>Drop file here or <strong style={{ color: "#6c63ff" }}>browse</strong></p>
          <small style={{ fontSize: "0.75rem" }}>MP4, PDF, DOCX, PNG, JPG · Max 500MB</small>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 24 }}><Btn variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Btn><Btn onClick={() => setModalOpen(false)}>Upload Content</Btn></div>
      </Modal>
    </>
  );
}

// ── CLIENTS PANEL ──────────────────────────────────────────────────────────
function ClientsPanel() {
  const [inviteModal, setInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteName, setInviteName] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleInvite = async () => {
    if (!inviteEmail) return;
    setLoading(true); setError("");
    const { error: err } = await supabase.auth.signInWithOtp({
      email: inviteEmail,
      options: { emailRedirectTo: `${window.location.origin}/client-portal` },
    });
    setLoading(false);
    if (err) setError(err.message);
    else setSuccess(true);
  };

  return (
    <>
      <div style={s.topbar}>
        <div><div style={s.pageTitle}>Client Management</div><div style={s.pageSub}>Manage client accounts and portal access</div></div>
        <Btn onClick={() => { setInviteModal(true); setSuccess(false); setError(""); setInviteEmail(""); setInviteName(""); }}>+ Invite Client</Btn>
      </div>
      <div style={s.card}>
        <div style={{ display: "flex", gap: 12, padding: "16px 20px", borderBottom: "1px solid #252b3b" }}>
          <input placeholder="Search clients…" style={{ flex: 1, background: "#1e2330", border: "1px solid #252b3b", borderRadius: 8, padding: "9px 14px", color: "#e8eaf0", fontSize: "0.88rem", fontFamily: "'DM Sans',sans-serif", outline: "none" }} />
        </div>
        <table style={s.table}>
          <thead><tr>{["Client", "Session Type", "Content Access", "Status", "Last Login", "Actions"].map(h => <th key={h} style={s.th}>{h}</th>)}</tr></thead>
          <tbody>
            {CLIENTS_DATA.map(c => (
              <tr key={c.id}>
                <td style={s.td}><div style={{ display: "flex", alignItems: "center", gap: 12 }}><div style={{ width: 36, height: 36, borderRadius: "50%", background: c.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.75rem", color: "#fff", flexShrink: 0 }}>{c.initials}</div><div><div style={{ fontWeight: 500 }}>{c.name}</div><div style={{ fontSize: "0.75rem", color: "#7a8299" }}>{c.email}</div></div></div></td>
                <td style={s.td}><Tag type={c.session} /></td>
                <td style={s.td}><div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>{c.access.map(a => <span key={a} style={{ background: "#1e2330", border: "1px solid #252b3b", borderRadius: 6, padding: "3px 9px", fontSize: "0.73rem", color: "#7a8299" }}>{a}</span>)}</div></td>
                <td style={s.td}><span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: c.status === "active" ? "#38d9a9" : "#7a8299", marginRight: 6 }} />{c.status === "active" ? "Active" : "Inactive"}</td>
                <td style={{ ...s.td, color: "#7a8299" }}>{c.lastLogin}</td>
                <td style={s.td}><div style={{ display: "flex", gap: 6 }}>{["✏️", "🗑️"].map(ic => <div key={ic} style={{ width: 32, height: 32, borderRadius: 7, background: "#1e2330", border: "1px solid #252b3b", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "0.85rem" }}>{ic}</div>)}</div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal open={inviteModal} onClose={() => setInviteModal(false)} title="Invite Client">
        {success ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>✅</div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, marginBottom: 8 }}>Invite sent!</div>
            <p style={{ color: "#7a8299", fontSize: "0.88rem" }}>A login link has been sent to <strong style={{ color: "#e8eaf0" }}>{inviteEmail}</strong></p>
            <Btn style={{ marginTop: 24 }} onClick={() => setInviteModal(false)}>Done</Btn>
          </div>
        ) : (
          <>
            <FInput label="Full Name" placeholder="Client name" value={inviteName} onChange={e => setInviteName(e.target.value)} />
            <FInput label="Email Address" type="email" placeholder="client@email.com" value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} />
            <FSelect label="Session Type" options={["Individual Session", "Group Session"]} />
            {error && <div style={{ color: "#f04a5a", fontSize: "0.84rem", marginBottom: 12 }}>{error}</div>}
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 24 }}>
              <Btn variant="ghost" onClick={() => setInviteModal(false)}>Cancel</Btn>
              <Btn onClick={handleInvite}>{loading ? "Sending…" : "Send Invite"}</Btn>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}

// ── SESSIONS PANEL ─────────────────────────────────────────────────────────
function SessionsPanel() {
  const cols = [
    { title: "Individual Sessions", count: "4 Active", color: "#6c63ff", colorBg: "rgba(108,99,255,0.15)", items: [{ name: "Session with Alex M.", meta: "3 items · Next: Mar 16", tags: ["🎬 Intro Video", "📄 Worksheet"] }, { name: "Session with Jordan L.", meta: "2 items · Next: Mar 18", tags: ["🎬 Breathwork", "📄 Worksheet"] }] },
    { title: "Group Sessions", count: "2 Active", color: "#38d9a9", colorBg: "rgba(56,217,169,0.15)", items: [{ name: "Morning Wellness Group", meta: "8 participants · 4 items", tags: ["🎬 Group Breathwork", "🖼️ Diagram"] }, { name: "Advanced Techniques Group", meta: "5 participants · 2 items", tags: ["🎬 Advanced Techniques"] }] },
  ];
  return (
    <>
      <div style={s.topbar}><div><div style={s.pageTitle}>Session Management</div><div style={s.pageSub}>Assign content to individual or group sessions</div></div></div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        {cols.map(col => (
          <div key={col.title} style={{ ...s.card, padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700 }}>{col.title}</div>
              <span style={{ background: col.colorBg, color: col.color, padding: "3px 10px", borderRadius: 20, fontSize: "0.75rem", fontWeight: 600 }}>{col.count}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {col.items.map(item => (
                <div key={item.name} style={{ background: "#1e2330", border: "1px solid #252b3b", borderRadius: 10, padding: 14 }}>
                  <div style={{ fontWeight: 500, marginBottom: 4 }}>{item.name}</div>
                  <div style={{ fontSize: "0.78rem", color: "#7a8299", marginBottom: 10 }}>{item.meta}</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{item.tags.map(t => <span key={t} style={{ background: "#252b3b", borderRadius: 6, padding: "3px 9px", fontSize: "0.73rem", color: "#7a8299" }}>{t}</span>)}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// ── ACCESS PANEL ───────────────────────────────────────────────────────────
function AccessPanel() {
  const [accessModal, setAccessModal] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [contentAccess, setContentAccess] = useState(CONTENT_DATA.map(i => ({ ...i })));

  return (
    <>
      <div style={s.topbar}><div><div style={s.pageTitle}>Access Control</div><div style={s.pageSub}>Control which content is visible to each client or group</div></div></div>
      <div style={{ ...s.card, padding: 28 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
          {[
            { title: "Individual Client Access", color: "#6c63ff", colorBg: "rgba(108,99,255,0.15)", data: [{ name: "Alex Martin", items: [{ label: "✓ Intro Video", on: true }, { label: "✓ Worksheet", on: true }, { label: "✗ Advanced Video", on: false }] }, { name: "Jordan Lee", items: [{ label: "✓ Breathwork", on: true }, { label: "✗ Intro Video", on: false }] }] },
            { title: "Group Access", color: "#38d9a9", colorBg: "rgba(56,217,169,0.15)", data: [{ name: "Morning Wellness Group", sub: "8 members", items: [{ label: "✓ Group Breathwork", on: true }, { label: "✓ Worksheet", on: true }, { label: "✗ Advanced Video", on: false }] }] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, marginBottom: 16 }}>{col.title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {col.data.map(c => (
                  <div key={c.name} style={{ background: "#1e2330", border: "1px solid #252b3b", borderRadius: 10, padding: 16 }}>
                    <div style={{ fontWeight: 500, marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      {c.name}
                      <Btn variant="ghost" style={{ padding: "5px 12px", fontSize: "0.78rem" }} onClick={() => { setSelected(c.name); setAccessModal(true); }}>Manage</Btn>
                    </div>
                    {"sub" in c && c.sub && <div style={{ fontSize: "0.8rem", color: "#7a8299", marginBottom: 8 }}>{c.sub}</div>}
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{c.items.map(i => <span key={i.label} style={{ background: i.on ? col.colorBg : "rgba(255,255,255,0.04)", color: i.on ? col.color : "#7a8299", padding: "3px 10px", borderRadius: 6, fontSize: "0.75rem" }}>{i.label}</span>)}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal open={accessModal} onClose={() => setAccessModal(false)} title={`Manage Access — ${selected}`}>
        <p style={{ color: "#7a8299", fontSize: "0.88rem", marginBottom: 20 }}>Toggle content visibility for this client</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {contentAccess.map(item => (
            <label key={item.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#1e2330", border: "1px solid #252b3b", borderRadius: 9, padding: "13px 16px", cursor: "pointer" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.88rem" }}><span>{item.icon}</span> {item.name}</div>
              <Toggle checked={item.visible} onChange={() => setContentAccess(prev => prev.map(i => i.id === item.id ? { ...i, visible: !i.visible } : i))} />
            </label>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 24 }}>
          <Btn variant="ghost" onClick={() => setAccessModal(false)}>Cancel</Btn>
          <Btn onClick={() => setAccessModal(false)}>Save Access</Btn>
        </div>
      </Modal>
    </>
  );
}

// ── ROOT ───────────────────────────────────────────────────────────────────
export default function AdminCMS() {
  const [activePanel, setActivePanel] = useState("content");

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  const navItems = [
    { id: "content", label: "All Content", icon: "⊞", badge: 12, group: "Content" },
    { id: "sessions", label: "Sessions", icon: "👥", group: "Content" },
    { id: "clients", label: "Clients", icon: "👤", group: "Access" },
    { id: "access", label: "Access Control", icon: "🔒", group: "Access" },
  ];

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');`}</style>
      <div style={s.root}>
        <aside style={s.sidebar}>
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.3rem", color: "#e8eaf0", padding: "0 24px 28px", borderBottom: "1px solid #252b3b", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "linear-gradient(135deg,#6c63ff,#38d9a9)" }} />
            <span style={{ background: "linear-gradient(135deg,#6c63ff,#38d9a9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Mindful</span>Mind
          </div>
          <nav style={{ marginTop: 24, flex: 1 }}>
            {["Content", "Access"].map(g => (
              <div key={g}>
                <div style={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#7a8299", padding: "0 24px 8px", fontWeight: 500 }}>{g}</div>
                {navItems.filter(n => n.group === g).map(item => (
                  <div key={item.id} onClick={() => setActivePanel(item.id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 24px", cursor: "pointer", color: activePanel === item.id ? "#6c63ff" : "#7a8299", fontSize: "0.9rem", borderLeft: `3px solid ${activePanel === item.id ? "#6c63ff" : "transparent"}`, background: activePanel === item.id ? "rgba(108,99,255,0.08)" : "none" }}>
                    <span>{item.icon}</span>{item.label}
                    {item.badge && <span style={{ marginLeft: "auto", background: "#6c63ff", color: "#fff", fontSize: "0.65rem", padding: "2px 7px", borderRadius: 20, fontWeight: 600 }}>{item.badge}</span>}
                  </div>
                ))}
              </div>
            ))}
          </nav>
          <div style={{ padding: "20px 24px 0", borderTop: "1px solid #252b3b" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.85rem" }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#6c63ff,#38d9a9)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.8rem", color: "#fff", flexShrink: 0 }}>MM</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 500 }}>Mindful Mind</div>
                <div style={{ fontSize: "0.72rem", color: "#7a8299", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>mindful-mind@outlook.com</div>
              </div>
              <button onClick={handleLogout} title="Sign out" style={{ background: "none", border: "none", cursor: "pointer", color: "#7a8299", fontSize: "1rem" }}>↩</button>
            </div>
          </div>
        </aside>
        <main style={s.main}>
          {activePanel === "content" && <ContentPanel />}
          {activePanel === "sessions" && <SessionsPanel />}
          {activePanel === "clients" && <ClientsPanel />}
          {activePanel === "access" && <AccessPanel />}
        </main>
      </div>
    </>
  );
}
