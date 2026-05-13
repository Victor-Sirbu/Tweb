import "./ActivityLog.css";
import AdminNavbar from "../../shared/AdminNavbar/AdminNavbar";
import Footer from "../../shared/Footer/Footer";
import { useState, useEffect } from "react";
import heroBg6 from "../../assets/hero-bg6.jpg";
import heroBg7 from "../../assets/hero-bg7.jpg";
import heroBg8 from "../../assets/hero-bg8.jpg";
import heroBg9 from "../../assets/hero-bg9.jpg";
import heroBg10 from "../../assets/hero-bg10.jpg";
import { useLanguage } from "../../context/LanguageContext";
import { useAudit } from "../../context/AuditContext";
import { useApi } from "../../api/context";
import type { AuditEntry } from "../../context/AuditContext";

const ActivityLog = () => {
    const { t, language } = useLanguage();
    const { entries: auditLog } = useAudit();
    const api = useApi();
    const [activeFilter, setActiveFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedEntry, setSelectedEntry] = useState<AuditEntry | null>(null);
    const [adminList, setAdminList] = useState<{ id: number; firstName: string; lastName: string; email: string; }[]>([]);

    const images = [heroBg6, heroBg7, heroBg8, heroBg9, heroBg10];
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setCurrentImage((prev) => (prev + 1) % images.length), 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        api.get<{ id: number; firstName: string; lastName: string; email: string; }[]>('/api/admin/list')
            .then(d => setAdminList(d ?? []))
            .catch(() => setAdminList([]));
    }, [api]);

    const actionFilters = [
        { key: "all",    label: language === "ru" ? "Все"              : language === "en" ? "All"             : "Toate" },
        { key: "edit",   label: language === "ru" ? "Редактирование"   : language === "en" ? "Edit"            : "Editare" },
        { key: "delete", label: language === "ru" ? "Удаление"         : language === "en" ? "Delete"          : "Ștergere" },
        { key: "modify", label: language === "ru" ? "Изменение"        : language === "en" ? "Modify"          : "Modificare" },
        { key: "create", label: language === "ru" ? "Создание"         : language === "en" ? "Create"          : "Creare" },
        { key: "login",  label: language === "ru" ? "Аутентификация"   : language === "en" ? "Login"           : "Autentificare" },
    ];

    const filtered = auditLog.filter((entry) => {
        const matchType = activeFilter === "all" || entry.actionType === activeFilter;
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
            case "edit":   return "al-badge-edit";
            case "delete": return "al-badge-delete";
            case "modify": return "al-badge-modify";
            case "create": return "al-badge-create";
            case "login":  return "al-badge-login";
            default:       return "";
        }
    };

    const getActionLabel = (type: string) => {
        const f = actionFilters.find(af => af.key === type);
        return f ? f.label : type;
    };

    const getTargetLabel = (type: string) => {
        switch (type) {
            case "patient":      return t.auditTargetPatient;
            case "appointment":  return t.auditTargetAppointment;
            case "record":       return t.auditTargetRecord;
            case "system":       return t.auditTargetSystem;
            case "user":         return t.auditTargetUser;
            case "medic":        return language === "ru" ? "Врач"          : language === "en" ? "Doctor"       : "Medic";
            case "service":      return language === "ru" ? "Услуга"        : language === "en" ? "Service"      : "Serviciu";
            case "review":       return language === "ru" ? "Отзыв"         : language === "en" ? "Review"       : "Recenzie";
            case "notification": return language === "ru" ? "Уведомление"   : language === "en" ? "Notification" : "Notificare";
            case "news":         return language === "ru" ? "Новость"        : language === "en" ? "News"         : "Noutate";
            default:             return type;
        }
    };

    const getTargetClass = (type: string) => {
        switch (type) {
            case "patient":      return "al-target-patient";
            case "appointment":  return "al-target-appointment";
            case "record":       return "al-target-record";
            case "system":       return "al-target-system";
            case "user":         return "al-target-user";
            case "medic":        return "al-target-medic";
            case "service":      return "al-target-service";
            case "review":       return "al-target-review";
            case "notification": return "al-target-notification";
            case "news":         return "al-target-news";
            default:             return "";
        }
    };

    const stats = {
        total:    auditLog.length,
        edits:    auditLog.filter(a => a.actionType === "edit").length,
        deletes:  auditLog.filter(a => a.actionType === "delete").length,
        modifies: auditLog.filter(a => a.actionType === "modify" || a.actionType === "create").length,
    };

    const heroBadge = language === "ru" ? "Панель администратора" : language === "en" ? "Administrator Panel" : "Panou Administrator";
    const heroT1    = language === "ru" ? "Аудит & История"       : language === "en" ? "Audit & History"     : "Audit & Istoric";
    const heroT2    = language === "ru" ? "Активность системы"    : language === "en" ? "System Activity"     : "Activitate Sistem";
    const heroDesc  = language === "ru"
        ? "Полный мониторинг всех действий в системе: редактирование карт пациентов, удаление аккаунтов, изменение записей и аутентификация администратора."
        : language === "en"
            ? "Complete monitoring of all actions performed in the system: patient file edits, account deletions, appointment changes and administrator logins."
            : "Monitorizare completa a tuturor actiunilor efectuate in sistem: editari fise pacient, stergeri conturi, modificari programari si autentificari administrator.";

    const statLabels = {
        total: language === "ru" ? "Всего действий"  : language === "en" ? "Total Actions" : "Total Actiuni",
        edits: language === "ru" ? "Редактирований"  : language === "en" ? "Edits"         : "Editari",
        del:   language === "ru" ? "Удалений"         : language === "en" ? "Deletions"     : "Stergeri",
        mod:   language === "ru" ? "Изменений"        : language === "en" ? "Modifications" : "Modificari",
    };

    const filterTitle  = language === "ru" ? "Фильтр действий"        : language === "en" ? "Filter Actions"       : "Filtrare Actiuni";
    const activeAdmins = language === "ru" ? "Активные администраторы" : language === "en" ? "Active Administrators" : "Administratori Activi";
    const journalTitle = language === "ru" ? "Журнал аудита системы"   : language === "en" ? "System Audit Log"      : "Jurnal Audit Sistem";
    const foundRecords = language === "ru" ? "записей найдено"          : language === "en" ? "records found"         : "inregistrari gasite";
    const searchHolder = language === "ru" ? "Поиск по администратору, действию, пациенту..." : language === "en" ? "Search by admin, action, patient..." : "Cauta dupa admin, actiune, pacient...";
    const filterHint   = language === "ru" ? "Измените фильтры или поиск." : language === "en" ? "Adjust filters or search." : "Modifica filtrele sau cautarea.";
    const noActivityLbl = language === "ru" ? "Нет активности" : language === "en" ? "No activity yet" : "Nicio activitate înregistrată";
    const noActivitySub = language === "ru" ? "Действия в AdminDashboard будут появляться здесь." : language === "en" ? "Actions from AdminDashboard will appear here." : "Acțiunile din AdminDashboard vor apărea aici.";
    const noRecordLbl   = language === "ru" ? "Записей не найдено" : language === "en" ? "No records found" : "Nicio înregistrare găsită";

    const tableH = {
        date:    language === "ru" ? "Дата / Время" : language === "en" ? "Date / Time" : "Data / Ora",
        user:    language === "ru" ? "Пользователь" : language === "en" ? "User"        : "Utilizator",
        action:  language === "ru" ? "Действие"     : language === "en" ? "Action"      : "Actiune",
        target:  language === "ru" ? "Цель"         : language === "en" ? "Target"      : "Tinta",
        type:    language === "ru" ? "Тип"          : language === "en" ? "Type"        : "Tip",
        ip:      "IP",
        details: language === "ru" ? "Детали"       : language === "en" ? "Details"     : "Detalii",
    };

    const modalTitle = language === "ru" ? "Детали действия" : language === "en" ? "Action Details" : "Detalii Actiune Audit";
    const viewBtn    = language === "ru" ? "Просмотр"        : language === "en" ? "View"           : "Vezi";

    return (
        <div className="al-page">
            <AdminNavbar />

            <section className="al-hero">
                {images.map((img, index) => (
                    <div key={index} className="hero-slide" style={{ backgroundImage: `url(${img})`, opacity: index === currentImage ? 1 : 0 } as React.CSSProperties}></div>
                ))}
                <div className="hero-overlay"></div>
                <div className="al-hero-container">
                    <div className="al-hero-content">
                        <div className="al-hero-badge">{heroBadge}</div>
                        <h1 className="al-hero-title">
                            {heroT1}<br />
                            <span className="al-hero-highlight">{heroT2}</span>
                        </h1>
                        <p className="al-hero-description">{heroDesc}</p>
                    </div>
                    <div className="al-hero-stats">
                        <div className="al-stat-card"><span className="al-stat-number">{stats.total}</span><span className="al-stat-label">{statLabels.total}</span></div>
                        <div className="al-stat-card"><span className="al-stat-number">{stats.edits}</span><span className="al-stat-label">{statLabels.edits}</span></div>
                        <div className="al-stat-card"><span className="al-stat-number">{stats.deletes}</span><span className="al-stat-label">{statLabels.del}</span></div>
                        <div className="al-stat-card"><span className="al-stat-number">{stats.modifies}</span><span className="al-stat-label">{statLabels.mod}</span></div>
                    </div>
                </div>
            </section>

            {selectedEntry && (
                <div className="al-modal-overlay" onClick={() => setSelectedEntry(null)}>
                    <div className="al-modal-box" onClick={(e) => e.stopPropagation()}>
                        <div className="al-modal-header">
                            <h3 className="al-modal-title">{modalTitle}</h3>
                            <button className="al-modal-close" onClick={() => setSelectedEntry(null)}>&#10005;</button>
                        </div>
                        <div className="al-modal-body">
                            <div className="al-modal-row"><span className="al-modal-label">{t.adminName}</span><span className="al-modal-value">{selectedEntry.adminName}</span></div>
                            <div className="al-modal-row"><span className="al-modal-label">{language === "ru" ? "Роль" : language === "en" ? "Role" : "Rol"}</span><span className="al-modal-value">{selectedEntry.adminRole}</span></div>
                            <div className="al-modal-row"><span className="al-modal-label">{tableH.action}</span><span className={`al-action-badge ${getActionClass(selectedEntry.actionType)}`}>{getActionLabel(selectedEntry.actionType)}</span></div>
                            <div className="al-modal-row"><span className="al-modal-label">{tableH.target}</span><span className="al-modal-value">{selectedEntry.target}</span></div>
                            <div className="al-modal-row"><span className="al-modal-label">{tableH.type}</span><span className={`al-target-badge ${getTargetClass(selectedEntry.targetType)}`}>{getTargetLabel(selectedEntry.targetType)}</span></div>
                            <div className="al-modal-row al-modal-row-full"><span className="al-modal-label">{language === "ru" ? "Описание" : language === "en" ? "Description" : "Descriere"}</span><span className="al-modal-value al-modal-details">{selectedEntry.details}</span></div>
                            <div className="al-modal-row"><span className="al-modal-label">{tableH.date}</span><span className="al-modal-value">{selectedEntry.date} — {selectedEntry.time}</span></div>
                            <div className="al-modal-row"><span className="al-modal-label">{tableH.ip}</span><span className="al-modal-value al-ip">{selectedEntry.ip}</span></div>
                        </div>
                    </div>
                </div>
            )}

            <div className="al-main">
                <div className="al-main-container">
                    <aside className="al-sidebar">
                        <div className="al-sidebar-card">
                            <h3 className="al-sidebar-title">{filterTitle}</h3>
                            <div className="al-filter-buttons">
                                {actionFilters.map((f) => {
                                    const count = f.key === "all" ? auditLog.length : auditLog.filter(a => a.actionType === f.key).length;
                                    return (
                                        <button key={f.key} className={`al-filter-btn ${activeFilter === f.key ? "al-filter-active" : ""}`} onClick={() => setActiveFilter(f.key)}>
                                            <span>{f.label}</span>
                                            <span className="al-filter-count">{count}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="al-sidebar-card">
                            <h3 className="al-sidebar-title">{activeAdmins}</h3>
                            <div className="al-admin-list">
                                {adminList.length === 0 ? (
                                    <p style={{ color: '#95a5a6', fontSize: '14px' }}>
                                        {language === "ru" ? "Нет данных" : language === "en" ? "No data" : "Nicio dată"}
                                    </p>
                                ) : (
                                    adminList.map((admin) => (
                                        <div key={admin.id} className="al-admin-item">
                                            <div className="al-admin-avatar">
                                                {`${admin.firstName?.[0] ?? ''}${admin.lastName?.[0] ?? ''}`.toUpperCase()}
                                            </div>
                                            <div className="al-admin-info">
                                                <span className="al-admin-name">{admin.firstName} {admin.lastName}</span>
                                                <span className="al-admin-role">{admin.email}</span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </aside>

                    <main className="al-content">
                        <div className="al-content-header">
                            <div>
                                <h2 className="al-content-title">{journalTitle}</h2>
                                <p className="al-content-sub">{filtered.length} {foundRecords}</p>
                            </div>
                            <input className="al-search-input" type="text" placeholder={searchHolder} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        </div>

                        <div className="al-table-wrapper">
                            <table className="al-table">
                                <thead>
                                <tr>
                                    <th>{tableH.date}</th><th>{tableH.user}</th><th>{tableH.action}</th>
                                    <th>{tableH.target}</th><th>{tableH.type}</th><th>{tableH.ip}</th><th>{tableH.details}</th>
                                </tr>
                                </thead>
                                <tbody>
                                {auditLog.length === 0 ? (
                                    <tr><td colSpan={7} className="al-empty-row">
                                        <div className="al-empty-state">
                                            <p className="al-empty-title">{noActivityLbl}</p>
                                            <p className="al-empty-sub">{noActivitySub}</p>
                                        </div>
                                    </td></tr>
                                ) : filtered.length === 0 ? (
                                    <tr><td colSpan={7} className="al-empty-row">
                                        <div className="al-empty-state">
                                            <p className="al-empty-title">{noRecordLbl}</p>
                                            <p className="al-empty-sub">{filterHint}</p>
                                        </div>
                                    </td></tr>
                                ) : (
                                    filtered.map((entry) => (
                                        <tr key={entry.id} className="al-table-row">
                                            <td className="al-td-date"><span className="al-date">{entry.date}</span><span className="al-time">{entry.time}</span></td>
                                            <td className="al-td-admin">
                                                <div className="al-admin-cell">
                                                    <div className="al-admin-avatar-sm">{entry.adminName.split(" ").slice(-2).map((w: string) => w[0]).join("").toUpperCase().slice(0, 2)}</div>
                                                    <div><span className="al-admin-name-sm">{entry.adminName}</span><span className="al-admin-role-sm">{entry.adminRole}</span></div>
                                                </div>
                                            </td>
                                            <td><span className={`al-action-badge ${getActionClass(entry.actionType)}`}>{getActionLabel(entry.actionType)}</span></td>
                                            <td className="al-td-target">{entry.target}</td>
                                            <td><span className={`al-target-badge ${getTargetClass(entry.targetType)}`}>{getTargetLabel(entry.targetType)}</span></td>
                                            <td className="al-td-ip">{entry.ip}</td>
                                            <td><button className="al-details-btn" onClick={() => setSelectedEntry(entry)}>{viewBtn}</button></td>
                                        </tr>
                                    ))
                                )}
                                </tbody>
                            </table>
                        </div>
                    </main>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ActivityLog;
