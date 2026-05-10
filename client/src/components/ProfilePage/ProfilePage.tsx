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
import { translateSpecialization } from "../../utils/translateSpecialization";
import { useNavigate } from "react-router-dom";
import testPdf from "../../assets/test-result.pdf";
import { useApi } from "../../api/context";
import { useAuth } from "../../context/AuthContext";

// Tipuri

interface AppointmentAPI {
    patientName: string;
    phone: string;
    email: string;
    doctorName: string;
    serviceName: string;
    reasonForVisit: string;
    appointmentTime: string;
    appointmentDate: string;
    status?: string;
}

interface PatientAPI {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    dateOfBirth?: string;
    sex?: string;
    status?: number;
}

interface Programare {
    id: number;
    doctor: string;
    specialty: string;
    date: string;
    time: string;
    status: string;
    initials: string;
}

// Calendar

const LUNI_RO = ["Ianuarie","Februarie","Martie","Aprilie","Mai","Iunie","Iulie","August","Septembrie","Octombrie","Noiembrie","Decembrie"];
const LUNI_RU = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
const LUNI_EN = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const ZILE_RO = ["Lu","Ma","Mi","Jo","Vi","Sa","Du"];
const ZILE_RU = ["Пн","Вт","Ср","Чт","Пт","Сб","Вс"];
const ZILE_EN = ["Mo","Tu","We","Th","Fr","Sa","Su"];

const parseDate = (dateStr: string) => {
    if (dateStr.includes("-")) {
        const [an, luna, zi] = dateStr.split("-").map(Number);
        return new Date(an, luna - 1, zi);
    }
    const months: Record<string, number> = {
        "Ianuarie": 0, "Februarie": 1, "Martie": 2, "Aprilie": 3,
        "Mai": 4, "Iunie": 5, "Iulie": 6, "August": 7,
        "Septembrie": 8, "Octombrie": 9, "Noiembrie": 10, "Decembrie": 11
    };
    const parts = dateStr.split(" ");
    return new Date(parseInt(parts[2]), months[parts[1]] ?? 0, parseInt(parts[0]));
};

