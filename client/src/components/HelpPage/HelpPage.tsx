import { useState } from "react";
import "./HelpPage.css";
import { useLanguage } from "../../context/LanguageContext";

type FaqItem = {
    id: number;
    category: string;
    question: string;
    answer: string;
};

type Guide = {
    id: number;
    titleKey: string;
    color: string;
    bg: string;
    stepsKeys: { step: number; titleKey: string; descKey: string }[];
};

const guideIds: Guide[] = [
    {
        id: 1,
        titleKey: "guide1",
        color: "#3a7bd5",
        bg: "#dbeafe",
        stepsKeys: [
            { step: 1, titleKey: "g1s1t", descKey: "g1s1d" },
            { step: 2, titleKey: "g1s2t", descKey: "g1s2d" },
            { step: 3, titleKey: "g1s3t", descKey: "g1s3d" },
            { step: 4, titleKey: "g1s4t", descKey: "g1s4d" },
            { step: 5, titleKey: "g1s5t", descKey: "g1s5d" },
        ],
    },
    {
        id: 2,
        titleKey: "guide2",
        color: "#7c3aed",
        bg: "#ede9fe",
        stepsKeys: [
            { step: 1, titleKey: "g2s1t", descKey: "g2s1d" },
            { step: 2, titleKey: "g2s2t", descKey: "g2s2d" },
            { step: 3, titleKey: "g2s3t", descKey: "g2s3d" },
            { step: 4, titleKey: "g2s4t", descKey: "g2s4d" },
            { step: 5, titleKey: "g2s5t", descKey: "g2s5d" },
        ],
    },
    {
        id: 3,
        titleKey: "guide3",
        color: "#0d9488",
        bg: "#ccfbf1",
        stepsKeys: [
            { step: 1, titleKey: "g3s1t", descKey: "g3s1d" },
            { step: 2, titleKey: "g3s2t", descKey: "g3s2d" },
            { step: 3, titleKey: "g3s3t", descKey: "g3s3d" },
            { step: 4, titleKey: "g3s4t", descKey: "g3s4d" },
        ],
    },
];

// Static multilingual content (no key lookup overhead)
type LangContent = {
    guide1: string;
    guide2: string;
    guide3: string;
    g1s1t: string; g1s1d: string;
    g1s2t: string; g1s2d: string;
    g1s3t: string; g1s3d: string;
    g1s4t: string; g1s4d: string;
    g1s5t: string; g1s5d: string;
    g2s1t: string; g2s1d: string;
    g2s2t: string; g2s2d: string;
    g2s3t: string; g2s3d: string;
    g2s4t: string; g2s4d: string;
    g2s5t: string; g2s5d: string;
    g3s1t: string; g3s1d: string;
    g3s2t: string; g3s2d: string;
    g3s3t: string; g3s3d: string;
    g3s4t: string; g3s4d: string;
    cats: { Programari: string; Medici: string; Pacienti: string; Notificari: string; Cont: string; };
    faqs: FaqItem[];
};

