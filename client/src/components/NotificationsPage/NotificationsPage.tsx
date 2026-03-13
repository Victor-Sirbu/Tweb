import { useState } from "react";
import "./NotificationsPage.css";
import { useLanguage } from "../../context/LanguageContext";

type Notification = {
    id: number;
    type: "programare" | "rezultat" | "reamintire" | "sistem";
    title: string;
    message: string;
    time: string;
    read: boolean;
};

const initialNotifications: Notification[] = [
    { id: 1, type: "programare", title: "Programare nouă", message: "Maria Popescu a făcut o programare pentru 28 Feb 2026, ora 10:00 la Dr. Ion Ionescu (Cardiologie).", time: "Acum 5 min", read: false },
    { id: 2, type: "rezultat", title: "Rezultate analize disponibile", message: "Rezultatele analizelor de sânge pentru Ion Ionescu sunt disponibile. Vă rugăm să le verificați.", time: "Acum 30 min", read: false },
    { id: 3, type: "reamintire", title: "Reamintire consultație mâine", message: "Mâine la ora 14:00 aveți consultație cu Ana Vasilescu la Dr. Ana Vasilescu (Pediatrie).", time: "1 oră în urmă", read: false },
    { id: 4, type: "programare", title: "Programare anulată", message: "Victor Gudima a anulat programarea din 27 Feb 2026, ora 09:30 la Dr. George Popescu (Medicina Generală).", time: "2 ore în urmă", read: true },
    { id: 5, type: "sistem", title: "Actualizare sistem finalizată", message: "Sistemul a fost actualizat cu succes la versiunea 2.4.1. Toate funcționalitățile sunt disponibile.", time: "Ieri, 18:30", read: true },
    { id: 6, type: "rezultat", title: "Rezultate EKG gata", message: "Rezultatele EKG pentru George Mihai (52 ani) sunt gata de vizualizat. Consultați fișa pacientului.", time: "Ieri, 15:10", read: true },
    { id: 7, type: "reamintire", title: "3 programări mâine", message: "Mâine aveți 3 programări: 09:00 Ion Ionescu, 11:00 Maria Popescu, 15:30 George Mihai.", time: "Ieri, 08:00", read: true },
    { id: 8, type: "programare", title: "Programare confirmată", message: "Programarea lui George Mihai pentru 26 Feb 2026 la ora 15:30 a fost confirmată cu succes.", time: "26 Feb, 10:00", read: true },
];

