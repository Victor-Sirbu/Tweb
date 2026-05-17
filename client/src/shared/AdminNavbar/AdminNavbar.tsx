import "./AdminNavbar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect, useRef } from "react";

const AdminNavbar = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [menuClosing, setMenuClosing] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(true);
    const [lastScroll, setLastScroll] = useState<number>(0);
    const navigate = useNavigate();
    const [langMenuOpen, setLangMenuOpen] = useState<boolean>(false);
    const langRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLUListElement>(null);
    const langLabels = { ro: "RO", ru: "RU", en: "EN" };
    const location = useLocation();
    const { t, language, setLanguage } = useLanguage();
    const { logout } = useAuth();

    const isActive = (path: string) => location.pathname === path;

    const closeMenu = () => {
        setMenuClosing(true);
        setTimeout(() => {
            setMenuOpen(false);
            setMenuClosing(false);
        }, 300);
    };

    const handleMenuLinkClick = (callback: () => void) => {
        if (menuOpen) {
            closeMenu();
            setTimeout(callback, 300);
        } else {
            callback();
        }
    };

    const handleExit = () => {
        logout();
        navigate("/login");
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            if (currentScroll < lastScroll || currentScroll < 10) {
                setVisible(true);
            } else {
                setVisible(false);
            }
            setLastScroll(currentScroll);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScroll]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent | TouchEvent) => {
            if (langRef.current && !langRef.current.contains(e.target as Node))
                setLangMenuOpen(false);

            if (menuOpen && menuRef.current && !menuRef.current.contains(e.target as Node)) {
                const target = e.target as HTMLElement;
                if (!target.closest('.admin-menu-toggle')) {
                    closeMenu();
                }
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [menuOpen, closeMenu]);

    return (
        <nav className="admin-navbar" style={{
            transform: visible ? "translateY(0)" : "translateY(-100%)",
            transition: "transform 0.4s ease"
        }}>
            <div className="admin-navbar-container">
                <div className="admin-navbar-logo" onClick={() => navigate("/admin")}>
                    <div className="logo-text">
                        <span className="logo-title">MediCare</span>
                        <span className="logo-subtitle">{t.adminNavPanel}</span>
                    </div>
                </div>

                <button className="admin-menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                    ☰
                </button>

                <ul ref={menuRef} className={`admin-navbar-menu ${menuOpen ? 'active' : ''} ${menuClosing ? 'closing' : ''}`}>
                    <li>
                        <a className={isActive("/admin") ? "admin-nav-active" : ""} onClick={() => handleMenuLinkClick(() => navigate("/admin"))}>
                            {t.adminNavDashboard}
                        </a>
                    </li>
                    <li>
                        <a className={isActive("/activity") ? "admin-nav-active" : ""} onClick={() => handleMenuLinkClick(() => navigate("/activity"))}>
                            {t.adminNavAudit}
                        </a>
                    </li>
                    <li className="admin-mobile-extras">
                        <div className="admin-mobile-lang">
                            {(["ro", "ru", "en"] as const).map((lang) => (
                                <button
                                    key={lang}
                                    className={`admin-lang-btn ${language === lang ? "admin-lang-active" : ""}`}
                                    onClick={() => setLanguage(lang)}
                                >
                                    {langLabels[lang]}
                                </button>
                            ))}
                        </div>
                        <button className="admin-mobile-logout-btn" onClick={() => handleMenuLinkClick(handleExit)}>
                            {t.adminNavExitAdmin}
                        </button>
                    </li>
                </ul>

                <div className="admin-navbar-actions">
                    <div className="lang-selector" ref={langRef}>
                        <button className="lang-btn" onClick={() => setLangMenuOpen(!langMenuOpen)}>
                            {langLabels[language]} <span className="lang-arrow">▾</span>
                        </button>
                        {langMenuOpen && (
                            <div className="lang-dropdown">
                                {(["ro", "ru", "en"] as const).map((lang) => (
                                    <button
                                        key={lang}
                                        className={`lang-option ${language === lang ? "active" : ""}`}
                                        onClick={() => { setLanguage(lang); setLangMenuOpen(false); }}
                                    >
                                        {langLabels[lang]}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <button className="admin-navbar-btn" onClick={handleExit}>
                        {t.adminNavExitAdmin}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default AdminNavbar;
