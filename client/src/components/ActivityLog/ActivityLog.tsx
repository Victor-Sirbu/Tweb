import "./ActivityLog.css";
import { useState } from "react";

interface AuditEntry {
    id: number;
    adminName: string;
    adminRole: string;
    action: string;
    actionType: "edit" | "delete" | "modify" | "create" | "login";
    target: string;
    targetType: "patient" | "appointment" | "record" | "user" | "system";
    details: string;
    date: string;
    time: string;
    ip: string;
}

const auditLog: AuditEntry[] = [
    {
        id: 1,
        adminName: "Alexandru Popa",
        adminRole: "Administrator",
        action: "Editare fișă pacient",
        actionType: "edit",
        target: "Ion Popescu",
        targetType: "patient",
        details: "A modificat diagnosticul și prescripția medicamentelor în fișa pacientului.",
        date: "20 Feb 2026",
        time: "10:45",
        ip: "192.168.1.10"
    },
    {
        id: 2,
        adminName: "Ion Popescu",
        adminRole: "Pacient",
        action: "Creare programare",
        actionType: "create",
        target: "Dr. Tatiana Cobzac — 25 Feb 2026",
        targetType: "appointment",
        details: "Pacientul a creat o programare nouă la Medicină Internă.",
        date: "20 Feb 2026",
        time: "09:30",
        ip: "192.168.1.20"
    },
    {
        id: 3,
        adminName: "Admin Sistem",
        adminRole: "Super Admin",
        action: "Ștergere cont",
        actionType: "delete",
        target: "Elena Cojocaru",
        targetType: "patient",
        details: "Contul și dosarul medical au fost șterse definitiv la cererea pacientei.",
        date: "19 Feb 2026",
        time: "16:20",
        ip: "192.168.1.1"
    },
    {
        id: 4,
        adminName: "Vasile Rusu",
        adminRole: "Pacient",
        action: "Modificare programare",
        actionType: "modify",
        target: "Dr. Vasile Munteanu — 28 Feb 2026",
        targetType: "appointment",
        details: "Pacientul a reprogramat consultația cardiologică de la 22 Feb la 28 Feb 2026.",
        date: "19 Feb 2026",
        time: "14:05",
        ip: "192.168.1.21"
    },
    {
        id: 5,
        adminName: "Alexandru Popa",
        adminRole: "Administrator",
        action: "Editare rezultate analize",
        actionType: "edit",
        target: "Natalia Botnaru",
        targetType: "record",
        details: "A actualizat valorile hemoleucogramei și a adăugat observații clinice.",
        date: "18 Feb 2026",
        time: "13:15",
        ip: "192.168.1.10"
    },
    {
        id: 6,
        adminName: "Admin Sistem",
        adminRole: "Super Admin",
        action: "Autentificare sistem",
        actionType: "login",
        target: "Panou Administrare",
        targetType: "system",
        details: "Autentificare reușită în panoul de administrare din rețeaua internă.",
        date: "18 Feb 2026",
        time: "08:00",
        ip: "192.168.1.1"
    },
    {
        id: 7,
        adminName: "Elena Ciobanu",
        adminRole: "Pacient",
        action: "Anulare programare",
        actionType: "delete",
        target: "Dr. Natalia Botnari — 15 Feb 2026",
        targetType: "appointment",
        details: "Pacienta a anulat programarea la Pediatrie cu 48h înainte de consultație.",
        date: "13 Feb 2026",
        time: "11:50",
        ip: "192.168.1.22"
    },
    {
        id: 8,
        adminName: "Alexandru Popa",
        adminRole: "Administrator",
        action: "Creare cont utilizator",
        actionType: "create",
        target: "Gheorghe Popa",
        targetType: "user",
        details: "A creat un cont nou de pacient și a configurat preferințele de notificare.",
        date: "12 Feb 2026",
        time: "15:30",
        ip: "192.168.1.10"
    }
];

const actionFilters = ["Toate", "Editare", "Ștergere", "Modificare", "Creare", "Autentificare"];