export default function NotificationsPage() {
    const { t, language } = useLanguage();
    const [notifications, setNotifications] = useState(initialNotifications);
    const [filtru, setFiltru] = useState("all");
    const [selected, setSelected] = useState<Notification | null>(null);

    const unreadCount = notifications.filter((n) => !n.read).length;

    const filtered = notifications.filter((n) => {
        if (filtru === "unread") return !n.read;
        if (filtru === "read") return n.read;
        return true;
    });

    const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

    const handleClick = (n: Notification) => {
        setSelected(n);
        setNotifications((prev) => prev.map((item) => (item.id === n.id ? { ...item, read: true } : item)));
    };

    const deleteNotif = (id: number) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
        if (selected?.id === id) setSelected(null);
    };

    const getTypeConfig = (type: string) => {
        if (language === "ru") {
            const ru: Record<string, { label: string; color: string; bg: string }> = {
                programare: { label: "Запись",       color: "#3a7bd5", bg: "#dbeafe" },
                rezultat:   { label: "Результат",    color: "#0d9488", bg: "#ccfbf1" },
                reamintire: { label: "Напоминание",  color: "#d97706", bg: "#fef3c7" },
                sistem:     { label: "Система",      color: "#6b7280", bg: "#f3f4f6" },
            };
            return ru[type] ?? { label: type, color: "#6b7280", bg: "#f3f4f6" };
        }
        if (language === "en") {
            const en: Record<string, { label: string; color: string; bg: string }> = {
                programare: { label: "Appointment", color: "#3a7bd5", bg: "#dbeafe" },
                rezultat:   { label: "Result",      color: "#0d9488", bg: "#ccfbf1" },
                reamintire: { label: "Reminder",    color: "#d97706", bg: "#fef3c7" },
                sistem:     { label: "System",      color: "#6b7280", bg: "#f3f4f6" },
            };
            return en[type] ?? { label: type, color: "#6b7280", bg: "#f3f4f6" };
        }
        const ro: Record<string, { label: string; color: string; bg: string }> = {
            programare: { label: "Programare", color: "#3a7bd5", bg: "#dbeafe" },
            rezultat:   { label: "Rezultat",   color: "#0d9488", bg: "#ccfbf1" },
            reamintire: { label: "Reamintire", color: "#d97706", bg: "#fef3c7" },
            sistem:     { label: "Sistem",     color: "#6b7280", bg: "#f3f4f6" },
        };
        return ro[type] ?? { label: type, color: "#6b7280", bg: "#f3f4f6" };
    };

    const tabs = [
        { key: "all",    label: t.notifAll },
        { key: "unread", label: t.notifUnreadTab },
        { key: "read",   label: t.notifReadTab },
    ];

    return (
        <div className="notif-page">
            <div className="notif-header">
                <h1 className="notif-title">{t.notifTitle}</h1>
            </div>

            <div className="notif-summary-bar">
                <div className="summary-item">
                    <span className="summary-number">{notifications.length}</span>
                    <span className="summary-label">{t.notifTotal}</span>
                </div>
                <div className="summary-divider" />
                <div className="summary-item">
                    <span className="summary-number unread">{unreadCount}</span>
                    <span className="summary-label">{t.notifUnread}</span>
                </div>
                <div className="summary-divider" />
                <div className="summary-item">
                    <span className="summary-number">{notifications.length - unreadCount}</span>
                    <span className="summary-label">{t.notifRead}</span>
                </div>
                <div className="summary-spacer" />
                {unreadCount > 0 && (
                    <button className="btn-mark-all" onClick={markAllRead}>
                        {t.notifMarkAll}
                    </button>
                )}
            </div>

            <div className="filter-tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        className={`filter-tab ${filtru === tab.key ? "filter-tab--active" : ""}`}
                        onClick={() => setFiltru(tab.key)}
                    >
                        {tab.label}
                        {tab.key === "unread" && unreadCount > 0 && (
                            <span className="tab-count">{unreadCount}</span>
                        )}
                    </button>
                ))}
            </div>

            <div className="notif-list">
                {filtered.length === 0 && (
                    <div className="empty-state">
                        <div className="empty-icon">🔔</div>
                        <p className="empty-text">{t.notifEmpty}</p>
                    </div>
                )}
                {filtered.map((n) => {
                    const cfg = getTypeConfig(n.type);
                    return (
                        <div
                            key={n.id}
                            data-type={n.type}
                            className={`notif-card ${!n.read ? "notif-card--unread" : ""} ${selected?.id === n.id ? "notif-card--selected" : ""}`}
                            onClick={() => handleClick(n)}
                        >
                            <div className="notif-body">
                                <div className="notif-top">
                                    <span className="notif-name">{n.title}</span>
                                    {!n.read && <span className="new-pill">{t.notifNew}</span>}
                                </div>
                                <p className="notif-message">{n.message}</p>
                                <div className="notif-footer">
                                    <span className="notif-badge" style={{ background: cfg.bg, color: cfg.color }}>
                                        {cfg.label}
                                    </span>
                                    <span className="notif-time">{n.time}</span>
                                </div>
                            </div>
                            <button
                                className="btn-delete"
                                onClick={(e) => { e.stopPropagation(); deleteNotif(n.id); }}
                                title={t.notifDelete}
                            >
                                ✕
                            </button>
                        </div>
                    );
                })}
            </div>

            {selected && (
                <div className="modal-overlay" onClick={() => setSelected(null)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header" style={{ borderLeft: `5px solid ${getTypeConfig(selected.type).color}` }}>
                            <div>
                                <span className="modal-badge" style={{ background: getTypeConfig(selected.type).bg, color: getTypeConfig(selected.type).color }}>
                                    {getTypeConfig(selected.type).label}
                                </span>
                                <h2 className="modal-title">{selected.title}</h2>
                                <span className="modal-time">{selected.time}</span>
                            </div>
                            <button className="modal-close" onClick={() => setSelected(null)}>✕</button>
                        </div>
                        <div className="modal-body">
                            <p className="modal-message">{selected.message}</p>
                        </div>
                        <div className="modal-footer">
                            <button className="modal-btn-delete" onClick={() => deleteNotif(selected.id)}>
                                {t.notifDelete}
                            </button>
                            <button className="modal-btn-close" onClick={() => setSelected(null)}>
                                {t.notifClose}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}