const content: Record<string, LangContent> = {
    ro: {
        guide1: "Cum fac o programare",
        guide2: "Cum adaug un pacient",
        guide3: "Cum adaug un medic",
        g1s1t: "Deschide Programari", g1s1d: "Apasa pe Programari in meniul din stanga.",
        g1s2t: "Apasa Add Appointment", g1s2d: "Butonul se afla in coltul din dreapta sus.",
        g1s3t: "Completeaza formularul", g1s3d: "Introdu numele pacientului, telefonul si emailul.",
        g1s4t: "Selecteaza medicul si ora", g1s4d: "Alege medicul dorit, data si intervalul orar.",
        g1s5t: "Confirma", g1s5d: "Apasa Confirma programarea. Pacientul va fi notificat.",
        g2s1t: "Deschide Pacienti", g2s1d: "Apasa pe Pacienti in meniul din stanga.",
        g2s2t: "Apasa Add Patient", g2s2d: "Butonul se afla in coltul din dreapta sus.",
        g2s3t: "Completeaza datele", g2s3d: "Introdu numele, varsta, telefonul si emailul pacientului.",
        g2s4t: "Seteaza statusul", g2s4d: "Alege Activ sau Inactiv din dropdown.",
        g2s5t: "Salveaza", g2s5d: "Apasa Salveaza. Pacientul apare imediat in lista.",
        g3s1t: "Deschide Medici", g3s1d: "Apasa pe Medici in meniul din stanga.",
        g3s2t: "Apasa Add Doctor", g3s2d: "Butonul se afla in coltul din dreapta sus.",
        g3s3t: "Completeaza profilul", g3s3d: "Introdu numele, specializarea, telefonul si emailul.",
        g3s4t: "Salveaza", g3s4d: "Apasa Salveaza. Medicul va fi disponibil la programari.",
        cats: { Programari: "Programari", Medici: "Medici", Pacienti: "Pacienti", Notificari: "Notificari", Cont: "Cont" },
        faqs: [
            { id: 1, category: "Programari", question: "Cum fac o programare?", answer: "Mergeti la sectiunea Programari, apasati Add Appointment, completati formularul, selectati medicul si ora." },
            { id: 2, category: "Programari", question: "Cum anulez o programare?", answer: "In sectiunea Programari, gasiti programarea si apasati Anuleaza. Programarea va fi marcata ca Anulata." },
            { id: 3, category: "Programari", question: "Pot modifica ora programarii?", answer: "Da. Deschideti programarea, apasati Editeaza si selectati noua data sau ora." },
            { id: 4, category: "Medici", question: "Cum contactez un medic?", answer: "Accesati Medici, selectati medicul si apasati Vizualizeaza profil pentru datele de contact." },
            { id: 5, category: "Medici", question: "Cum adaug un medic nou?", answer: "Din sectiunea Medici, apasati Add Doctor, completati datele si salvati." },
            { id: 6, category: "Pacienti", question: "Cum adaug un pacient nou?", answer: "Navigati la Pacienti, apasati Add Patient si completati datele pacientului." },
            { id: 7, category: "Pacienti", question: "Cum caut un pacient?", answer: "In sectiunea Pacienti exista o bara de cautare. Puteti cauta dupa nume sau email." },
            { id: 8, category: "Notificari", question: "Ce tipuri de notificari exista?", answer: "Sistemul trimite 4 tipuri: Programare, Rezultat, Reamintire si Sistem." },
            { id: 9, category: "Notificari", question: "Cum marchez toate notificarile ca citite?", answer: "In pagina Notificari apasati Marcheaza toate ca citite." },
            { id: 10, category: "Cont", question: "Cum imi schimb parola?", answer: "Accesati Setari, tab Securitate, introduceti parola actuala si noua parola." },
            { id: 11, category: "Cont", question: "Ce fac daca am uitat parola?", answer: "Pe pagina de autentificare apasati Am uitat parola si introduceti emailul." },
        ],
    },
    ru: {
        guide1: "Как создать запись",
        guide2: "Как добавить пациента",
        guide3: "Как добавить врача",
        g1s1t: "Открыть Записи", g1s1d: "Нажмите на Записи в боковом меню.",
        g1s2t: "Нажать Add Appointment", g1s2d: "Кнопка находится в правом верхнем углу.",
        g1s3t: "Заполнить форму", g1s3d: "Введите имя пациента, телефон и email.",
        g1s4t: "Выбрать врача и время", g1s4d: "Выберите нужного врача, дату и время.",
        g1s5t: "Подтвердить", g1s5d: "Нажмите Подтвердить запись. Пациент получит уведомление.",
        g2s1t: "Открыть Пациенты", g2s1d: "Нажмите на Пациенты в боковом меню.",
        g2s2t: "Нажать Add Patient", g2s2d: "Кнопка находится в правом верхнем углу.",
        g2s3t: "Заполнить данные", g2s3d: "Введите имя, возраст, телефон и email пациента.",
        g2s4t: "Установить статус", g2s4d: "Выберите Активный или Неактивный из списка.",
        g2s5t: "Сохранить", g2s5d: "Нажмите Сохранить. Пациент появится в списке.",
        g3s1t: "Открыть Врачи", g3s1d: "Нажмите на Врачи в боковом меню.",
        g3s2t: "Нажать Add Doctor", g3s2d: "Кнопка находится в правом верхнем углу.",
        g3s3t: "Заполнить профиль", g3s3d: "Введите имя, специализацию, телефон и email.",
        g3s4t: "Сохранить", g3s4d: "Нажмите Сохранить. Врач будет доступен для записей.",
        cats: { Programari: "Записи", Medici: "Врачи", Pacienti: "Пациенты", Notificari: "Уведомления", Cont: "Аккаунт" },
        faqs: [
            { id: 1, category: "Programari", question: "Как создать запись?", answer: "Перейдите в Записи, нажмите Add Appointment, заполните форму, выберите врача и время." },
            { id: 2, category: "Programari", question: "Как отменить запись?", answer: "В разделе Записи найдите запись и нажмите Отменить. Запись будет помечена как Отменённая." },
            { id: 3, category: "Programari", question: "Можно изменить время записи?", answer: "Да. Откройте запись, нажмите Редактировать и выберите новую дату или время." },
            { id: 4, category: "Medici", question: "Как связаться с врачом?", answer: "Перейдите в Врачи, выберите нужного и нажмите Просмотреть профиль для контактных данных." },
            { id: 5, category: "Medici", question: "Как добавить нового врача?", answer: "В разделе Врачи нажмите Add Doctor, заполните данные и сохраните." },
            { id: 6, category: "Pacienti", question: "Как добавить нового пациента?", answer: "Перейдите в Пациенты, нажмите Add Patient и заполните данные пациента." },
            { id: 7, category: "Pacienti", question: "Как найти пациента?", answer: "В разделе Пациенты есть строка поиска. Можно искать по имени или email." },
            { id: 8, category: "Notificari", question: "Какие типы уведомлений существуют?", answer: "Система отправляет 4 типа: Запись, Результат, Напоминание и Система." },
            { id: 9, category: "Notificari", question: "Как отметить все уведомления прочитанными?", answer: "На странице Уведомления нажмите Отметить все как прочитанные." },
            { id: 10, category: "Cont", question: "Как изменить пароль?", answer: "Перейдите в Настройки, вкладка Безопасность, введите текущий и новый пароль." },
            { id: 11, category: "Cont", question: "Что делать если забыл пароль?", answer: "На странице входа нажмите Забыл пароль и введите свой email." },
        ],
    },
    en: {
        guide1: "How to make an appointment",
        guide2: "How to add a patient",
        guide3: "How to add a doctor",
        g1s1t: "Open Appointments", g1s1d: "Click on Appointments in the left menu.",
        g1s2t: "Click Add Appointment", g1s2d: "The button is in the top right corner.",
        g1s3t: "Fill the form", g1s3d: "Enter the patient name, phone and email.",
        g1s4t: "Select doctor and time", g1s4d: "Choose the desired doctor, date and time slot.",
        g1s5t: "Confirm", g1s5d: "Click Confirm appointment. The patient will be notified.",
        g2s1t: "Open Patients", g2s1d: "Click on Patients in the left menu.",
        g2s2t: "Click Add Patient", g2s2d: "The button is in the top right corner.",
        g2s3t: "Fill the data", g2s3d: "Enter the patient's name, age, phone and email.",
        g2s4t: "Set status", g2s4d: "Choose Active or Inactive from the dropdown.",
        g2s5t: "Save", g2s5d: "Click Save. The patient appears in the list immediately.",
        g3s1t: "Open Doctors", g3s1d: "Click on Doctors in the left menu.",
        g3s2t: "Click Add Doctor", g3s2d: "The button is in the top right corner.",
        g3s3t: "Fill the profile", g3s3d: "Enter the name, specialization, phone and email.",
        g3s4t: "Save", g3s4d: "Click Save. The doctor will be available for appointments.",
        cats: { Programari: "Appointments", Medici: "Doctors", Pacienti: "Patients", Notificari: "Notifications", Cont: "Account" },
        faqs: [
            { id: 1, category: "Programari", question: "How do I make an appointment?", answer: "Go to Appointments, click Add Appointment, fill the form, select the doctor and time." },
            { id: 2, category: "Programari", question: "How do I cancel an appointment?", answer: "In Appointments, find the appointment and click Cancel. It will be marked as Cancelled." },
            { id: 3, category: "Programari", question: "Can I change appointment time?", answer: "Yes. Open the appointment, click Edit and select a new date or time." },
            { id: 4, category: "Medici", question: "How do I contact a doctor?", answer: "Go to Doctors, select the doctor and click View profile for contact details." },
            { id: 5, category: "Medici", question: "How do I add a new doctor?", answer: "In Doctors section click Add Doctor, fill in the data and save." },
            { id: 6, category: "Pacienti", question: "How do I add a new patient?", answer: "Go to Patients, click Add Patient and fill in the patient data." },
            { id: 7, category: "Pacienti", question: "How do I search for a patient?", answer: "In Patients section there is a search bar. You can search by name or email." },
            { id: 8, category: "Notificari", question: "What types of notifications exist?", answer: "The system sends 4 types: Appointment, Result, Reminder and System." },
            { id: 9, category: "Notificari", question: "How do I mark all notifications as read?", answer: "On the Notifications page click Mark all as read." },
            { id: 10, category: "Cont", question: "How do I change my password?", answer: "Go to Settings, Security tab, enter current and new password." },
            { id: 11, category: "Cont", question: "What if I forgot my password?", answer: "On the login page click Forgot password and enter your email." },
        ],
    },
};