const schedule = [
    { day: "Luni - Vineri", hours: "08:00 - 20:00" },
    { day: "Sâmbătă", hours: "09:00 - 14:00" },
    { day: "Duminică", hours: "Închis" }
];

const ActivityLog = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState("Toate");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedEntry, setSelectedEntry] = useState<AuditEntry | null>(null);

    const filtered = auditLog.filter((entry) => {
        const typeMap: Record<string, string[]> = {
            "Editare": ["edit"],
            "Ștergere": ["delete"],
            "Modificare": ["modify"],
            "Creare": ["create"],
            "Autentificare": ["login"]
        };
        const matchType = activeFilter === "Toate" || (typeMap[activeFilter]?.includes(entry.actionType));
        const q = searchQuery.toLowerCase();
        const matchSearch =
            entry.adminName.toLowerCase().includes(q) ||
            entry.action.toLowerCase().includes(q) ||
            entry.target.toLowerCase().includes(q) ||
            entry.details.toLowerCase().includes(q);
        return matchType && matchSearch;
    });

    const getActionClass = (type: string) => {
        switch (type) {
            case "edit": return "al-badge-edit";
            case "delete": return "al-badge-delete";
            case "modify": return "al-badge-modify";
            case "create": return "al-badge-create";
            case "login": return "al-badge-login";
            default: return "";
        }
    };

    const getActionLabel = (type: string) => {
        switch (type) {
            case "edit": return "Editare";
            case "delete": return "Stergere";
            case "modify": return "Modificare";
            case "create": return "Creare";
            case "login": return "Autentificare";
            default: return type;
        }
    };

    const getTargetClass = (type: string) => {
        switch (type) {
            case "patient": return "al-target-patient";
            case "appointment": return "al-target-appointment";
            case "record": return "al-target-record";
            case "system": return "al-target-system";
            case "user": return "al-target-user";
            default: return "";
        }
    };

    const stats = {
        total: auditLog.length,
        edits: auditLog.filter(a => a.actionType === "edit").length,
        deletes: auditLog.filter(a => a.actionType === "delete").length,
        modifies: auditLog.filter(a => a.actionType === "modify" || a.actionType === "create").length,
    };

    return (
        <div className="al-page">

            <nav className="al-navbar">
                <div className="al-navbar-container">
                    <div className="al-navbar-logo">
                        <div className="al-logo-text">
                            <span className="al-logo-title">MediCare</span>
                            <span className="al-logo-subtitle">Cabinet Medical</span>
                        </div>
                    </div>

                    <button className="al-menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>&#9776;</button>

                    <ul className={`al-navbar-menu ${menuOpen ? "active" : ""}`}>
                        <li><a href="/">Acasa</a></li>
                        <li><a href="/services">Servicii</a></li>
                        <li><a href="/profile">Profilul Meu</a></li>
                        <li><a href="/activity" className="al-nav-active">Audit & Activitate</a></li>
                        <li><a href="/#contact">Contact</a></li>
                    </ul>

                    <div className="al-navbar-actions">
                        <a href="tel:+37322123456" className="al-navbar-phone">+373 22 123 456</a>
                        <button className="al-navbar-btn">Programare</button>
                    </div>
                </div>
            </nav>

            <section className="al-hero">
                <div className="al-hero-container">
                    <div className="al-hero-content">
                        <div className="al-hero-badge">Panou Administrator</div>
                        <h1 className="al-hero-title">
                            Audit &amp; Istoric<br />
                            <span className="al-hero-highlight">Activitate Sistem</span>
                        </h1>
                        <p className="al-hero-description">
                            Monitorizare completa a tuturor actiunilor efectuate in sistem: editari fise pacient,
                            stergeri conturi, modificari programari si autentificari administrator.
                        </p>
                    </div>
                    <div className="al-hero-stats">
                        <div className="al-stat-card">
                            <span className="al-stat-number">{stats.total}</span>
                            <span className="al-stat-label">Total Actiuni</span>
                        </div>
                        <div className="al-stat-card">
                            <span className="al-stat-number">{stats.edits}</span>
                            <span className="al-stat-label">Editari</span>
                        </div>
                        <div className="al-stat-card">
                            <span className="al-stat-number">{stats.deletes}</span>
                            <span className="al-stat-label">Stergeri</span>
                        </div>
                        <div className="al-stat-card">
                            <span className="al-stat-number">{stats.modifies}</span>
                            <span className="al-stat-label">Modificari</span>
                        </div>
                    </div>
                </div>
            </section>

            {selectedEntry && (
                <div className="al-modal-overlay" onClick={() => setSelectedEntry(null)}>
                    <div className="al-modal-box" onClick={(e) => e.stopPropagation()}>
                        <div className="al-modal-header">
                            <h3 className="al-modal-title">Detalii Actiune Audit</h3>
                            <button className="al-modal-close" onClick={() => setSelectedEntry(null)}>&#10005;</button>
                        </div>
                        <div className="al-modal-body">
                            <div className="al-modal-row">
                                <span className="al-modal-label">Administrator</span>
                                <span className="al-modal-value">{selectedEntry.adminName}</span>
                            </div>
                            <div className="al-modal-row">
                                <span className="al-modal-label">Rol</span>
                                <span className="al-modal-value">{selectedEntry.adminRole}</span>
                            </div>
                            <div className="al-modal-row">
                                <span className="al-modal-label">Actiune</span>
                                <span className={`al-action-badge ${getActionClass(selectedEntry.actionType)}`}>
                                    {getActionLabel(selectedEntry.actionType)}
                                </span>
                            </div>
                            <div className="al-modal-row">
                                <span className="al-modal-label">Tinta</span>
                                <span className="al-modal-value">{selectedEntry.target}</span>
                            </div>
                            <div className="al-modal-row">
                                <span className="al-modal-label">Tip tinta</span>
                                <span className={`al-target-badge ${getTargetClass(selectedEntry.targetType)}`}>
                                    {selectedEntry.targetType}
                                </span>
                            </div>
                            <div className="al-modal-row al-modal-row-full">
                                <span className="al-modal-label">Descriere</span>
                                <span className="al-modal-value al-modal-details">{selectedEntry.details}</span>
                            </div>
                            <div className="al-modal-row">
                                <span className="al-modal-label">Data si ora</span>
                                <span className="al-modal-value">{selectedEntry.date} — {selectedEntry.time}</span>
                            </div>
                            <div className="al-modal-row">
                                <span className="al-modal-label">Adresa IP</span>
                                <span className="al-modal-value al-ip">{selectedEntry.ip}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="al-main">
                <div className="al-main-container">

                    <aside className="al-sidebar">
                        <div className="al-sidebar-card">
                            <h3 className="al-sidebar-title">Filtrare Actiuni</h3>
                            <div className="al-filter-buttons">
                                {actionFilters.map((f) => {
                                    const typeMap: Record<string, string> = {
                                        "Editare": "edit",
                                        "Stergere": "delete",
                                        "Modificare": "modify",
                                        "Creare": "create",
                                        "Autentificare": "login"
                                    };
                                    const count = f === "Toate"
                                        ? auditLog.length
                                        : auditLog.filter(a => a.actionType === typeMap[f]).length;
                                    return (
                                        <button
                                            key={f}
                                            className={`al-filter-btn ${activeFilter === f ? "al-filter-active" : ""}`}
                                            onClick={() => setActiveFilter(f)}
                                        >
                                            <span>{f}</span>
                                            <span className="al-filter-count">{count}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="al-sidebar-card">
                            <h3 className="al-sidebar-title">Administratori Activi</h3>
                            <div className="al-admin-list">
                                {[...new Map(auditLog.map(a => [a.adminName, a])).values()]
                                    .filter(a => a.adminRole === "Administrator" || a.adminRole === "Super Admin")
                                    .map((a, i) => (
                                        <div key={i} className="al-admin-item">
                                            <div className="al-admin-avatar">
                                                {a.adminName.split(" ").slice(-2).map(w => w[0]).join("").toUpperCase().slice(0, 2)}
                                            </div>
                                            <div className="al-admin-info">
                                                <span className="al-admin-name">{a.adminName}</span>
                                                <span className="al-admin-role">{a.adminRole}</span>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </aside>

                    <main className="al-content">
                        <div className="al-content-header">
                            <div>
                                <h2 className="al-content-title">Jurnal Audit Sistem</h2>
                                <p className="al-content-sub">{filtered.length} inregistrari gasite</p>
                            </div>
                            <input
                                className="al-search-input"
                                type="text"
                                placeholder="Cauta dupa admin, actiune, pacient..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="al-table-wrapper">
                            <table className="al-table">
                                <thead>
                                    <tr>
                                        <th>Data / Ora</th>
                                        <th>Utilizator</th>
                                        <th>Actiune</th>
                                        <th>Tinta</th>
                                        <th>Tip</th>
                                        <th>IP</th>
                                        <th>Detalii</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="al-empty-row">
                                                <div className="al-empty-state">
                                                    <p className="al-empty-title">Nicio inregistrare gasita</p>
                                                    <p className="al-empty-sub">Modifica filtrele sau cautarea.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        filtered.map((entry) => (
                                            <tr key={entry.id} className="al-table-row">
                                                <td className="al-td-date">
                                                    <span className="al-date">{entry.date}</span>
                                                    <span className="al-time">{entry.time}</span>
                                                </td>
                                                <td className="al-td-admin">
                                                    <div className="al-admin-cell">
                                                        <div className="al-admin-avatar-sm">
                                                            {entry.adminName.split(" ").slice(-2).map(w => w[0]).join("").toUpperCase().slice(0, 2)}
                                                        </div>
                                                        <div>
                                                            <span className="al-admin-name-sm">{entry.adminName}</span>
                                                            <span className="al-admin-role-sm">{entry.adminRole}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className={`al-action-badge ${getActionClass(entry.actionType)}`}>
                                                        {getActionLabel(entry.actionType)}
                                                    </span>
                                                </td>
                                                <td className="al-td-target">{entry.target}</td>
                                                <td>
                                                    <span className={`al-target-badge ${getTargetClass(entry.targetType)}`}>
                                                        {entry.targetType}
                                                    </span>
                                                </td>
                                                <td className="al-td-ip">{entry.ip}</td>
                                                <td>
                                                    <button
                                                        className="al-details-btn"
                                                        onClick={() => setSelectedEntry(entry)}
                                                    >
                                                        Vezi
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </main>
                </div>
            </div>

            <footer className="al-footer">
                <div className="al-footer-container">
                    <div className="al-footer-section">
                        <div className="al-logo-text">
                            <span className="al-logo-title-footer">MediCare</span>
                            <span className="al-logo-subtitle-footer">Cabinet Medical</span>
                        </div>
                        <p className="al-footer-description">
                            Cabinet medical modern cu servicii complete de diagnostic si tratament.
                        </p>
                    </div>

                    <div className="al-footer-section">
                        <h3 className="al-footer-title">Link-uri Rapide</h3>
                        <ul className="al-footer-links">
                            <li><a href="/">Acasa</a></li>
                            <li><a href="/services">Servicii Medicale</a></li>
                            <li><a href="/profile">Profilul Meu</a></li>
                            <li><a href="/activity">Audit & Activitate</a></li>
                        </ul>
                    </div>

                    <div className="al-footer-section">
                        <h3 className="al-footer-title">Program</h3>
                        <ul className="al-footer-schedule">
                            {schedule.map((item, index) => (
                                <li key={index}>
                                    <span>{item.day}</span>
                                    <span className="al-hours">{item.hours}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="al-footer-section">
                        <h3 className="al-footer-title">Contact</h3>
                        <ul className="al-footer-contact">
                            <li><span className="al-contact-label">Adresa:</span><span>Bd. Stefan cel Mare nr. 123, Chisinau</span></li>
                            <li><span className="al-contact-label">Telefon:</span><span>+373 22 123 456</span></li>
                            <li><span className="al-contact-label">Email:</span><span>contact@medicare.md</span></li>
                        </ul>
                    </div>
                </div>
                <div className="al-footer-bottom">
                    <p>© 2026 MediCare Cabinet Medical. Toate drepturile rezervate.</p>
                </div>
            </footer>
        </div>
    );
};

export default ActivityLog;
