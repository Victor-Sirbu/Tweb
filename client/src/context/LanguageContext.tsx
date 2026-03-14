import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export type Language = "ro" | "ru" | "en";

export interface Translations {
    // Navbar
    home: string;
    services: string;
    doctors: string;
    myProfile: string;
    reviews: string;
    contact: string;
    signIn: string;
    signOut: string;
    appointment: string;
    profile: string;

    // Login Page
    existingPatient: string;
    newPatient: string;
    loginTitle: string;
    registerTitle: string;
    emailLabel: string;
    password: string;
    resetPassword: string;
    loginBtn: string;
    registerBtn: string;
    loginWithCode: string;
    firstName: string;
    lastName: string;
    phone: string;
    birthDate: string;
    gender: string;
    selectGender: string;
    male: string;
    female: string;
    day: string;
    month: string;
    year: string;

    // HomePage — Hero
    heroBadge: string;
    heroTitle1: string;
    heroTitle2: string;
    heroDesc: string;
    heroBook: string;
    heroContact: string;
    statPatients: string;
    statDoctors: string;
    statYears: string;

    // HomePage — Schedule
    scheduleTitle: string;
    schedMonFri: string;
    schedSat: string;
    schedSun: string;
    closed: string;

    // HomePage — Features
    featuresLabel: string;
    featuresTitle: string;
    featuresSubtitle: string;
    feat1Title: string;
    feat1Desc: string;
    feat2Title: string;
    feat2Desc: string;
    feat3Title: string;
    feat3Desc: string;
    feat4Title: string;
    feat4Desc: string;

    // HomePage — Team
    teamBadge: string;
    teamTitle: string;
    teamSubtitle: string;
    bookConsultation: string;
    yearsExp: string;

    // HomePage — Doctor specialties / experience
    specInterna: string;
    specCardio: string;
    specPediatrie: string;
    specOrtoped: string;
    exp15: string;
    exp12: string;
    exp10: string;
    exp18: string;

    // HomePage — How it works
    howBadge: string;
    howTitle: string;
    howSubtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;

    // HomePage — Testimonials
    testiBadge: string;
    testiTitle: string;
    testiSubtitle: string;
    verifiedPatient: string;

    // Testimonial texts
    testi1: string;
    testi2: string;
    testi3: string;
    testi4: string;

    // HomePage — CTA
    ctaTitle: string;
    ctaDesc: string;
    ctaBook: string;
    ctaPrices: string;
    ctaSatisfaction: string;
    ctaOnline: string;

    // Footer
    footerDescription: string;
    footerQuickLinks: string;
    footerSchedule: string;
    footerContact: string;
    footerMedicalServices: string;
    footerOurTeam: string;
    footerTestimonials: string;
    footerMedicalBlog: string;
    footerAddress: string;
    footerAddressVal: string;
    footerPhone: string;
    footerEmail: string;
    footerProgram: string;
    footerProgramVal: string;

    // MedicalServices Page
    msHeroBadge: string;
    msHeroTitle1: string;
    msHeroTitle2: string;
    msHeroDesc: string;
    msBookNow: string;
    msContactUs: string;
    msSpecialties: string;
    msDoctors: string;
    msBooking: string;
    msAvailableSpec: string;
    msAllServices: string;
    msSearchPlaceholder: string;
    msFound1: string;
    msFoundMany: string;
    msNoResults: string;
    msNoResultsHint: string;
    msPrice: string;
    msDuration: string;
    msBookBtn: string;
    // Service categories
    msCatAll: string;
    msCatGeneral: string;
    msCatSpec: string;
    msCatLab: string;
    msCatImaging: string;

    // ContactPage
    contactTitle: string;
    contactSubtitle: string;
    contactInfoTitle: string;
    contactFormTitle: string;
    contactLocationTitle: string;
    contactFullName: string;
    contactSubject: string;
    contactMessage: string;
    contactSubmit: string;
    contactSuccessMsg: string;
    contactPhone: string;
    contactEmail: string;
    contactAddress: string;
    contactScheduleLabel: string;
    contactScheduleVal: string;
    contactScheduleSat: string;

    // ProfilePage
    profMyAccount: string;
    profWelcome: string;
    profSubtitle: string;
    profNextAppt: string;
    profTabAppts: string;
    profTabResults: string;
    profTabSettings: string;
    profPatient: string;
    profVerified: string;
    profPersonalData: string;
    profStats: string;
    profApptsLabel: string;
    profResultsLabel: string;
    profDoctorsLabel: string;
    profYearsLabel: string;
    profNameLabel: string;
    profEmailLabel: string;
    profPhoneLabel: string;
    profBornLabel: string;
    profCityLabel: string;
    profNewAppt: string;
    profDateLabel: string;
    profTimeLabel: string;
    profCancelBtn: string;
    profDownloadPdf: string;
    profSettingsTitle: string;
    profFullName: string;
    profEmail: string;
    profPhone: string;
    profBirthdate: string;
    profCity: string;
    profSave: string;
    profSaved: string;
    profSecurity: string;
    profCurrentPass: string;
    profNewPass: string;
    profConfirmPass: string;
    profChangePass: string;
    profNotifications: string;
    profCancelModal: string;
    profCancelConfirm: string;
    profCancelNo: string;
    profCancelYes: string;
    profHour: string;
    profCalLegend: string;

    // Navbar extra
    navHelp: string;
    navNews: string;

    // MedicalServices categories (multilingual aliases)
    msCatGeneralaAlias: string;
    msCatSpecAlias: string;
    msCatLabAlias: string;
    msCatImagAlias: string;

    // HelpPage
    helpTitle: string;
    helpSubtitle: string;
    helpGuideTitle: string;
    helpGuideSub: string;
    helpSearchPlaceholder: string;
    helpEmpty: string;
    helpContactText: string;

    // NotificationsPage
    notifTitle: string;
    notifTotal: string;
    notifUnread: string;
    notifRead: string;
    notifMarkAll: string;
    notifAll: string;
    notifUnreadTab: string;
    notifReadTab: string;
    notifEmpty: string;
    notifNew: string;
    notifDelete: string;
    notifClose: string;

    // NewsPage
    newsTitle: string;
    newsSubtitle: string;
    newsViewDetails: string;
    newsNoItems: string;
    newsAll: string;
    newsClose: string;

