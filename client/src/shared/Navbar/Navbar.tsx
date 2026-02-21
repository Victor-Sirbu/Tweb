import "./Navbar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo" onClick={() => navigate("/")}>
                    <div className="logo-text">
                        <span className="logo-title">MediCare</span>
                        <span className="logo-subtitle">Cabinet Medical</span>
                    </div>
                </div>

                <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                    ☰
                </button>

                <ul className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
                    <li><a href="/">Acasă</a></li>
                    <li><a href="/services">Servicii</a></li>
                    <li><a href="#echipa">Medici</a></li>
                    <li><a href="/profile">Profilul Meu</a></li>
                    <li><a href="#testimoniale">Recenzii</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>

                <div className="navbar-actions">
                    <a href="tel:+37322123456" className="navbar-phone">+373 22 123 456</a>
                    <button className="navbar-btn">Programare</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
