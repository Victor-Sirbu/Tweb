import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export type Notification = {
    id: number;
    type: "programare" | "rezultat" | "reamintire" | "sistem";
    title: string;
    message: string;
    time: string;
    read: boolean;
};

interface NotificationContextType {
    notifications: Notification[];
    unreadCount: number;
    setNotifications: (notifications: Notification[]) => void;
    markAllRead: () => void;
    deleteNotification: (id: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

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

export function NotificationProvider({ children }: { children: ReactNode }) {
    const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

    const unreadCount = notifications.filter((n) => !n.read).length;

    const markAllRead = () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    };

    const deleteNotification = (id: number) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    return (
        <NotificationContext.Provider value={{
            notifications,
            unreadCount,
            setNotifications,
            markAllRead,
            deleteNotification
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
