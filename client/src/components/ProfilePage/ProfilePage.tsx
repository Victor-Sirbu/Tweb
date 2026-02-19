import "./ProfilePage.css";
import { useState } from "react";

const ProfilePage = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("programari");

    const [numeComplet, setNumeComplet] = useState("Ion Popescu");
    const [email, setEmail] = useState("ion.popescu@email.com");
    const [telefon, setTelefon] = useState("+373 69 123 456");
    const [dataNasterii, setDataNasterii] = useState("15-03-1985");
    const [oras, setOras] = useState("Chisinau, Moldova");

    const [numeCompletTemp, setNumeCompletTemp] = useState("Ion Popescu");
    const [emailTemp, setEmailTemp] = useState("ion.popescu@email.com");
    const [telefonTemp, setTelefonTemp] = useState("+373 69 123 456");
    const [dataNasteriiTemp, setDataNasteriiTemp] = useState("1985-03-15");
    const [orasTemp, setOrasTemp] = useState("Chisinau, Moldova");

    const salveazaModificarile = () => {
        setNumeComplet(numeCompletTemp);
        setEmail(emailTemp);
        setTelefon(telefonTemp);
        setDataNasterii(dataNasteriiTemp);
        setOras(orasTemp);
    };

    const programari = [
        {
            id: 1,
            doctor: "Dr. Tatiana Cobzac",
            specialty: "Medicina Interna",
            date: "25 Februarie 2026",
            time: "10:30",
            status: "confirmat",
            initials: "TC"
        },
        {
            id: 2,
            doctor: "Dr. Vasile Munteanu",
            specialty: "Cardiologie",
            date: "10 Martie 2026",
            time: "14:00",
            status: "in asteptare",
            initials: "VM"
        },
        {
            id: 3,
            doctor: "Dr. Andrei Leahu",
            specialty: "Ortopedie",
            date: "15 Ianuarie 2026",
            time: "09:00",
            status: "finalizat",
            initials: "AL"
        }
    ];

    const analize = [
        {
            id: 1,
            name: "Hemoleucograma completa",
            date: "10 Ianuarie 2026",
            status: "disponibil",
            doctor: "Dr. Tatiana Cobzac"
        },
        {
            id: 2,
            name: "Profil lipidic",
            date: "10 Ianuarie 2026",
            status: "disponibil",
            doctor: "Dr. Vasile Munteanu"
        },
        {
            id: 3,
            name: "Glicemie a jeun",
            date: "05 Decembrie 2025",
            status: "disponibil",
            doctor: "Dr. Tatiana Cobzac"
        }
    ];

    const getStatusClass = (status: string) => {
        switch (status) {
            case "confirmat": return "status-confirmed";
            case "in asteptare": return "status-pending";
            case "finalizat": return "status-done";
            case "disponibil": return "status-available";
            default: return "";
        }
    };

    return (
        <div className="profile-page">

            <nav className="navbar">
                <div className="navbar-container">
                    <div className="navbar-logo">
                        <div className="logo-text">
                            <span className="logo-title">MediCare</span>
                            <span className="logo-subtitle">Cabinet Medical</span>
                        </div>
                    </div>

                    <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                        ☰
                    </button>

                    <ul className={`navbar-menu ${menuOpen ? "active" : ""}`}>
                        <li><a href="/">Acasa</a></li>
                        <li><a href="/#servicii">Servicii</a></li>
                        <li><a href="/#echipa">Echipa</a></li>
                        <li><a href="/#testimoniale">Testimoniale</a></li>
                        <li><a href="/#contact">Contact</a></li>
                    </ul>

                    <div className="navbar-actions">
                        <a href="tel:+37322123456" className="navbar-phone">+373 22 123 456</a>
                        <button className="navbar-btn">Programare</button>
                    </div>
                </div>
            </nav>

            <section className="profile-hero">
                <div className="profile-hero-container">
                    <div className="profile-hero-badge">Contul Meu</div>
                    <h1 className="profile-hero-title">
                        Bine ai revenit, <span className="hero-highlight">{numeComplet}</span>
                    </h1>
                    <p className="profile-hero-subtitle">
                        Gestioneaza programarile, analizele si datele tale medicale intr-un singur loc.
                    </p>
                </div>
            </section>

            <div className="profile-main">
                <div className="profile-layout">

                    <aside className="profile-sidebar">
                        <div className="sidebar-card avatar-card">
                            <div className="profile-avatar">IP</div>
                            <h2 className="profile-name">{numeComplet}</h2>
                            <p className="profile-role">Pacient</p>
                            <div className="profile-badge-verified">✓ Cont Verificat</div>
                        </div>

                        <div className="sidebar-card info-card">
                            <h3 className="sidebar-card-title">Date Personale</h3>
                            <ul className="info-list">
                                <li className="info-item">
                                    <span className="info-label">Nume:</span>
                                    <span>{numeComplet}</span>
                                </li>
                                <li className="info-item">
                                    <span className="info-label">Email:</span>
                                    <span>{email}</span>
                                </li>
                                <li className="info-item">
                                    <span className="info-label">Telefon:</span>
                                    <span>{telefon}</span>
                                </li>
                                <li className="info-item">
                                    <span className="info-label">Nascut:</span>
                                    <span>{dataNasterii.split("-").reverse().join("-")}</span>
                                </li>
                                <li className="info-item">
                                    <span className="info-label">Oras:</span>
                                    <span>{oras}</span>
                                </li>
                            </ul>
                        </div>

                        <div className="sidebar-card stats-card">
                            <h3 className="sidebar-card-title">Statistici</h3>
                            <div className="stats-grid">
                                <div className="stat-box">
                                    <span className="stat-number">7</span>
                                    <span className="stat-label">Programari</span>
                                </div>
                                <div className="stat-box">
                                    <span className="stat-number">12</span>
                                    <span className="stat-label">Analize</span>
                                </div>
                                <div className="stat-box">
                                    <span className="stat-number">3</span>
                                    <span className="stat-label">Doctori</span>
                                </div>
                                <div className="stat-box">
                                    <span className="stat-number">2</span>
                                    <span className="stat-label">Ani Pacient</span>
                                </div>
                            </div>
                        </div>
                    </aside>

                    <main className="profile-content">
                        <div className="tabs-container">
                            <button
                                className={`tab-btn ${activeTab === "programari" ? "tab-active" : ""}`}
                                onClick={() => setActiveTab("programari")}
                            >
                                Programarile Mele
                            </button>
                            <button
                                className={`tab-btn ${activeTab === "analize" ? "tab-active" : ""}`}
                                onClick={() => setActiveTab("analize")}
                            >
                                Analize & Rezultate
                            </button>
                            <button
                                className={`tab-btn ${activeTab === "setari" ? "tab-active" : ""}`}
                                onClick={() => setActiveTab("setari")}
                            >
                                Setari Cont
                            </button>
                        </div>

                        {activeTab === "programari" && (
                            <div className="tab-content">
                                <div className="content-header">
                                    <h2 className="content-title">Programarile Mele</h2>
                                    <button className="navbar-btn">+ Programare Noua</button>
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
                                                <div className="appointment-date">
                                                    <span>Data: {p.date}</span>
                                                </div>
                                                <div className="appointment-time">
                                                    <span>Ora: {p.time}</span>
                                                </div>
                                            </div>
                                            <div className="appointment-right">
                                                <span className={`status-badge ${getStatusClass(p.status)}`}>
                                                    {p.status}
                                                </span>
                                                {p.status !== "finalizat" && (
                                                    <button className="cancel-btn">Anuleaza</button>
                                                )}
                                                {p.status === "finalizat" && (
                                                    <button className="service-btn">Reprogrameaza</button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === "analize" && (
                            <div className="tab-content">
                                <div className="content-header">
                                    <h2 className="content-title">Analize & Rezultate</h2>
                                </div>
                                <div className="analize-list">
                                    {analize.map((a) => (
                                        <div key={a.id} className="analiza-card">
                                            <div className="analiza-info">
                                                <h3 className="analiza-name">{a.name}</h3>
                                                <p className="analiza-doctor">{a.doctor}</p>
                                                <p className="analiza-date">{a.date}</p>
                                            </div>
                                            <div className="analiza-right">
                                                <span className={`status-badge ${getStatusClass(a.status)}`}>
                                                    {a.status}
                                                </span>
                                                <button className="navbar-btn">Descarca PDF</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === "setari" && (
                            <div className="tab-content">
                                <div className="content-header">
                                    <h2 className="content-title">Setari Cont</h2>
                                </div>
                                <div className="settings-grid">

                                    <div className="settings-card">
                                        <h3 className="settings-card-title">Date Personale</h3>
                                        <div className="form-group">
                                            <label className="form-label">Nume complet</label>
                                            <input
                                                className="form-input"
                                                type="text"
                                                value={numeCompletTemp}
                                                onChange={(e) => setNumeCompletTemp(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Email</label>
                                            <input
                                                className="form-input"
                                                type="email"
                                                value={emailTemp}
                                                onChange={(e) => setEmailTemp(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Telefon</label>
                                            <input
                                                className="form-input"
                                                type="tel"
                                                value={telefonTemp}
                                                onChange={(e) => setTelefonTemp(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Data nasterii</label>
                                            <input
                                                className="form-input"
                                                type="date"
                                                value={dataNasteriiTemp}
                                                onChange={(e) => setDataNasteriiTemp(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Oras</label>
                                            <input
                                                className="form-input"
                                                type="text"
                                                value={orasTemp}
                                                onChange={(e) => setOrasTemp(e.target.value)}
                                            />
                                        </div>
                                        <button className="outline-btn" onClick={salveazaModificarile}>
                                            Salveaza Modificarile
                                        </button>
                                    </div>

                                    <div className="settings-card security-card">
                                        <h3 className="settings-card-title">Securitate</h3>
                                        <div className="form-group">
                                            <label className="form-label">Parola curenta</label>
                                            <input className="form-input" type="password" placeholder="••••••••" />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Parola noua</label>
                                            <input className="form-input" type="password" placeholder="••••••••" />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Confirma parola noua</label>
                                            <input className="form-input" type="password" placeholder="••••••••" />
                                        </div>
                                        <button className="outline-btn">Schimba Parola</button>
                                    </div>

                                    <div className="settings-card full-width">
                                        <h3 className="settings-card-title">Notificari</h3>
                                        <div className="notification-options">
                                            {[
                                                { label: "Reminder programari (SMS)", defaultChecked: true },
                                                { label: "Reminder programari (Email)", defaultChecked: true },
                                                { label: "Rezultate analize disponibile", defaultChecked: true },
                                                { label: "Oferte si noutati MediCare", defaultChecked: false }
                                            ].map((opt, i) => (
                                                <label key={i} className="toggle-label">
                                                    <span>{opt.label}</span>
                                                    <input type="checkbox" defaultChecked={opt.defaultChecked} className="toggle-input" />
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

            <footer className="profile-footer">
                <div className="footer-inner">
                    <p>© 2026 MediCare Cabinet Medical. Toate drepturile rezervate.</p>
                    <div className="footer-links">
                        <a href="#">Politica Confidentialitate</a>
                        <a href="#">Termeni si Conditii</a>
                        <a href="#">GDPR</a>
                    </div>
                </div>
            </footer>

        </div>
    );
};

export default ProfilePage;