const formatDateDisplay = (dateStr: string, language: string): string => {
    const LUNI = language === "ru" ? LUNI_RU : language === "en" ? LUNI_EN : LUNI_RO;
    if (dateStr.includes("-")) {
        const [an, luna, zi] = dateStr.split("-").map(Number);
        return `${zi} ${LUNI[luna - 1]} ${an}`;
    }
    return dateStr;
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

// ProfilePage

const ProfilePage = () => {
    const { t, language } = useLanguage();
    const [activeTab, setActiveTab] = useState("programari");
    const images = [heroBg1, heroBg2, heroBg3, heroBg4, heroBg5];
    const [currentImage, setCurrentImage] = useState(0);
    const navigate = useNavigate();
    const api = useApi();
    const { userId, userEmail } = useAuth();

    // Rotatie imagini
    useEffect(() => {
        const interval = setInterval(() => setCurrentImage((prev) => (prev + 1) % images.length), 3000);
        return () => clearInterval(interval);
    }, []);

    // Date pacient
    const [numeComplet, setNumeComplet] = useState("");
    const [email, setEmail] = useState("");
    const [telefon, setTelefon] = useState("");
    const [dataNasterii, setDataNasterii] = useState("");
    const [sex, setSex] = useState("");

    const [numeCompletTemp, setNumeCompletTemp] = useState("");
    const [emailTemp, setEmailTemp] = useState("");
    const [telefonTemp, setTelefonTemp] = useState("");
    const [dataNasteriiTemp, setDataNasteriiTemp] = useState("");
    const [sexTemp, setSexTemp] = useState("");

    const [loadingProfile, setLoadingProfile] = useState(true);

    useEffect(() => {
        if (!userId) return;
        const fetchPatient = async () => {
            try {
                const data = await api.get<PatientAPI>(`/api/patients/${userId}`);
                const numeIntreg = `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim();

                setNumeComplet(numeIntreg);
                setEmail(data.email ?? "");
                setTelefon(data.phone ?? "");
                setDataNasterii(data.dateOfBirth?.split("T")[0] ?? "");
                setSex(data.sex ?? "");

                setNumeCompletTemp(numeIntreg);
                setEmailTemp(data.email ?? "");
                setTelefonTemp(data.phone ?? "");
                setDataNasteriiTemp(data.dateOfBirth?.split("T")[0] ?? "");
                setSexTemp(data.sex ?? "");
            } catch (err) {
                console.error("Eroare la încărcarea profilului:", err);
            } finally {
                setLoadingProfile(false);
            }
        };
        fetchPatient();
    }, [userId]);

    // Programări din API după email
    const [programari, setProgramari] = useState<Programare[]>([]);
    const [loadingProgramari, setLoadingProgramari] = useState(true);

    useEffect(() => {
        if (!userEmail) return;
        const fetchProgramari = async () => {
            try {
                const data = await api.get<AppointmentAPI[]>(`/api/appointment/byEmail/${userEmail}`);
                const mapped: Programare[] = data.map((a, index) => {
                    const initials = a.doctorName
                        .split(" ")
                        .filter((w) => w !== "Dr." && w !== "dr.")
                        .map((w) => w[0])
                        .join("")
                        .substring(0, 2)
                        .toUpperCase();
                    return {
                        id: index + 1,
                        doctor: a.doctorName,
                        specialty: a.serviceName,
                        date: a.appointmentDate,
                        time: a.appointmentTime,
                        status: mapStatus(a.status),
                        initials,
                    };
                });
                setProgramari(mapped);
            } catch (err) {
                console.error("Eroare la încărcarea programărilor:", err);
            } finally {
                setLoadingProgramari(false);
            }
        };
        fetchProgramari();
    }, [userEmail]);

    const mapStatus = (status?: string): string => {
        if (!status) return "in asteptare";
        const s = status.toLowerCase();
        if (s === "confirmed" || s === "confirmat") return "confirmat";
        if (s === "completed" || s === "finalizat") return "finalizat";
        return "in asteptare";
    };

    // Analize (statice)
    const analize = [
        { id: 1, name: "Hemoleucograma completa", date: "10 Ianuarie 2026", status: "disponibil", doctor: "Dr. Tatiana Cobzac" },
        { id: 2, name: "Profil lipidic",          date: "10 Ianuarie 2026", status: "disponibil", doctor: "Dr. Vasile Munteanu" },
        { id: 3, name: "Glicemie a jeun",         date: "05 Decembrie 2025", status: "disponibil", doctor: "Dr. Tatiana Cobzac" },
    ];

    const formatData = (data: string) => {
        if (!data) return "";
        const [an, luna, zi] = data.split("-");
        return `${zi}-${luna}-${an}`;
    };

    // Salvare profil
    const [showSuccessMsg, setShowSuccessMsg] = useState(false);

    const salveazaModificarile = async () => {
        try {
            const [fn, ...rest] = numeCompletTemp.split(" ");
            await api.put<void>(`/api/patients/Update/${userId}`, {
                firstName: fn,
                lastName: rest.join(" "),
                email: emailTemp,
                phone: telefonTemp,
                dateOfBirth: dataNasteriiTemp,
                sex: sexTemp,
            });
            setNumeComplet(numeCompletTemp);
            setEmail(emailTemp);
            setTelefon(telefonTemp);
            setDataNasterii(dataNasteriiTemp);
            setSex(sexTemp);
            setShowSuccessMsg(true);
            setTimeout(() => setShowSuccessMsg(false), 3000);
        } catch (err) {
            console.error("Eroare la salvare:", err);
        }
    };

    // Modal anulare
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [programareDeAnulat, setProgramareDeAnulat] = useState<number | null>(null);

    // Status helpers
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

    const getInitials = (name: string) =>
        name.split(" ").map((w) => w[0]).join("").substring(0, 2).toUpperCase();

    const urmatoarea = programari
        .filter((p) => parseDate(p.date) >= new Date())
        .sort((a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime())[0];

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
                            <button className="modal-btn-confirm" onClick={() => {
                                setProgramari(programari.filter(p => p.id !== programareDeAnulat));
                                setShowCancelModal(false);
                                setProgramareDeAnulat(null);
                            }}>{t.profCancelYes}</button>
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
                            {t.profWelcome}, <span className="hero-highlight">{numeComplet || "..."}</span>
                        </h1>
                        <p className="profile-hero-subtitle">{t.profSubtitle}</p>

                        {urmatoarea ? (
                            <div className="hero-next-appointment">
                                <div className="hero-appointment-label">{t.profNextAppt}</div>
                                <div className="hero-appointment-details">
                                    <div className="hero-appointment-doctor">
                                        <div className="hero-doctor-avatar">{urmatoarea.initials}</div>
                                        <div>
                                            <p className="hero-doctor-name">{urmatoarea.doctor}</p>
                                            <p className="hero-doctor-specialty">{translateSpecialization(urmatoarea.specialty, language)}</p>
                                        </div>
                                    </div>
                                    <div className="hero-appointment-time">
                                        <p className="hero-appointment-date">{formatDateDisplay(urmatoarea.date, language)}</p>
                                        <p className="hero-appointment-hour">{t.profHour} {urmatoarea.time}</p>
                                    </div>
                                </div>
                            </div>
                        ) : !loadingProgramari && (
                            <div className="hero-next-appointment">
                                <div className="hero-appointment-label">{t.profNextAppt}</div>
                                <p style={{ color: "#fff", marginTop: "8px" }}>—</p>
                            </div>
                        )}
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
                            <div className="profile-avatar">{getInitials(numeComplet)}</div>
                            <h2 className="profile-name">{numeComplet}</h2>
                            <p className="profile-role">{t.profPatient}</p>
                            <div className="profile-badge-verified">{t.profVerified}</div>
                        </div>

                        <div className="sidebar-card info-card">
                            <h3 className="sidebar-card-title">{t.profPersonalData}</h3>
                            {loadingProfile ? (
                                <p style={{ padding: "8px", opacity: 0.6 }}>Se încarcă...</p>
                            ) : (
                                <ul className="info-list">
                                    <li className="info-item"><span className="info-label">{t.profNameLabel}</span><span>{numeComplet}</span></li>
                                    <li className="info-item"><span className="info-label">{t.profEmailLabel}</span><span>{email}</span></li>
                                    <li className="info-item"><span className="info-label">{t.profPhoneLabel}</span><span>{telefon}</span></li>
                                    <li className="info-item"><span className="info-label">{t.profBornLabel}</span><span>{formatData(dataNasterii)}</span></li>
                                    <li className="info-item"><span className="info-label">Sex:</span><span>{sex}</span></li>
                                </ul>
                            )}
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
                                {loadingProgramari ? (
                                    <p style={{ padding: "16px", opacity: 0.6 }}>Se încarcă programările...</p>
                                ) : programari.length === 0 ? (
                                    <p style={{ padding: "16px", opacity: 0.6 }}>Nu ai programări.</p>
                                ) : (
                                    <div className="appointments-list">
                                        {programari.map((p) => (
                                            <div key={p.id} className="appointment-card">
                                                <div className="appointment-left">
                                                    <div className="doctor-avatar-sm">{p.initials}</div>
                                                    <div className="appointment-info">
                                                        <h3 className="appointment-doctor">{p.doctor}</h3>
                                                        <p className="appointment-specialty">{translateSpecialization(p.specialty, language)}</p>
                                                    </div>
                                                </div>
                                                <div className="appointment-center">
                                                    <div className="appointment-date"><span>{t.profDateLabel} {formatDateDisplay(p.date, language)}</span></div>
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
                                )}
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
                                        <div className="form-group"><label className="form-label">Sex</label><input className="form-input" type="text" value={sexTemp} onChange={(e) => setSexTemp(e.target.value)} /></div>
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