    // AppointmentsPage
    apptTitle: string;
    apptFormTitle: string;
    apptPatientName: string;
    apptPhone: string;
    apptEmail: string;
    apptSelectDoctor: string;
    apptSpecialization: string;
    apptDate: string;
    apptTime: string;
    apptReason: string;
    apptSubmit: string;
    apptSuccess: string;
    apptMyList: string;
    apptCancel: string;
    apptCancelConfirm: string;
    apptConfirmed: string;
    apptPending: string;
    apptCanceled: string;
    apptSpecCardio: string;
    apptSpecPediatrie: string;
    apptSpecMedGen: string;
    apptSpecDerma: string;
    apptSpecNeuro: string;
    apptSpecOrtoped: string;
    apptSpecOrl: string;
    apptSpecOftalmologie: string;

    // AdminDashboard
    adminStats: string;
    adminAppts: string;
    adminPatients: string;
    adminDoctors: string;
    adminSettings: string;
    adminTotalPatients: string;
    adminActivePatients: string;
    adminTodayAppts: string;
    adminActiveDoctors: string;
    adminAddPatient: string;
    adminSearch: string;
    adminAllPatients: string;
    adminName: string;
    adminAge: string;
    adminPhone: string;
    adminEmail: string;
    adminLastVisit: string;
    adminStatus: string;
    adminActions: string;
    adminActive: string;
    adminInactive: string;
    adminSettingsTitle: string;
    adminChangePass: string;
    adminNotifEmail: string;
    adminLanguage: string;
    adminTheme: string;
    adminSave: string;

    // AdminNavbar
    adminNavDashboard: string;
    adminNavAudit: string;
    adminNavExitAdmin: string;
    adminNavPanel: string;

    // AdminDashboard extra buttons/labels
    adminView: string;
    adminEdit: string;
    adminDelete: string;
    adminCancel: string;
    adminUpdate: string;
    adminAdd: string;
    adminEditPatient: string;
    adminApptDate: string;
    adminApptTime: string;
    adminApptConfirmed: string;
    adminApptPending: string;
    adminSpecCardio: string;
    adminSpecPediatrie: string;
    adminSpecMedGen: string;
    adminSpecOrtoped: string;

    // ActivityLog target types
    auditTargetPatient: string;
    auditTargetAppointment: string;
    auditTargetRecord: string;
    auditTargetSystem: string;
    auditTargetUser: string;
}

