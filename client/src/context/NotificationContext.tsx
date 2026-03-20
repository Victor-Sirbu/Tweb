import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Language } from "./LanguageContext";

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
    updateLanguage: (lang: Language) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const getNotificationsByLanguage = (lang: Language): Notification[] => {
    if (lang === "ru") {
        return [
            { id: 1, type: "programare", title: "Новая запись", message: "Мария Попеску записалась на приём на 28 февраля 2026, 10:00 к доктору Ион Ионеску (Кардиология).", time: "5 мин назад", read: false },
            { id: 2, type: "rezultat", title: "Результаты анализов доступны", message: "Результаты анализов крови для Иона Ионеску доступны. Пожалуйста, проверьте их.", time: "30 мин назад", read: false },
            { id: 3, type: "reamintire", title: "Напоминание о консультации завтра", message: "Завтра в 14:00 у вас консультация с Аной Василеску у доктора Ана Василеску (Педиатрия).", time: "1 час назад", read: false },
            { id: 4, type: "programare", title: "Запись отменена", message: "Виктор Гудима отменил запись на 27 февраля 2026, 09:30 к доктору Георгий Попеску (Общая медицина).", time: "2 часа назад", read: true },
            { id: 5, type: "sistem", title: "Обновление системы завершено", message: "Система успешно обновлена до версии 2.4.1. Все функции доступны.", time: "Вчера, 18:30", read: true },
            { id: 6, type: "rezultat", title: "Результаты ЭКГ готовы", message: "Результаты ЭКГ для Георгия Михая (52 года) готовы к просмотру. Проверьте карту пациента.", time: "Вчера, 15:10", read: true },
            { id: 7, type: "reamintire", title: "3 записи завтра", message: "Завтра у вас 3 записи: 09:00 Ион Ионеску, 11:00 Мария Попеску, 15:30 Георгий Михай.", time: "Вчера, 08:00", read: true },
            { id: 8, type: "programare", title: "Запись подтверждена", message: "Запись Георгия Михая на 26 февраля 2026 в 15:30 успешно подтверждена.", time: "26 фев, 10:00", read: true },
        ];
    }

    if (lang === "en") {
        return [
            { id: 1, type: "programare", title: "New Appointment", message: "Maria Popescu made an appointment for Feb 28, 2026, 10:00 AM with Dr. Ion Ionescu (Cardiology).", time: "5 min ago", read: false },
            { id: 2, type: "rezultat", title: "Test Results Available", message: "Blood test results for Ion Ionescu are available. Please review them.", time: "30 min ago", read: false },
            { id: 3, type: "reamintire", title: "Consultation Reminder Tomorrow", message: "Tomorrow at 2:00 PM you have a consultation with Ana Vasilescu at Dr. Ana Vasilescu (Pediatrics).", time: "1 hour ago", read: false },
            { id: 4, type: "programare", title: "Appointment Cancelled", message: "Victor Gudima cancelled the appointment from Feb 27, 2026, 09:30 AM with Dr. George Popescu (General Medicine).", time: "2 hours ago", read: true },
            { id: 5, type: "sistem", title: "System Update Completed", message: "System successfully updated to version 2.4.1. All features are available.", time: "Yesterday, 6:30 PM", read: true },
            { id: 6, type: "rezultat", title: "ECG Results Ready", message: "ECG results for George Mihai (52 years old) are ready for viewing. Check patient record.", time: "Yesterday, 3:10 PM", read: true },
            { id: 7, type: "reamintire", title: "3 Appointments Tomorrow", message: "Tomorrow you have 3 appointments: 09:00 Ion Ionescu, 11:00 Maria Popescu, 15:30 George Mihai.", time: "Yesterday, 8:00 AM", read: true },
            { id: 8, type: "programare", title: "Appointment Confirmed", message: "George Mihai's appointment for Feb 26, 2026 at 3:30 PM has been successfully confirmed.", time: "Feb 26, 10:00 AM", read: true },
        ];
    }

    // Romanian (default)
    return [
        { id: 1, type: "programare", title: "Programare nouă", message: "Maria Popescu a făcut o programare pentru 28 Feb 2026, ora 10:00 la Dr. Ion Ionescu (Cardiologie).", time: "Acum 5 min", read: false },
        { id: 2, type: "rezultat", title: "Rezultate analize disponibile", message: "Rezultatele analizelor de sânge pentru Ion Ionescu sunt disponibile. Vă rugăm să le verificați.", time: "Acum 30 min", read: false },
        { id: 3, type: "reamintire", title: "Reamintire consultație mâine", message: "Mâine la ora 14:00 aveți consultație cu Ana Vasilescu la Dr. Ana Vasilescu (Pediatrie).", time: "1 oră în urmă", read: false },
        { id: 4, type: "programare", title: "Programare anulată", message: "Victor Gudima a anulat programarea din 27 Feb 2026, ora 09:30 la Dr. George Popescu (Medicina Generală).", time: "2 ore în urmă", read: true },
        { id: 5, type: "sistem", title: "Actualizare sistem finalizată", message: "Sistemul a fost actualizat cu succes la versiunea 2.4.1. Toate funcționalitățile sunt disponibile.", time: "Ieri, 18:30", read: true },
        { id: 6, type: "rezultat", title: "Rezultate EKG gata", message: "Rezultatele EKG pentru George Mihai (52 ani) sunt gata de vizualizat. Consultați fișa pacientului.", time: "Ieri, 15:10", read: true },
        { id: 7, type: "reamintire", title: "3 programări mâine", message: "Mâine aveți 3 programări: 09:00 Ion Ionescu, 11:00 Maria Popescu, 15:30 George Mihai.", time: "Ieri, 08:00", read: true },
        { id: 8, type: "programare", title: "Programare confirmată", message: "Programarea lui George Mihai pentru 26 Feb 2026 la ora 15:30 a fost confirmată cu succes.", time: "26 Feb, 10:00", read: true },
    ];
};

export function NotificationProvider({ children }: { children: ReactNode }) {
    const [currentLang, setCurrentLang] = useState<Language>("ro");
    const [notifications, setNotifications] = useState<Notification[]>(getNotificationsByLanguage("ro"));

    const unreadCount = notifications.filter((n) => !n.read).length;

    const markAllRead = () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    };

    const deleteNotification = (id: number) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    const updateLanguage = (lang: Language) => {
        if (lang === currentLang) return;

        // Preserve read status when switching languages
        const readStatusMap = new Map(notifications.map(n => [n.id, n.read]));
        const newNotifications = getNotificationsByLanguage(lang).map(n => ({
            ...n,
            read: readStatusMap.get(n.id) ?? n.read
        }));

        setNotifications(newNotifications);
        setCurrentLang(lang);
    };

    return (
        <NotificationContext.Provider value={{
            notifications,
            unreadCount,
            setNotifications,
            markAllRead,
            deleteNotification,
            updateLanguage
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
