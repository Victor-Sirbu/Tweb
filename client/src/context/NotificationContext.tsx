import { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { ReactNode } from "react";
import type { Language } from "./LanguageContext";
import { useApi } from "../api/context";
import { useAuth } from "./AuthContext";

export type Notification = {
    id: number;
    type: "programare" | "rezultat" | "reamintire" | "sistem";
    title: string;
    message: string;
    time: string;
    read: boolean;
};

interface NotificationAPI {
    id: number;
    userId: number;
    title: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}

interface NotificationContextType {
    notifications: Notification[];
    unreadCount: number;
    loading: boolean;
    setNotifications: (notifications: Notification[]) => void;
    markAllRead: () => void;
    markOneRead: (id: number) => void;
    deleteNotification: (id: number) => void;
    updateLanguage: (lang: Language) => void;
    fetchNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const formatTime = (createdAt: string, lang: Language): string => {
    const now = new Date();
    const date = new Date(createdAt);
    const diffMs = now.getTime() - date.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    const diffH = Math.floor(diffMin / 60);
    const diffD = Math.floor(diffH / 24);

    if (lang === "ru") {
        if (diffMin < 1) return "Только что";
        if (diffMin < 60) return `${diffMin} мин назад`;
        if (diffH < 24) return `${diffH} ч назад`;
        if (diffD === 1) return "Вчера";
        return date.toLocaleDateString("ru-RU");
    }
    if (lang === "en") {
        if (diffMin < 1) return "Just now";
        if (diffMin < 60) return `${diffMin} min ago`;
        if (diffH < 24) return `${diffH} h ago`;
        if (diffD === 1) return "Yesterday";
        return date.toLocaleDateString("en-GB");
    }
    if (diffMin < 1) return "Acum";
    if (diffMin < 60) return `Acum ${diffMin} min`;
    if (diffH < 24) return `${diffH} oră în urmă`;
    if (diffD === 1) return "Ieri";
    return date.toLocaleDateString("ro-RO");
};

const detectType = (title: string): Notification["type"] => {
    const t = title.toLowerCase();
    if (t.includes("programare") || t.includes("запись") || t.includes("appointment")) return "programare";
    if (t.includes("rezultat") || t.includes("анализ") || t.includes("result") || t.includes("ecg") || t.includes("экг")) return "rezultat";
    if (t.includes("reamintire") || t.includes("напоминание") || t.includes("reminder")) return "reamintire";
    return "sistem";
};

const mapNotification = (n: NotificationAPI, lang: Language): Notification => ({
    id: n.id,
    type: detectType(n.title),
    title: n.title,
    message: n.message,
    time: formatTime(n.createdAt, lang),
    read: n.isRead,
});

export function NotificationProvider({ children }: { children: ReactNode }) {
    const api = useApi();
    const { userId, isAdmin } = useAuth();
    const [currentLang, setCurrentLang] = useState<Language>("ro");
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(false);

    const unreadCount = notifications.filter((n) => !n.read).length;

    const fetchNotifications = useCallback(async () => {
        // Adminul nu are notificări personale
        if (!userId || isAdmin) return;
        setLoading(true);
        try {
            const data = await api.get<NotificationAPI[]>(`/api/notification/${userId}/by-user-id`);
            const mapped = data.map((n) => mapNotification(n, currentLang));
            mapped.sort((a, b) => {
                if (a.read !== b.read) return a.read ? 1 : -1;
                return 0;
            });
            setNotifications(mapped);
        } catch (err) {
            console.error("Eroare la încărcarea notificărilor:", err);
        } finally {
            setLoading(false);
        }
    }, [userId, isAdmin, currentLang, api]);

    // Fetch la mount + polling la 30 secunde
    useEffect(() => {
        void fetchNotifications();
        const interval = setInterval(() => void fetchNotifications(), 30000);
        return () => clearInterval(interval);
    }, [fetchNotifications]);

    const markOneRead = async (id: number) => {
        try {
            await api.put<void>(`/api/notification/${id}/read-status`, {});
            setNotifications((prev) =>
                prev.map((n) => (n.id === id ? { ...n, read: true } : n))
            );
        } catch (err) {
            console.error("Eroare la marcare citit:", err);
        }
    };

    const markAllRead = async () => {
        if (!userId) return;
        try {
            await api.put<void>(`/api/notification/${userId}/mark-all-read`, {});
            setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
        } catch (err) {
            console.error("Eroare la marcare toate citite:", err);
        }
    };

    const deleteNotification = async (id: number) => {
        try {
            await api.delete<void>(`/api/notification/${id}/delete`);
            setNotifications((prev) => prev.filter((n) => n.id !== id));
        } catch (err) {
            console.error("Eroare la ștergere notificare:", err);
        }
    };

    const updateLanguage = (lang: Language) => {
        if (lang === currentLang) return;
        setCurrentLang(lang);
    };

    return (
        <NotificationContext.Provider value={{
            notifications,
            unreadCount,
            loading,
            setNotifications,
            markAllRead,
            markOneRead,
            deleteNotification,
            updateLanguage,
            fetchNotifications,
        }}>
            {children}
        </NotificationContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useNotifications() {
    const context = useContext(NotificationContext);
    if (!context) throw new Error("useNotifications must be used within NotificationProvider");
    return context;
}