const translations: Record<Language, Translations> = {
    ro: {
        home: "Acasă",
        services: "Servicii",
        doctors: "Medici",
        myProfile: "Profilul Meu",
        reviews: "Recenzii",
        contact: "Contact",
        signIn: "Intrare",
        signOut: "Ieșire",
        appointment: "Programare",
        profile: "Profil",

        existingPatient: "Pacient existent",
        newPatient: "Pacient nou",
        loginTitle: "Autentificare pentru a începe sesiunea",
        registerTitle: "Înregistrare pacient nou",
        emailLabel: "Email",
        password: "Parolă",
        resetPassword: "Resetează parola",
        loginBtn: "Autentificare",
        registerBtn: "Înregistrează-te",
        loginWithCode: "Autentificare cu cod",
        firstName: "Prenume",
        lastName: "Nume",
        phone: "Număr de telefon",
        birthDate: "Data nașterii",
        gender: "Gen",
        selectGender: "Selectează genul",
        male: "Bărbat",
        female: "Femeie",
        day: "Zi",
        month: "Lună",
        year: "An",

        heroBadge: "Cabinet Medical Acreditat",
        heroTitle1: "Sănătatea Ta Este",
        heroTitle2: "Prioritatea Noastră",
        heroDesc: "Cabinet medical modern cu echipamente de ultimă generație și o echipă de medici specialiști cu experiență vastă. Oferim servicii medicale complete, de la consultații de specialitate până la analize de laborator complexe.",
        heroBook: "Programează Consultație",
        heroContact: "Contactează-ne",
        statPatients: "Pacienți Tratați",
        statDoctors: "Medici Specialiști",
        statYears: "Ani Experiență",

        scheduleTitle: "Program",
        schedMonFri: "Luni - Vineri",
        schedSat: "Sâmbătă",
        schedSun: "Duminică",
        closed: "Închis",

        featuresLabel: "Avantajele Noastre",
        featuresTitle: "Ce Oferă Cabinetul Nostru Medical",
        featuresSubtitle: "Servicii de calitate, accesibile și rapide — pentru sănătatea ta și a familiei tale",
        feat1Title: "Program Flexibil",
        feat1Desc: "Luni-Vineri 08:00-20:00",
        feat2Title: "Prețuri Accesibile",
        feat2Desc: "Convenții cu case de asigurări",
        feat3Title: "Rezultate Rapide",
        feat3Desc: "Analize în aceeași zi",
        feat4Title: "Programare Online",
        feat4Desc: "24/7 disponibil",

        teamBadge: "Echipa Noastră",
        teamTitle: "Medici Specialiști Experimentați",
        teamSubtitle: "Echipa noastră este formată din medici cu pregătire superioară și experiență vastă, dedicați să vă ofere cele mai bune servicii medicale",
        bookConsultation: "Programează Consultație",
        yearsExp: "ani experiență",

        specInterna: "Medicină Internă",
        specCardio: "Cardiologie",
        specPediatrie: "Pediatrie",
        specOrtoped: "Ortopedie",
        exp15: "15 ani experiență",
        exp12: "12 ani experiență",
        exp10: "10 ani experiență",
        exp18: "18 ani experiență",

        howBadge: "Procesul Nostru",
        howTitle: "Cum Funcționează Programarea",
        howSubtitle: "Simplu, rapid și sigur - programează-te online în doar 3 pași",
        step1Title: "Creează Cont",
        step1Desc: "Înregistrare rapidă cu email sau telefon. Date personale în siguranță.",
        step2Title: "Alege Medicul",
        step2Desc: "Selectează specialitatea și medicul dorit. Vezi disponibilitatea în timp real.",
        step3Title: "Confirmă",
        step3Desc: "Confirmare instantanee prin SMS și email. Reminder 24h înainte.",

        testiBadge: "Recenzii Pacienți",
        testiTitle: "Ce Spun Pacienții Noștri",
        testiSubtitle: "Feedback real de la pacienți care au beneficiat de serviciile noastre medicale",
        verifiedPatient: "Pacient Verificat",

        testi1: "Cel mai profesionist cabinet medical din oraș. Dr. Tatiana mi-a salvat viața diagnosticând la timp o afecțiune serioasă. Personalul este extrem de amabil și empatic.",
        testi2: "Am făcut analize medicale complete aici. Rezultatele au venit foarte rapid, totul a fost foarte bine organizat. Recomand cu încredere!",
        testi3: "Copiii mei sunt îngrijiți aici de Dr. Natalia. Este o doctoriță extraordinară, foarte răbdătoare și competentă. Ne simțim în siguranță!",
        testi4: "Programările online sunt foarte convenabile. Nu mai stai la cozi! Serviciile medicale sunt de top, medicii sunt foarte pregătiți.",

        ctaTitle: "Pregătit să Îți Îmbunătățești Sănătatea?",
        ctaDesc: "Nu amâna! Programează-te astăzi pentru o consultație cu unul din medicii noștri specialiști. Echipa noastră este gata să te ajute.",
        ctaBook: "Programează Acum",
        ctaPrices: "Vezi Prețuri",
        ctaSatisfaction: "Satisfacție Pacienți",
        ctaOnline: "Programare Online",

        // Footer
        footerDescription: "Cabinet medical modern cu servicii complete de diagnostic și tratament. Echipă de medici specialiști dedicați sănătății tale.",
        footerQuickLinks: "Link-uri Rapide",
        footerSchedule: "Program",
        footerContact: "Contact",
        footerMedicalServices: "Servicii Medicale",
        footerOurTeam: "Echipa Noastră",
        footerTestimonials: "Testimoniale",
        footerMedicalBlog: "Blog Medical",
        footerAddress: "Adresă:",
        footerAddressVal: "Bd. Ștefan cel Mare nr. 123, Chișinău, Moldova",
        footerPhone: "Telefon:",
        footerEmail: "Email:",
        footerProgram: "Program:",
        footerProgramVal: "Luni-Vineri: 08:00-20:00",

        // MedicalServices Page
        msHeroBadge: "Servicii Medicale",
        msHeroTitle1: "Servicii Medicale",
        msHeroTitle2: "de Înaltă Calitate",
        msHeroDesc: "Oferim o gamă completă de servicii medicale cu echipamente de ultimă generație și o echipă de specialiști dedicată sănătății tale.",
        msBookNow: "Programează Acum",
        msContactUs: "Contactează-ne",
        msSpecialties: "Specialități",
        msDoctors: "Medici",
        msBooking: "Programare",
        msAvailableSpec: "Specialități Disponibile",
        msAllServices: "Toate Serviciile Noastre",
        msSearchPlaceholder: "Caută un serviciu medical...",
        msFound1: "serviciu găsit",
        msFoundMany: "servicii găsite",
        msNoResults: "Niciun serviciu găsit",
        msNoResultsHint: "Încearcă o altă căutare sau selectează o altă categorie.",
        msPrice: "Preț",
        msDuration: "Durată",
        msBookBtn: "Programează →",
        msCatAll: "Toate",
        msCatGeneral: "Generala",
        msCatSpec: "Specialitate",
        msCatLab: "Laborator",
        msCatImaging: "Imagistica",

        // ContactPage
        contactTitle: "Contact & Suport",
        contactSubtitle: "Suntem aici pentru a vă ajuta. Contactați-ne pentru programări, întrebări sau feedback.",
        contactInfoTitle: "Informații de Contact",
        contactFormTitle: "Trimite-ne un Mesaj",
        contactLocationTitle: "Locația Noastră",
        contactFullName: "Nume Complet",
        contactSubject: "Subiect",
        contactMessage: "Mesaj",
        contactSubmit: "Trimite Mesajul",
        contactSuccessMsg: "Mesajul a fost trimis cu succes! Vă vom contacta în curând.",
        contactPhone: "Telefon",
        contactEmail: "Email",
        contactAddress: "Adresă",
        contactScheduleLabel: "Program de Lucru",
        contactScheduleVal: "Luni - Vineri: 08:00 - 20:00",
        contactScheduleSat: "Sâmbătă: 09:00 - 14:00",

        // ProfilePage
        profMyAccount: "Contul Meu",
        profWelcome: "Bine ai revenit",
        profSubtitle: "Gestionează programările, analizele și datele tale. Vizualizează istoricul consultațiilor și actualizează datele personale în timp real.",
        profNextAppt: "Următoarea programare",
        profTabAppts: "Programările Mele",
        profTabResults: "Analize & Rezultate",
        profTabSettings: "Setări Cont",
        profPatient: "Pacient",
        profVerified: "✓ Cont Verificat",
        profPersonalData: "Date Personale",
        profStats: "Statistici",
        profApptsLabel: "Programări",
        profResultsLabel: "Analize",
        profDoctorsLabel: "Doctori",
        profYearsLabel: "Ani Pacient",
        profNameLabel: "Nume:",
        profEmailLabel: "Email:",
        profPhoneLabel: "Telefon:",
        profBornLabel: "Născut:",
        profCityLabel: "Oraș:",
        profNewAppt: "+ Programare Nouă",
        profDateLabel: "Data:",
        profTimeLabel: "Ora:",
        profCancelBtn: "Anulează",
        profDownloadPdf: "Descarcă PDF",
        profSettingsTitle: "Setări Cont",
        profFullName: "Nume complet",
        profEmail: "Email",
        profPhone: "Telefon",
        profBirthdate: "Data nașterii",
        profCity: "Oraș",
        profSave: "Salvează Modificările",
        profSaved: "✓ Date salvate cu succes!",
        profSecurity: "Securitate",
        profCurrentPass: "Parolă curentă",
        profNewPass: "Parolă nouă",
        profConfirmPass: "Confirmă parola nouă",
        profChangePass: "Schimbă Parola",
        profNotifications: "Notificări",
        profCancelModal: "Confirmă Anularea",
        profCancelConfirm: "Ești sigur că vrei să anulezi această programare? Acțiunea nu poate fi anulată.",
        profCancelNo: "Nu, Păstrează",
        profCancelYes: "Da, Anulează",
        profHour: "Ora",
        profCalLegend: "Programare",

        // Navbar extra
        navHelp: "Ajutor",
        navNews: "Noutăți",

        msCatGeneralaAlias: "generală",
        msCatSpecAlias: "specialitate",
        msCatLabAlias: "laborator",
        msCatImagAlias: "imagistică",

        helpTitle: "Ajutor & FAQ",
        helpSubtitle: "Găsiți rapid răspunsuri la întrebările frecvente",
        helpGuideTitle: "Ghid rapid",
        helpGuideSub: "Urmați pașii de mai jos pentru acțiunile principale",
        helpSearchPlaceholder: "Caută o întrebare...",
        helpEmpty: "Nu am găsit nicio întrebare pentru căutarea ta.",
        helpContactText: "Nu ați găsit răspunsul? Contactați echipa de suport:",

        notifTitle: "Notificări",
        notifTotal: "Total",
        notifUnread: "Necitite",
        notifRead: "Citite",
        notifMarkAll: "✓ Marchează toate ca citite",
        notifAll: "Toate",
        notifUnreadTab: "Necitite",
        notifReadTab: "Citite",
        notifEmpty: "Nu există notificări în această categorie.",
        notifNew: "Nou",
        notifDelete: "Şterge notificarea",
        notifClose: "Închide",

        newsTitle: "Noutăți și Actualizări",
        newsSubtitle: "Află cele mai recente modificări și anunțuri ale clinicii noastre.",
        newsViewDetails: "Vezi detalii",
        newsNoItems: "Nu există noutăți în această categorie momentan.",
        newsAll: "Toate",

        apptTitle: "Programare Online",
        apptFormTitle: "Completați formularul de programare",
        apptPatientName: "Nume pacient *",
        apptPhone: "Telefon *",
        apptEmail: "Email *",
        apptSelectDoctor: "Selectează medicul *",
        apptSpecialization: "Specializare *",
        apptDate: "Data programării *",
        apptTime: "Ora disponibilă *",
        apptReason: "Motivul programării *",
        apptSubmit: "Programează-te",
        apptSuccess: "✅ Programare creată cu succes! Veți primi o confirmare pe email.",
        apptMyList: "Programările mele",
        apptCancel: "Anulează programarea",
        apptCancelConfirm: "Sigur doriți să anulați această programare?",

        adminStats: "Statistici",
        adminAppts: "Programări",
        adminPatients: "Pacienți",
        adminDoctors: "Medici",
        adminSettings: "Setări",
        adminTotalPatients: "Total Pacienți",
        adminActivePatients: "Pacienți Activi",
        adminTodayAppts: "Programări Astăzi",
        adminActiveDoctors: "Medici Activi",
        adminAddPatient: "Adaugă Pacient",
        adminSearch: "Caută pacient...",
        adminAllPatients: "Toți pacienții",
        adminName: "Pacient",
        adminAge: "Vârstă",
        adminPhone: "Telefon",
        adminEmail: "Email",
        adminLastVisit: "Ultima Vizită",
        adminStatus: "Status",
        adminActions: "Acțiuni",
        adminActive: "Activ",
        adminInactive: "Inactiv",
        adminSettingsTitle: "Setări cont",
        adminChangePass: "Schimbare parolă",
        adminNotifEmail: "Email notificări",
        adminLanguage: "Limbă",
        adminTheme: "Temă",
        adminSave: "Salvează Modificări",

        adminNavDashboard: "Dashboard",
        adminNavAudit: "Audit & Activitate",
        adminNavExitAdmin: "Ieși din Admin",
        adminNavPanel: "Panou Administrator",

        adminView: "Vizualizează",
        adminEdit: "Editează",
        adminDelete: "Șterge",
        adminCancel: "Anulează",
        adminUpdate: "Actualizează",
        adminAdd: "Adaugă",
        adminEditPatient: "Editează Pacient",
        adminApptDate: "Data",
        adminApptTime: "Ora",
        adminApptConfirmed: "Confirmat",
        adminApptPending: "În Așteptare",
        adminSpecCardio: "Cardiologie",
        adminSpecPediatrie: "Pediatrie",
        adminSpecMedGen: "Medicină Generală",
        adminSpecOrtoped: "Ortopedie",

        newsClose: "Închide",

        apptConfirmed: "Confirmată",
        apptPending: "În așteptare",
        apptCanceled: "Anulată",
        apptSpecCardio: "Cardiologie",
        apptSpecPediatrie: "Pediatrie",
        apptSpecMedGen: "Medicina Generală",
        apptSpecDerma: "Dermatologie",
        apptSpecNeuro: "Neurologie",
        apptSpecOrtoped: "Ortopedie",
        apptSpecOrl: "ORL",
        apptSpecOftalmologie: "Oftalmologie",

        auditTargetPatient: "Pacient",
        auditTargetAppointment: "Programare",
        auditTargetRecord: "Dosar Medical",
        auditTargetSystem: "Sistem",
        auditTargetUser: "Utilizator",
    },

    ru: {
        home: "Главная",
        services: "Услуги",
        doctors: "Врачи",
        myProfile: "Мой профиль",
        reviews: "Отзывы",
        contact: "Контакт",
        signIn: "Войти",
        signOut: "Выйти",
        appointment: "Запись",
        profile: "Профиль",

        existingPatient: "Существующий пациент",
        newPatient: "Новый пациент",
        loginTitle: "Войдите для начала сеанса",
        registerTitle: "Регистрация нового пациента",
        emailLabel: "Email",
        password: "Пароль",
        resetPassword: "Сбросить пароль",
        loginBtn: "Войти",
        registerBtn: "Зарегистрироваться",
        loginWithCode: "Войти с кодом",
        firstName: "Имя",
        lastName: "Фамилия",
        phone: "Номер телефона",
        birthDate: "Дата рождения",
        gender: "Пол",
        selectGender: "Выберите пол",
        male: "Мужчина",
        female: "Женщина",
        day: "День",
        month: "Месяц",
        year: "Год",

        heroBadge: "Аккредитованный медицинский кабинет",
        heroTitle1: "Ваше здоровье — это",
        heroTitle2: "Наш приоритет",
        heroDesc: "Современный медицинский кабинет с новейшим оборудованием и командой опытных специалистов. Предлагаем полный спектр медицинских услуг — от консультаций до лабораторных анализов.",
        heroBook: "Записаться",
        heroContact: "Связаться с нами",
        statPatients: "Пациентов",
        statDoctors: "Специалистов",
        statYears: "Лет опыта",

        scheduleTitle: "Расписание",
        schedMonFri: "Пн - Пт",
        schedSat: "Суббота",
        schedSun: "Воскресенье",
        closed: "Закрыто",

        featuresLabel: "Наши преимущества",
        featuresTitle: "Что предлагает наш медицинский кабинет",
        featuresSubtitle: "Качественные, доступные и быстрые услуги — для вашего здоровья и вашей семьи",
        feat1Title: "Гибкий график",
        feat1Desc: "Пн-Пт 08:00-20:00",
        feat2Title: "Доступные цены",
        feat2Desc: "Соглашения со страховыми компаниями",
        feat3Title: "Быстрые результаты",
        feat3Desc: "Анализы в тот же день",
        feat4Title: "Онлайн-запись",
        feat4Desc: "Доступно 24/7",

        teamBadge: "Наша команда",
        teamTitle: "Опытные врачи-специалисты",
        teamSubtitle: "Наша команда состоит из высококвалифицированных врачей с богатым опытом, преданных оказанию лучшей медицинской помощи",
        bookConsultation: "Записаться",
        yearsExp: "лет опыта",

        specInterna: "Внутренняя медицина",
        specCardio: "Кардиология",
        specPediatrie: "Педиатрия",
        specOrtoped: "Ортопедия",
        exp15: "15 лет опыта",
        exp12: "12 лет опыта",
        exp10: "10 лет опыта",
        exp18: "18 лет опыта",

        howBadge: "Наш процесс",
        howTitle: "Как работает запись",
        howSubtitle: "Просто, быстро и безопасно — запишитесь онлайн всего за 3 шага",
        step1Title: "Создайте аккаунт",
        step1Desc: "Быстрая регистрация по email или телефону. Ваши данные в безопасности.",
        step2Title: "Выберите врача",
        step2Desc: "Выберите специализацию и нужного врача. Посмотрите доступность в реальном времени.",
        step3Title: "Подтвердите",
        step3Desc: "Мгновенное подтверждение по SMS и email. Напоминание за 24 часа.",

        testiBadge: "Отзывы пациентов",
        testiTitle: "Что говорят наши пациенты",
        testiSubtitle: "Реальные отзывы от пациентов, воспользовавшихся нашими медицинскими услугами",
        verifiedPatient: "Проверенный пациент",

        testi1: "Самый профессиональный медицинский кабинет в городе. Доктор Татьяна спасла мне жизнь, своевременно диагностировав серьёзное заболевание. Персонал очень дружелюбный и чуткий.",
        testi2: "Здесь я сдал полный медицинский анализ. Результаты пришли очень быстро, всё было отлично организовано. Рекомендую!",
        testi3: "Мои дети здесь под наблюдением доктора Натальи. Она прекрасный врач, очень терпеливый и компетентный. Мы чувствуем себя в безопасности!",
        testi4: "Онлайн-запись очень удобна. Больше не нужно стоять в очередях! Медицинские услуги высшего класса, врачи очень квалифицированные.",

        ctaTitle: "Готовы улучшить своё здоровье?",
        ctaDesc: "Не откладывайте! Запишитесь сегодня на консультацию к одному из наших специалистов. Наша команда готова помочь вам.",
        ctaBook: "Записаться сейчас",
        ctaPrices: "Посмотреть цены",
        ctaSatisfaction: "Удовлетворённость пациентов",
        ctaOnline: "Онлайн-запись",

        // Footer
        footerDescription: "Современный медицинский кабинет с полным спектром диагностики и лечения. Команда врачей, посвящённых вашему здоровью.",
        footerQuickLinks: "Быстрые ссылки",
        footerSchedule: "Расписание",
        footerContact: "Контакт",
        footerMedicalServices: "Медицинские услуги",
        footerOurTeam: "Наша команда",
        footerTestimonials: "Отзывы",
        footerMedicalBlog: "Медицинский блог",
        footerAddress: "Адрес:",
        footerAddressVal: "Бул. Штефан чел Маре, 123, Кишинёв, Молдова",
        footerPhone: "Телефон:",
        footerEmail: "Email:",
        footerProgram: "Расписание:",
        footerProgramVal: "Пн-Пт: 08:00-20:00",

        // MedicalServices Page
        msHeroBadge: "Медицинские услуги",
        msHeroTitle1: "Медицинские услуги",
        msHeroTitle2: "высокого качества",
        msHeroDesc: "Предлагаем полный спектр медицинских услуг с новейшим оборудованием и командой специалистов, посвящённых вашему здоровью.",
        msBookNow: "Записаться",
        msContactUs: "Связаться с нами",
        msSpecialties: "Специальности",
        msDoctors: "Врачи",
        msBooking: "Запись",
        msAvailableSpec: "Доступные специальности",
        msAllServices: "Все наши услуги",
        msSearchPlaceholder: "Поиск медицинской услуги...",
        msFound1: "услуга найдена",
        msFoundMany: "услуг найдено",
        msNoResults: "Услуги не найдены",
        msNoResultsHint: "Попробуйте другой поиск или выберите другую категорию.",
        msPrice: "Цена",
        msDuration: "Длительность",
        msBookBtn: "Записаться →",
        msCatAll: "Все",
        msCatGeneral: "Generala",
        msCatSpec: "Specialitate",
        msCatLab: "Laborator",
        msCatImaging: "Imagistica",

        // ContactPage
        contactTitle: "Контакты и поддержка",
        contactSubtitle: "Мы здесь, чтобы помочь вам. Свяжитесь с нами для записи, вопросов или обратной связи.",
        contactInfoTitle: "Контактная информация",
        contactFormTitle: "Отправьте нам сообщение",
        contactLocationTitle: "Наше местоположение",
        contactFullName: "Полное имя",
        contactSubject: "Тема",
        contactMessage: "Сообщение",
        contactSubmit: "Отправить сообщение",
        contactSuccessMsg: "Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.",
        contactPhone: "Телефон",
        contactEmail: "Email",
        contactAddress: "Адрес",
        contactScheduleLabel: "Рабочее время",
        contactScheduleVal: "Пн - Пт: 08:00 - 20:00",
        contactScheduleSat: "Суббота: 09:00 - 14:00",

        // ProfilePage
        profMyAccount: "Мой аккаунт",
        profWelcome: "Добро пожаловать",
        profSubtitle: "Управляйте записями, анализами и личными данными. Просматривайте историю консультаций и обновляйте данные в реальном времени.",
        profNextAppt: "Следующая запись",
        profTabAppts: "Мои записи",
        profTabResults: "Анализы & Результаты",
        profTabSettings: "Настройки аккаунта",
        profPatient: "Пациент",
        profVerified: "✓ Аккаунт подтверждён",
        profPersonalData: "Личные данные",
        profStats: "Статистика",
        profApptsLabel: "Записи",
        profResultsLabel: "Анализы",
        profDoctorsLabel: "Врачи",
        profYearsLabel: "Лет пациентом",
        profNameLabel: "Имя:",
        profEmailLabel: "Email:",
        profPhoneLabel: "Телефон:",
        profBornLabel: "Родился:",
        profCityLabel: "Город:",
        profNewAppt: "+ Новая запись",
        profDateLabel: "Дата:",
        profTimeLabel: "Время:",
        profCancelBtn: "Отменить",
        profDownloadPdf: "Скачать PDF",
        profSettingsTitle: "Настройки аккаунта",
        profFullName: "Полное имя",
        profEmail: "Email",
        profPhone: "Телефон",
        profBirthdate: "Дата рождения",
        profCity: "Город",
        profSave: "Сохранить изменения",
        profSaved: "✓ Данные успешно сохранены!",
        profSecurity: "Безопасность",
        profCurrentPass: "Текущий пароль",
        profNewPass: "Новый пароль",
        profConfirmPass: "Подтвердить новый пароль",
        profChangePass: "Изменить пароль",
        profNotifications: "Уведомления",
        profCancelModal: "Подтвердить отмену",
        profCancelConfirm: "Вы уверены, что хотите отменить эту запись? Действие нельзя отменить.",
        profCancelNo: "Нет, оставить",
        profCancelYes: "Да, отменить",
        profHour: "Время",
        profCalLegend: "Запись",

        navHelp: "Помощь",
        navNews: "Новости",

        msCatGeneralaAlias: "общая",
        msCatSpecAlias: "специальность",
        msCatLabAlias: "лаборатория",
        msCatImagAlias: "визуализация",

        helpTitle: "Помощь & FAQ",
        helpSubtitle: "Быстро найдите ответы на частые вопросы",
        helpGuideTitle: "Быстрый гайд",
        helpGuideSub: "Следуйте шагам ниже для основных действий",
        helpSearchPlaceholder: "Поиск вопроса...",
        helpEmpty: "Ничего не найдено по вашему запросу.",
        helpContactText: "Не нашли ответ? Свяжитесь со службой поддержки:",

        notifTitle: "Уведомления",
        notifTotal: "Общее",
        notifUnread: "Непрочитанные",
        notifRead: "Прочитанные",
        notifMarkAll: "✓ Отметить все как прочитанные",
        notifAll: "Все",
        notifUnreadTab: "Непрочитанные",
        notifReadTab: "Прочитанные",
        notifEmpty: "Уведомлений в этой категории нет.",
        notifNew: "Новое",
        notifDelete: "Удалить уведомление",
        notifClose: "Закрыть",

        newsTitle: "Новости и обновления",
        newsSubtitle: "Узнайте последние изменения и объявления нашей клиники.",
        newsViewDetails: "Подробнее",
        newsNoItems: "Новостей в этой категории пока нет.",
        newsAll: "Все",

        apptTitle: "Запись онлайн",
        apptFormTitle: "Заполните форму записи",
        apptPatientName: "Имя пациента *",
        apptPhone: "Телефон *",
        apptEmail: "Email *",
        apptSelectDoctor: "Выберите врача *",
        apptSpecialization: "Специализация *",
        apptDate: "Дата записи *",
        apptTime: "Доступное время *",
        apptReason: "Причина визита *",
        apptSubmit: "Записаться",
        apptSuccess: "✅ Запись создана! Подтверждение придёт на email.",
        apptMyList: "Мои записи",
        apptCancel: "Отменить запись",
        apptCancelConfirm: "Вы уверены, что хотите отменить эту запись?",

        adminStats: "Статистика",
        adminAppts: "Записи",
        adminPatients: "Пациенты",
        adminDoctors: "Врачи",
        adminSettings: "Настройки",
        adminTotalPatients: "Всего пациентов",
        adminActivePatients: "Активные пациенты",
        adminTodayAppts: "Записей сегодня",
        adminActiveDoctors: "Активных врачей",
        adminAddPatient: "Добавить пациента",
        adminSearch: "Поиск пациента...",
        adminAllPatients: "Все пациенты",
        adminName: "Пациент",
        adminAge: "Возраст",
        adminPhone: "Телефон",
        adminEmail: "Email",
        adminLastVisit: "Последний визит",
        adminStatus: "Статус",
        adminActions: "Действия",
        adminActive: "Активный",
        adminInactive: "Неактивный",
        adminSettingsTitle: "Настройки аккаунта",
        adminChangePass: "Изменить пароль",
        adminNotifEmail: "Email для уведомлений",
        adminLanguage: "Язык",
        adminTheme: "Тема",
        adminSave: "Сохранить",

        adminNavDashboard: "Панель управления",
        adminNavAudit: "Аудит & История",
        adminNavExitAdmin: "Выйти из Панели",
        adminNavPanel: "Панель Администратора",

        adminView: "Просмотр",
        adminEdit: "Редактировать",
        adminDelete: "Удалить",
        adminCancel: "Отмена",
        adminUpdate: "Обновить",
        adminAdd: "Добавить",
        adminEditPatient: "Редактировать пациента",
        adminApptDate: "Дата",
        adminApptTime: "Время",
        adminApptConfirmed: "Подтверждено",
        adminApptPending: "Ожидание",
        adminSpecCardio: "Кардиология",
        adminSpecPediatrie: "Педиатрия",
        adminSpecMedGen: "Общая медицина",
        adminSpecOrtoped: "Ортопедия",

        newsClose: "Закрыть",

        apptConfirmed: "Подтверждена",
        apptPending: "В ожидании",
        apptCanceled: "Отменена",
        apptSpecCardio: "Кардиология",
        apptSpecPediatrie: "Педиатрия",
        apptSpecMedGen: "Общая медицина",
        apptSpecDerma: "Дерматология",
        apptSpecNeuro: "Неврология",
        apptSpecOrtoped: "Ортопедия",
        apptSpecOrl: "ЛОР",
        apptSpecOftalmologie: "Офтальмология",

        auditTargetPatient: "Пациент",
        auditTargetAppointment: "Запись",
        auditTargetRecord: "Медкарта",
        auditTargetSystem: "Система",
        auditTargetUser: "Пользователь",
    },

    en: {
        home: "Home",
        services: "Services",
        doctors: "Doctors",
        myProfile: "My Profile",
        reviews: "Reviews",
        contact: "Contact",
        signIn: "Sign In",
        signOut: "Sign Out",
        appointment: "Appointment",
        profile: "Profile",

        existingPatient: "Existing patient",
        newPatient: "New patient",
        loginTitle: "Sign in to start your session",
        registerTitle: "New patient registration",
        emailLabel: "Email",
        password: "Password",
        resetPassword: "Reset password",
        loginBtn: "Sign In",
        registerBtn: "Register",
        loginWithCode: "Sign in with code",
        firstName: "First name",
        lastName: "Last name",
        phone: "Phone number",
        birthDate: "Date of birth",
        gender: "Gender",
        selectGender: "Select gender",
        male: "Male",
        female: "Female",
        day: "Day",
        month: "Month",
        year: "Year",

        heroBadge: "Accredited Medical Clinic",
        heroTitle1: "Your Health Is",
        heroTitle2: "Our Priority",
        heroDesc: "A modern medical clinic with state-of-the-art equipment and a team of experienced specialist doctors. We offer complete medical services, from specialist consultations to complex laboratory tests.",
        heroBook: "Book Appointment",
        heroContact: "Contact Us",
        statPatients: "Patients Treated",
        statDoctors: "Specialist Doctors",
        statYears: "Years Experience",

        scheduleTitle: "Schedule",
        schedMonFri: "Monday - Friday",
        schedSat: "Saturday",
        schedSun: "Sunday",
        closed: "Closed",

        featuresLabel: "Our Advantages",
        featuresTitle: "What Our Medical Clinic Offers",
        featuresSubtitle: "Quality, accessible and fast services — for your health and your family's health",
        feat1Title: "Flexible Schedule",
        feat1Desc: "Mon-Fri 08:00-20:00",
        feat2Title: "Affordable Prices",
        feat2Desc: "Agreements with insurance companies",
        feat3Title: "Fast Results",
        feat3Desc: "Same-day lab results",
        feat4Title: "Online Booking",
        feat4Desc: "Available 24/7",

        teamBadge: "Our Team",
        teamTitle: "Experienced Specialist Doctors",
        teamSubtitle: "Our team consists of highly trained doctors with vast experience, dedicated to providing you with the best medical services",
        bookConsultation: "Book Appointment",
        yearsExp: "years experience",

        specInterna: "Internal Medicine",
        specCardio: "Cardiology",
        specPediatrie: "Pediatrics",
        specOrtoped: "Orthopedics",
        exp15: "15 years experience",
        exp12: "12 years experience",
        exp10: "10 years experience",
        exp18: "18 years experience",

        howBadge: "Our Process",
        howTitle: "How Booking Works",
        howSubtitle: "Simple, fast and safe — book online in just 3 steps",
        step1Title: "Create Account",
        step1Desc: "Quick registration with email or phone. Your data is safe.",
        step2Title: "Choose Doctor",
        step2Desc: "Select the specialty and desired doctor. See availability in real time.",
        step3Title: "Confirm",
        step3Desc: "Instant confirmation by SMS and email. Reminder 24h before.",

        testiBadge: "Patient Reviews",
        testiTitle: "What Our Patients Say",
        testiSubtitle: "Real feedback from patients who have benefited from our medical services",
        verifiedPatient: "Verified Patient",

        testi1: "The most professional medical clinic in the city. Dr. Tatiana saved my life by timely diagnosing a serious condition. The staff is extremely friendly and empathetic.",
        testi2: "I had a complete medical check-up here. Results came very quickly, everything was very well organized. Highly recommend!",
        testi3: "My children are cared for here by Dr. Natalia. She is an extraordinary doctor, very patient and competent. We feel safe!",
        testi4: "Online bookings are very convenient. No more waiting in lines! Medical services are top-notch, doctors are very well trained.",

        ctaTitle: "Ready to Improve Your Health?",
        ctaDesc: "Don't delay! Book today for a consultation with one of our specialist doctors. Our team is ready to help you.",
        ctaBook: "Book Now",
        ctaPrices: "See Prices",
        ctaSatisfaction: "Patient Satisfaction",
        ctaOnline: "Online Booking",

        // Footer
        footerDescription: "Modern medical clinic with complete diagnostic and treatment services. A team of specialist doctors dedicated to your health.",
        footerQuickLinks: "Quick Links",
        footerSchedule: "Schedule",
        footerContact: "Contact",
        footerMedicalServices: "Medical Services",
        footerOurTeam: "Our Team",
        footerTestimonials: "Testimonials",
        footerMedicalBlog: "Medical Blog",
        footerAddress: "Address:",
        footerAddressVal: "Bd. Stefan cel Mare no. 123, Chisinau, Moldova",
        footerPhone: "Phone:",
        footerEmail: "Email:",
        footerProgram: "Schedule:",
        footerProgramVal: "Mon-Fri: 08:00-20:00",

        // MedicalServices Page
        msHeroBadge: "Medical Services",
        msHeroTitle1: "Medical Services",
        msHeroTitle2: "of High Quality",
        msHeroDesc: "We offer a complete range of medical services with state-of-the-art equipment and a team of specialists dedicated to your health.",
        msBookNow: "Book Now",
        msContactUs: "Contact Us",
        msSpecialties: "Specialties",
        msDoctors: "Doctors",
        msBooking: "Booking",
        msAvailableSpec: "Available Specialties",
        msAllServices: "All Our Services",
        msSearchPlaceholder: "Search a medical service...",
        msFound1: "service found",
        msFoundMany: "services found",
        msNoResults: "No services found",
        msNoResultsHint: "Try a different search or select a different category.",
        msPrice: "Price",
        msDuration: "Duration",
        msBookBtn: "Book →",
        msCatAll: "All",
        msCatGeneral: "Generala",
        msCatSpec: "Specialitate",
        msCatLab: "Laborator",
        msCatImaging: "Imagistica",

        // ContactPage
        contactTitle: "Contact & Support",
        contactSubtitle: "We are here to help you. Contact us for appointments, questions or feedback.",
        contactInfoTitle: "Contact Information",
        contactFormTitle: "Send us a Message",
        contactLocationTitle: "Our Location",
        contactFullName: "Full Name",
        contactSubject: "Subject",
        contactMessage: "Message",
        contactSubmit: "Send Message",
        contactSuccessMsg: "Message sent successfully! We will contact you soon.",
        contactPhone: "Phone",
        contactEmail: "Email",
        contactAddress: "Address",
        contactScheduleLabel: "Working Hours",
        contactScheduleVal: "Monday - Friday: 08:00 - 20:00",
        contactScheduleSat: "Saturday: 09:00 - 14:00",

        // ProfilePage
        profMyAccount: "My Account",
        profWelcome: "Welcome back",
        profSubtitle: "Manage your appointments, test results, and personal data. View consultation history and update personal details in real time.",
        profNextAppt: "Next appointment",
        profTabAppts: "My Appointments",
        profTabResults: "Tests & Results",
        profTabSettings: "Account Settings",
        profPatient: "Patient",
        profVerified: "✓ Verified Account",
        profPersonalData: "Personal Data",
        profStats: "Statistics",
        profApptsLabel: "Appointments",
        profResultsLabel: "Tests",
        profDoctorsLabel: "Doctors",
        profYearsLabel: "Years Patient",
        profNameLabel: "Name:",
        profEmailLabel: "Email:",
        profPhoneLabel: "Phone:",
        profBornLabel: "Born:",
        profCityLabel: "City:",
        profNewAppt: "+ New Appointment",
        profDateLabel: "Date:",
        profTimeLabel: "Time:",
        profCancelBtn: "Cancel",
        profDownloadPdf: "Download PDF",
        profSettingsTitle: "Account Settings",
        profFullName: "Full name",
        profEmail: "Email",
        profPhone: "Phone",
        profBirthdate: "Date of birth",
        profCity: "City",
        profSave: "Save Changes",
        profSaved: "✓ Data saved successfully!",
        profSecurity: "Security",
        profCurrentPass: "Current password",
        profNewPass: "New password",
        profConfirmPass: "Confirm new password",
        profChangePass: "Change Password",
        profNotifications: "Notifications",
        profCancelModal: "Confirm Cancellation",
        profCancelConfirm: "Are you sure you want to cancel this appointment? This action cannot be undone.",
        profCancelNo: "No, Keep It",
        profCancelYes: "Yes, Cancel",
        profHour: "Time",
        profCalLegend: "Appointment",

        navHelp: "Help",
        navNews: "News",

        msCatGeneralaAlias: "general",
        msCatSpecAlias: "specialty",
        msCatLabAlias: "laboratory",
        msCatImagAlias: "imaging",

        helpTitle: "Help & FAQ",
        helpSubtitle: "Quickly find answers to frequently asked questions",
        helpGuideTitle: "Quick Guide",
        helpGuideSub: "Follow the steps below for the main actions",
        helpSearchPlaceholder: "Search a question...",
        helpEmpty: "No questions found for your search.",
        helpContactText: "Didn't find the answer? Contact the support team:",

        notifTitle: "Notifications",
        notifTotal: "Total",
        notifUnread: "Unread",
        notifRead: "Read",
        notifMarkAll: "✓ Mark all as read",
        notifAll: "All",
        notifUnreadTab: "Unread",
        notifReadTab: "Read",
        notifEmpty: "No notifications in this category.",
        notifNew: "New",
        notifDelete: "Delete notification",
        notifClose: "Close",

        newsTitle: "News & Updates",
        newsSubtitle: "Discover the latest changes and announcements from our clinic.",
        newsViewDetails: "View details",
        newsNoItems: "No news in this category currently.",
        newsAll: "All",

        apptTitle: "Online Appointment",
        apptFormTitle: "Fill in the appointment form",
        apptPatientName: "Patient name *",
        apptPhone: "Phone *",
        apptEmail: "Email *",
        apptSelectDoctor: "Select doctor *",
        apptSpecialization: "Specialization *",
        apptDate: "Appointment date *",
        apptTime: "Available time *",
        apptReason: "Reason for visit *",
        apptSubmit: "Book Appointment",
        apptSuccess: "✅ Appointment created! Confirmation will be sent to your email.",
        apptMyList: "My Appointments",
        apptCancel: "Cancel appointment",
        apptCancelConfirm: "Are you sure you want to cancel this appointment?",

        adminStats: "Statistics",
        adminAppts: "Appointments",
        adminPatients: "Patients",
        adminDoctors: "Doctors",
        adminSettings: "Settings",
        adminTotalPatients: "Total Patients",
        adminActivePatients: "Active Patients",
        adminTodayAppts: "Today's Appointments",
        adminActiveDoctors: "Active Doctors",
        adminAddPatient: "Add Patient",
        adminSearch: "Search patient...",
        adminAllPatients: "All patients",
        adminName: "Patient",
        adminAge: "Age",
        adminPhone: "Phone",
        adminEmail: "Email",
        adminLastVisit: "Last Visit",
        adminStatus: "Status",
        adminActions: "Actions",
        adminActive: "Active",
        adminInactive: "Inactive",
        adminSettingsTitle: "Account settings",
        adminChangePass: "Change password",
        adminNotifEmail: "Notification email",
        adminLanguage: "Language",
        adminTheme: "Theme",
        adminSave: "Save Changes",

        adminNavDashboard: "Dashboard",
        adminNavAudit: "Audit & Activity",
        adminNavExitAdmin: "Exit Admin",
        adminNavPanel: "Administrator Panel",

        adminView: "View",
        adminEdit: "Edit",
        adminDelete: "Delete",
        adminCancel: "Cancel",
        adminUpdate: "Update",
        adminAdd: "Add",
        adminEditPatient: "Edit Patient",
        adminApptDate: "Date",
        adminApptTime: "Time",
        adminApptConfirmed: "Confirmed",
        adminApptPending: "Pending",
        adminSpecCardio: "Cardiology",
        adminSpecPediatrie: "Pediatrics",
        adminSpecMedGen: "General Medicine",
        adminSpecOrtoped: "Orthopedics",

        newsClose: "Close",

        apptConfirmed: "Confirmed",
        apptPending: "Pending",
        apptCanceled: "Cancelled",
        apptSpecCardio: "Cardiology",
        apptSpecPediatrie: "Pediatrics",
        apptSpecMedGen: "General Medicine",
        apptSpecDerma: "Dermatology",
        apptSpecNeuro: "Neurology",
        apptSpecOrtoped: "Orthopedics",
        apptSpecOrl: "ENT",
        apptSpecOftalmologie: "Ophthalmology",

        auditTargetPatient: "Patient",
        auditTargetAppointment: "Appointment",
        auditTargetRecord: "Medical Record",
        auditTargetSystem: "System",
        auditTargetUser: "User",
    },
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>(() => {
        const saved = localStorage.getItem("medicare_lang");
        if (saved === "ro" || saved === "ru" || saved === "en") return saved;
        return "ro";
    });

    const setLanguage = (lang: Language) => {
        localStorage.setItem("medicare_lang", lang);
        setLanguageState(lang);
    };

    return (
        <LanguageContext.Provider value={{
            language,
            setLanguage,
            t: translations[language]
        }}>
            {children}
        </LanguageContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) throw new Error("useLanguage must be used within LanguageProvider");
    return context;
}

