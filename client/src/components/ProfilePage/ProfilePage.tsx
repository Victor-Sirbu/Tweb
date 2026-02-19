import "./ProfilePage.css";
import { useState } from "react";

const ProfilePage = () => {
    const [menuOpen, setMenuOpen] = useState(false);

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
                        <li><a href="/">Acasă</a></li>
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
                        Bine ai revenit, <span className="hero-highlight">Ion Popescu</span>
                    </h1>
                    <p className="profile-hero-subtitle">
                        Gestionează programările, analizele și datele tale medicale într-un singur loc.
                    </p>
                </div>
            </section>
            <div className="profile-main">
                <div className="profile-layout">

                    <aside className="profile-sidebar">
                        <div className="sidebar-card avatar-card">
                            <div className="profile-avatar">IP</div>
                            <h2 className="profile-name">Ion Popescu</h2>
                            <p className="profile-role">Pacient</p>
                            <div className="profile-badge-verified">✓ Cont Verificat</div>
                        </div>

                        <div className="sidebar-card info-card">
                            <h3 className="sidebar-card-title">Date Personale</h3>
                            <ul className="info-list">
                                <li className="info-item">
                                    <span className="info-label">Email:</span>
                                    <span>ion.popescu@email.com</span>
                                </li>
                                <li className="info-item">
                                    <span className="info-label">Telefon:</span>
                                    <span>+373 69 123 456</span>
                                </li>
                                <li className="info-item">
                                    <span className="info-label">Născut:</span>
                                    <span>15 Martie 1985</span>
                                </li>
                                <li className="info-item">
                                    <span className="info-label">Oraș:</span>
                                    <span>Chișinău, Moldova</span>
                                </li>
                            </ul>
                            <button className="edit-btn">Editează Profilul</button>
                        </div>

                        <div className="sidebar-card stats-card">
                            <h3 className="sidebar-card-title">Statistici</h3>
                            <div className="stats-grid">
                                <div className="stat-box">
                                    <span className="stat-number">7</span>
                                    <span className="stat-label">Programări</span>
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
                    </main>

                </div>
            </div>
        </div>
    );
};

export default ProfilePage;