const categoryConfig: Record<string, { color: string; bg: string }> = {
    "Programari": { color: "#3a7bd5", bg: "#dbeafe" },
    "Medici":     { color: "#0d9488", bg: "#ccfbf1" },
    "Pacienti":   { color: "#7c3aed", bg: "#ede9fe" },
    "Notificari": { color: "#d97706", bg: "#fef3c7" },
    "Cont":       { color: "#6b7280", bg: "#f3f4f6" },
};

export default function HelpPage() {
    const { t, language } = useLanguage();
    const lc = content[language] ?? content["ro"];
    const [activeCategory, setActiveCategory] = useState("Toate");
    const [openId, setOpenId] = useState<number | null>(null);
    const [search, setSearch] = useState("");
    const [activeGuide, setActiveGuide] = useState<number>(1);

    const cats = lc.cats;
    const allLabel = language === "ru" ? "Все" : language === "en" ? "All" : "Toate";

    const filtered = lc.faqs.filter((f) => {
        const matchCat = activeCategory === allLabel || f.category === activeCategory;
        const matchSearch =
            f.question.toLowerCase().includes(search.toLowerCase()) ||
            f.answer.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
    });

    const toggle = (id: number) => setOpenId((prev) => (prev === id ? null : id));
    const selectedGuide = guideIds.find((g) => g.id === activeGuide)!;

    const getStepText = (key: string) => (lc as unknown as Record<string, string>)[key] ?? key;

    return (
        <div className="help-page">
            <div className="help-header">
                <h1 className="help-title">{t.helpTitle}</h1>
                <p className="help-subtitle">{t.helpSubtitle}</p>
            </div>

            <div className="guide-section">
                <h2 className="section-title">{t.helpGuideTitle}</h2>
                <p className="section-subtitle">{t.helpGuideSub}</p>

                <div className="guide-tabs">
                    {guideIds.map((g) => (
                        <button
                            key={g.id}
                            className={`guide-tab ${activeGuide === g.id ? "guide-tab--active" : ""}`}
                            style={activeGuide === g.id ? { background: g.color, borderColor: g.color } : {}}
                            onClick={() => setActiveGuide(g.id)}
                        >
                            {getStepText(g.titleKey)}
                        </button>
                    ))}
                </div>

                <div className="guide-steps">
                    {selectedGuide.stepsKeys.map((s, index) => (
                        <div key={s.step} className="guide-step">
                            <div className="step-left">
                                <div className="step-number" style={{ background: selectedGuide.bg, color: selectedGuide.color }}>
                                    {s.step}
                                </div>
                                {index < selectedGuide.stepsKeys.length - 1 && (
                                    <div className="step-line" style={{ background: selectedGuide.bg }} />
                                )}
                            </div>
                            <div className="step-content">
                                <span className="step-title">{getStepText(s.titleKey)}</span>
                                <p className="step-desc">{getStepText(s.descKey)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="help-search-wrap">
                <input
                    className="help-search"
                    type="text"
                    placeholder={t.helpSearchPlaceholder}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="help-stats">
                {(Object.entries(categoryConfig) as [string, { color: string; bg: string }][]).map(([cat, cfg]) => (
                    <div
                        key={cat}
                        className="stat-chip"
                        style={{ background: cfg.bg, color: cfg.color }}
                        onClick={() => { setActiveCategory(cat); setSearch(""); }}
                    >
                        <span className="stat-count">{lc.faqs.filter((f) => f.category === cat).length}</span>
                        <span className="stat-label">{cats[cat as keyof typeof cats]}</span>
                    </div>
                ))}
            </div>

            <div className="filter-tabs">
                {[allLabel, ...Object.keys(cats)].map((cat) => (
                    <button
                        key={cat}
                        className={`filter-tab ${activeCategory === cat ? "filter-tab--active" : ""}`}
                        onClick={() => setActiveCategory(cat)}
                    >
                        {cat === allLabel ? allLabel : cats[cat as keyof typeof cats] ?? cat}
                    </button>
                ))}
            </div>

            <div className="faq-list">
                {filtered.length === 0 && (
                    <div className="empty-state">
                        <p className="empty-text">{t.helpEmpty}</p>
                    </div>
                )}
                {filtered.map((f) => {
                    const cfg = categoryConfig[f.category];
                    const isOpen = openId === f.id;
                    return (
                        <div
                            key={f.id}
                            className={`faq-card ${isOpen ? "faq-card--open" : ""}`}
                            onClick={() => toggle(f.id)}
                        >
                            <div className="faq-top">
                                <div className="faq-left">
                                    <span className="faq-badge" style={{ background: cfg.bg, color: cfg.color }}>
                                        {cats[f.category as keyof typeof cats] ?? f.category}
                                    </span>
                                    <span className="faq-question">{f.question}</span>
                                </div>
                                <span className={`faq-arrow ${isOpen ? "faq-arrow--open" : ""}`}>›</span>
                            </div>
                            {isOpen && (
                                <div className="faq-answer">
                                    <p>{f.answer}</p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="help-contact">
                <p className="contact-text">{t.helpContactText}</p>
                <div className="contact-actions">
                    <a href="mailto:suport@cabinetmedical.md" className="contact-btn contact-btn--email">
                        suport@cabinetmedical.md
                    </a>
                    <a href="tel:+37369000000" className="contact-btn contact-btn--phone">
                        +373 69 000 000
                    </a>
                </div>
            </div>
        </div>
    );
}