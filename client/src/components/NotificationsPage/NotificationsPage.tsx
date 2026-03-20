import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NotificationsPage.css";
import { useLanguage } from "../../context/LanguageContext";
import { useNotifications, type Notification } from "../../context/NotificationContext";

export default function NotificationsPage() {
    const { t, language } = useLanguage();
    const navigate = useNavigate();
    const { notifications, unreadCount, setNotifications, markAllRead, deleteNotification } = useNotifications();
    const [filtru, setFiltru] = useState("all");
    const [selected, setSelected] = useState<Notification | null>(null);

    const filtered = notifications.filter((n) => {
        if (filtru === "unread") return !n.read;
        if (filtru === "read") return n.read;
        return true;
    });

    const handleClick = (n: Notification) => {
        setSelected(n);
        setNotifications(notifications.map((item) => (item.id === n.id ? { ...item, read: true } : item)));
    };

    const deleteNotif = (id: number) => {
        deleteNotification(id);
        if (selected?.id === id) setSelected(null);
    };

    const getBackLabel = () => {
        if (language === "ru") return "Назад";
        if (language === "en") return "Back";
        return "Înapoi";
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
                <button className="back-btn" onClick={() => navigate(-1)}>
                    ← {getBackLabel()}
                </button>
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