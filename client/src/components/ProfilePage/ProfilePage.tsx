import "./ProfilePage.css";
import Navbar from "../../shared/Navbar/Navbar";
import Footer from "../../shared/Footer/Footer";
import heroBg1 from "../../assets/hero-bg1.jpg";
import heroBg2 from "../../assets/hero-bg2.jpg";
import heroBg3 from "../../assets/hero-bg3.jpg";
import heroBg4 from "../../assets/hero-bg4.jpg";
import heroBg5 from "../../assets/hero-bg5.jpg";
import { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import testPdf from "../../assets/test-result.pdf";

interface Programare {
    id: number;
    doctor: string;
    specialty: string;
    date: string;
    time: string;
    status: string;
    initials: string;
}

const LUNI_RO = ["Ianuarie","Februarie","Martie","Aprilie","Mai","Iunie","Iulie","August","Septembrie","Octombrie","Noiembrie","Decembrie"];
const LUNI_RU = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
const LUNI_EN = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const ZILE_RO = ["Lu","Ma","Mi","Jo","Vi","Sa","Du"];
const ZILE_RU = ["Пн","Вт","Ср","Чт","Пт","Сб","Вс"];
const ZILE_EN = ["Mo","Tu","We","Th","Fr","Sa","Su"];

const parseDate = (dateStr: string) => {
    const months: Record<string, number> = {
        "Ianuarie": 0, "Februarie": 1, "Martie": 2, "Aprilie": 3,
        "Mai": 4, "Iunie": 5, "Iulie": 6, "August": 7,
        "Septembrie": 8, "Octombrie": 9, "Noiembrie": 10, "Decembrie": 11
    };
    const parts = dateStr.split(" ");
    return new Date(parseInt(parts[2]), months[parts[1]] ?? 0, parseInt(parts[0]));
};

const MiniCalendar = ({ programari, language }: { programari: Programare[], language: string }) => {
    const azi = new Date();
    const [luna, setLuna] = useState(azi.getMonth());
    const [an, setAn] = useState(azi.getFullYear());

    const LUNI = language === "ru" ? LUNI_RU : language === "en" ? LUNI_EN : LUNI_RO;
    const ZILE = language === "ru" ? ZILE_RU : language === "en" ? ZILE_EN : ZILE_RO;
    const legend = language === "ru" ? "Запись" : language === "en" ? "Appointment" : "Programare";

    const primaZiLuna = new Date(an, luna, 1);
    const ultimaZiLuna = new Date(an, luna + 1, 0);
    const startOffset = (primaZiLuna.getDay() + 6) % 7;
    const totalZile = ultimaZiLuna.getDate();

    const programariZile = new Set(
        programari.map((p) => {
            const d = parseDate(p.date);
            if (d.getMonth() === luna && d.getFullYear() === an) return d.getDate();
            return null;
        }).filter(Boolean)
    );

    const mergiInapoi = () => { if (luna === 0) { setLuna(11); setAn(an - 1); } else setLuna(luna - 1); };
    const mergiInainte = () => { if (luna === 11) { setLuna(0); setAn(an + 1); } else setLuna(luna + 1); };

    const celule: (number | null)[] = [];
    for (let i = 0; i < startOffset; i++) celule.push(null);
    for (let i = 1; i <= totalZile; i++) celule.push(i);

    return (
        <div className="mini-calendar">
            <div className="calendar-header">
                <button className="calendar-nav" onClick={mergiInapoi}>‹</button>
                <span className="calendar-title">{LUNI[luna]} {an}</span>
                <button className="calendar-nav" onClick={mergiInainte}>›</button>
            </div>
            <div className="calendar-grid-header">
                {ZILE.map((z) => <span key={z} className="calendar-day-name">{z}</span>)}
            </div>
            <div className="calendar-grid">
                {celule.map((zi, idx) => (
                    <div key={idx} className={`calendar-cell ${zi === null ? "calendar-empty" : ""} ${zi === azi.getDate() && luna === azi.getMonth() && an === azi.getFullYear() ? "calendar-today" : ""} ${zi && programariZile.has(zi) ? "calendar-has-appointment" : ""}`}>
                        {zi}
                        {zi && programariZile.has(zi) && <span className="calendar-dot"></span>}
                    </div>
                ))}
            </div>
            <div className="calendar-legend">
                <span className="legend-dot"></span>
                <span className="legend-text">{legend}</span>
            </div>
        </div>
    );
};

const ProfilePage = () => {
    const { t, language } = useLanguage();
    const [activeTab, setActiveTab] = useState("programari");
    const images = [heroBg1, heroBg2, heroBg3, heroBg4, heroBg5];
    const [currentImage, setCurrentImage] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => setCurrentImage((prev) => (prev + 1) % images.length), 3000);
        return () => clearInterval(interval);
    }, []);

    const [numeComplet, setNumeComplet] = useState("Ion Popescu");
    const [email, setEmail] = useState("ion.popescu@email.com");
    const [telefon, setTelefon] = useState("+373 69 123 456");
    const [dataNasterii, setDataNasterii] = useState("1985-03-15");
    const [oras, setOras] = useState("Chisinau, Moldova");
    const formatData = (data: string) => { const [an, luna, zi] = data.split("-"); return `${zi}-${luna}-${an}`; };

    const [showSuccessMsg, setShowSuccessMsg] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [programareDeAnulat, setProgramareDeAnulat] = useState<number | null>(null);

    const [numeCompletTemp, setNumeCompletTemp] = useState("Ion Popescu");
    const [emailTemp, setEmailTemp] = useState("ion.popescu@email.com");
    const [telefonTemp, setTelefonTemp] = useState("+373 69 123 456");
    const [dataNasteriiTemp, setDataNasteriiTemp] = useState("1985-03-15");
    const [orasTemp, setOrasTemp] = useState("Chisinau, Moldova");

    const salveazaModificarile = () => {
        setNumeComplet(numeCompletTemp); setEmail(emailTemp); setTelefon(telefonTemp);
        setDataNasterii(dataNasteriiTemp); setOras(orasTemp);
        setShowSuccessMsg(true); setTimeout(() => setShowSuccessMsg(false), 3000);
    };

    const [programari, setProgramari] = useState([
        { id: 1, doctor: "Dr. Tatiana Cobzac",  specialty: "Medicina Interna", date: "25 Februarie 2026", time: "10:30", status: "confirmat",   initials: "TC" },
        { id: 2, doctor: "Dr. Vasile Munteanu",  specialty: "Cardiologie",      date: "10 Martie 2026",   time: "14:00", status: "in asteptare", initials: "VM" },
        { id: 3, doctor: "Dr. Andrei Leahu",     specialty: "Ortopedie",        date: "15 Ianuarie 2026", time: "09:00", status: "finalizat",    initials: "AL" },
    ]);

    const analize = [
        { id: 1, name: "Hemoleucograma completa", date: "10 Ianuarie 2026", status: "disponibil", doctor: "Dr. Tatiana Cobzac" },
        { id: 2, name: "Profil lipidic",          date: "10 Ianuarie 2026", status: "disponibil", doctor: "Dr. Vasile Munteanu" },
        { id: 3, name: "Glicemie a jeun",         date: "05 Decembrie 2025", status: "disponibil", doctor: "Dr. Tatiana Cobzac" },
    ];

    const getStatusClass = (status: string) => {
        switch (status) {
            case "confirmat":    return "status-confirmed";
            case "in asteptare": return "status-pending";
            case "finalizat":    return "status-done";
            case "disponibil":   return "status-available";
            default:             return "";
        }
    };

    const getStatusLabel = (status: string) => {
        if (language === "ru") {
            switch (status) {
                case "confirmat":    return "Подтверждено";
                case "in asteptare": return "Ожидание";
                case "finalizat":    return "Завершено";
                case "disponibil":   return "Доступно";
                default:             return status;
            }
        }
        if (language === "en") {
            switch (status) {
                case "confirmat":    return "Confirmed";
                case "in asteptare": return "Pending";
                case "finalizat":    return "Completed";
                case "disponibil":   return "Available";
                default:             return status;
            }
        }
        return status;
    };

    const notifOptions = language === "ru"
        ? ["Напоминание о записи (SMS)", "Напоминание о записи (Email)", "Результаты анализов доступны", "Акции и новости MediCare"]
        : language === "en"
            ? ["Appointment reminder (SMS)", "Appointment reminder (Email)", "Lab results available", "MediCare offers & news"]
            : ["Reminder programări (SMS)", "Reminder programări (Email)", "Rezultate analize disponibile", "Oferte și noutăți MediCare"];

    return (
        <div className="profile-page">
            <Navbar />

            {showCancelModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h3 className="modal-title">{t.profCancelModal}</h3>
                        <p className="modal-text">{t.profCancelConfirm}</p>
                        <div className="modal-buttons">
                            <button className="modal-btn-cancel" onClick={() => setShowCancelModal(false)}>{t.profCancelNo}</button>
                            <button className="modal-btn-confirm" onClick={() => { setProgramari(programari.filter(p => p.id !== programareDeAnulat)); setShowCancelModal(false); setProgramareDeAnulat(null); }}>{t.profCancelYes}</button>
                        </div>
                    </div>
                </div>
            )}

            <section className="profile-hero">
                {images.map((img, index) => (
                    <div key={index} className="hero-slide" style={{ backgroundImage: `url(${img})`, opacity: index === currentImage ? 1 : 0 } as React.CSSProperties}></div>
                ))}
                <div className="hero-overlay"></div>
                <div className="profile-hero-container">
                    <div className="profile-hero-left">
                        <div className="profile-hero-badge">{t.profMyAccount}</div>
                        <h1 className="profile-hero-title">
                            {t.profWelcome}, <span className="hero-highlight">{numeComplet}</span>
                        </h1>
                        <p className="profile-hero-subtitle">{t.profSubtitle}</p>
                        <div className="hero-next-appointment">
                            <div className="hero-appointment-label">{t.profNextAppt}</div>
                            <div className="hero-appointment-details">
                                <div className="hero-appointment-doctor">
                                    <div className="hero-doctor-avatar">TC</div>
                                    <div>
                                        <p className="hero-doctor-name">Dr. Tatiana Cobzac</p>
                                        <p className="hero-doctor-specialty">Medicina Interna</p>
                                    </div>
                                </div>
                                <div className="hero-appointment-time">
                                    <p className="hero-appointment-date">25 Februarie 2026</p>
                                    <p className="hero-appointment-hour">{t.profHour} 10:30</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="profile-hero-right">
                        <MiniCalendar programari={programari} language={language} />
                    </div>
                </div>
            </section>

            <div className="profile-main">
                <div className="profile-layout">
                    <aside className="profile-sidebar">
                        <div className="sidebar-card avatar-card">
                            <div className="profile-avatar">IP</div>
                            <h2 className="profile-name">{numeComplet}</h2>
                            <p className="profile-role">{t.profPatient}</p>
                            <div className="profile-badge-verified">{t.profVerified}</div>
                        </div>

                        <div className="sidebar-card info-card">
                            <h3 className="sidebar-card-title">{t.profPersonalData}</h3>
                            <ul className="info-list">
                                <li className="info-item"><span className="info-label">{t.profNameLabel}</span><span>{numeComplet}</span></li>
                                <li className="info-item"><span className="info-label">{t.profEmailLabel}</span><span>{email}</span></li>
                                <li className="info-item"><span className="info-label">{t.profPhoneLabel}</span><span>{telefon}</span></li>
                                <li className="info-item"><span className="info-label">{t.profBornLabel}</span><span>{formatData(dataNasterii)}</span></li>
                                <li className="info-item"><span className="info-label">{t.profCityLabel}</span><span>{oras}</span></li>
                            </ul>
                        </div>

                        <div className="sidebar-card stats-card">
                            <h3 className="sidebar-card-title">{t.profStats}</h3>
                            <div className="stats-grid">
                                <div className="stat-box"><span className="stat-number">{programari.length}</span><span className="stat-label">{t.profApptsLabel}</span></div>
                                <div className="stat-box"><span className="stat-number">{analize.length}</span><span className="stat-label">{t.profResultsLabel}</span></div>
                                <div className="stat-box"><span className="stat-number">{[...new Set(programari.map(p => p.doctor))].length}</span><span className="stat-label">{t.profDoctorsLabel}</span></div>
                                <div className="stat-box"><span className="stat-number">2</span><span className="stat-label">{t.profYearsLabel}</span></div>
                            </div>
                        </div>
                    </aside>

                    <main className="profile-content">
                        <div className="tabs-container">
                            <button className={`tab-btn ${activeTab === "programari" ? "tab-active" : ""}`} onClick={() => setActiveTab("programari")}>{t.profTabAppts}</button>
                            <button className={`tab-btn ${activeTab === "analize" ? "tab-active" : ""}`} onClick={() => setActiveTab("analize")}>{t.profTabResults}</button>
                            <button className={`tab-btn ${activeTab === "setari" ? "tab-active" : ""}`} onClick={() => setActiveTab("setari")}>{t.profTabSettings}</button>
                        </div>

                        {activeTab === "programari" && (
                            <div className="tab-content">
                                <div className="content-header">
                                    <h2 className="content-title">{t.profTabAppts}</h2>
                                    <button className="navbar-btn" onClick={() => navigate("/appointments")}>{t.profNewAppt}</button>
                                </div>
                                <div className="appointments-list">
                                    {programari.map((p) => (
                                        <div key={p.id} className="appointment-card">
                                            <div className="appointment-left">
                                                <div className="doctor-avatar-sm">{p.initials}</div>
                                                <div className="appointment-info">
                                                    <h3 className="appointment-doctor">{p.doctor}</h3>
                                                    <p className="appointment-specialty">{p.specialty}</p>
                                                </div>
                                            </div>
                                            <div className="appointment-center">
                                                <div className="appointment-date"><span>{t.profDateLabel} {p.date}</span></div>
                                                <div className="appointment-time"><span>{t.profHour}: {p.time}</span></div>
                                            </div>
                                            <div className="appointment-right">
                                                <span className={`status-badge ${getStatusClass(p.status)}`}>{getStatusLabel(p.status)}</span>
                                                {p.status !== "finalizat" && (
                                                    <button className="cancel-btn" onClick={() => { setProgramareDeAnulat(p.id); setShowCancelModal(true); }}>{t.profCancelBtn}</button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === "analize" && (
                            <div className="tab-content">
                                <div className="content-header"><h2 className="content-title">{t.profTabResults}</h2></div>
                                <div className="analize-list">
                                    {analize.map((a) => (
                                        <div key={a.id} className="analiza-card">
                                            <div className="analiza-info">
                                                <h3 className="analiza-name">{a.name}</h3>
                                                <p className="analiza-doctor">{a.doctor}</p>
                                                <p className="analiza-date">{a.date}</p>
                                            </div>
                                            <div className="analiza-right">
                                                <span className={`status-badge ${getStatusClass(a.status)}`}>{getStatusLabel(a.status)}</span>
                                                <button className="navbar-btn" onClick={() => {
                                                    const link = document.createElement("a");
                                                    link.href = testPdf;
                                                    link.download = `rezultat-${a.name}.pdf`;
                                                    link.click();
                                                }}>{t.profDownloadPdf}</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === "setari" && (
                            <div className="tab-content">
                                <div className="content-header"><h2 className="content-title">{t.profSettingsTitle}</h2></div>
                                <div className="settings-grid">
                                    <div className="settings-card">
                                        <h3 className="settings-card-title">{t.profPersonalData}</h3>
                                        <div className="form-group"><label className="form-label">{t.profFullName}</label><input className="form-input" type="text" value={numeCompletTemp} onChange={(e) => setNumeCompletTemp(e.target.value)} /></div>
                                        <div className="form-group"><label className="form-label">{t.profEmail}</label><input className="form-input" type="email" value={emailTemp} onChange={(e) => setEmailTemp(e.target.value)} /></div>
                                        <div className="form-group"><label className="form-label">{t.profPhone}</label><input className="form-input" type="tel" value={telefonTemp} onChange={(e) => setTelefonTemp(e.target.value)} /></div>
                                        <div className="form-group"><label className="form-label">{t.profBirthdate}</label><input className="form-input" type="date" value={dataNasteriiTemp} onChange={(e) => setDataNasteriiTemp(e.target.value)} /></div>
                                        <div className="form-group"><label className="form-label">{t.profCity}</label><input className="form-input" type="text" value={orasTemp} onChange={(e) => setOrasTemp(e.target.value)} /></div>
                                        <button className="outline-btn" onClick={salveazaModificarile}>{t.profSave}</button>
                                        {showSuccessMsg && <div className="success-msg">{t.profSaved}</div>}
                                    </div>

                                    <div className="settings-card security-card">
                                        <h3 className="settings-card-title">{t.profSecurity}</h3>
                                        <div className="form-group"><label className="form-label">{t.profCurrentPass}</label><input className="form-input" type="password" placeholder="••••••••" /></div>
                                        <div className="form-group"><label className="form-label">{t.profNewPass}</label><input className="form-input" type="password" placeholder="••••••••" /></div>
                                        <div className="form-group"><label className="form-label">{t.profConfirmPass}</label><input className="form-input" type="password" placeholder="••••••••" /></div>
                                        <button className="outline-btn">{t.profChangePass}</button>
                                    </div>

                                    <div className="settings-card full-width">
                                        <h3 className="settings-card-title">{t.profNotifications}</h3>
                                        <div className="notification-options">
                                            {notifOptions.map((opt, i) => (
                                                <label key={i} className="toggle-label">
                                                    <span>{opt}</span>
                                                    <input type="checkbox" defaultChecked={i < 3} className="toggle-input" />
                                                    <span className="toggle-slider"></span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ProfilePage;
