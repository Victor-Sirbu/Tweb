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

        </div>
    );
};

export default ProfilePage;