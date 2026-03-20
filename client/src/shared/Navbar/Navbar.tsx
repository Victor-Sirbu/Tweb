import "./Navbar.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import { useNotifications } from "../../context/NotificationContext";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(true);
    const [lastScroll, setLastScroll] = useState<number>(0);
    const [profileMenuOpen, setProfileMenuOpen] = useState<boolean>(false);
    const [langMenuOpen, setLangMenuOpen] = useState<boolean>(false);
    const profileRef = useRef<HTMLDivElement>(null);
    const langRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout, isAuthenticated } = useAuth();
    const { language, setLanguage, t } = useLanguage();
    const { unreadCount } = useNotifications();

    const langLabels = { ro: "RO", ru: "RU", en: "EN" };

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace("#", "");
            setTimeout(() => {
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        }
    }, [location]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            setVisible(currentScroll < lastScroll || currentScroll < 10);
            setLastScroll(currentScroll);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScroll]);


    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(e.target as Node))
                setProfileMenuOpen(false);
            if (langRef.current && !langRef.current.contains(e.target as Node))
                setLangMenuOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const scrollToSection = (id: string) => {
        if (location.pathname === "/") {
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        } else {
            navigate(`/#${id}`);
        }
    };

    const handleLogout = () => {
        logout();
        setProfileMenuOpen(false);
        navigate("/");
    };

    return (
        <nav className="navbar" style={{
            transform: visible ? "translateY(0)" : "translateY(-100%)",
            transition: "transform 0.4s ease"
        }}>
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

                <ul className={`navbar-menu ${menuOpen ? "active" : ""}`}>
                    <li><Link to="/">{t.home}</Link></li>
                    <li><Link to="/services">{t.services}</Link></li>
                    <li><a onClick={() => scrollToSection("echipa")} style={{ cursor: "pointer" }}>{t.doctors}</a></li>
                    <li><a onClick={() => scrollToSection("testimoniale")} style={{ cursor: "pointer" }}>{t.reviews}</a></li>
                    <li><Link to="/news">{t.navNews}</Link></li>
                    <li><Link to="/help">{t.navHelp}</Link></li>
                    <li><Link to="/contact">{t.contact}</Link></li>
                </ul>

                <div className="navbar-actions">


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

                    {/* Notification bell */}
                    {isAuthenticated && (
                        <button
                            className="notification-bell-btn"
                            onClick={() => navigate("/notifications")}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                            </svg>
                            {unreadCount > 0 && <span className="notification-count">{unreadCount}</span>}
                        </button>
                    )}

                    {/* Auth section */}
                    {isAuthenticated ? (
                        <div className="profile-wrapper" ref={profileRef}>
                            <button
                                className="profile-avatar-btn"
                                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                            >
                                {user?.photo ? (
                                    <img src={user.photo} alt="avatar" className="avatar-img" />
                                ) : (
                                    <div className="avatar-initials">
                                        {user?.name?.charAt(0).toUpperCase() ?? "U"}
                                    </div>
                                )}
                            </button>

                            {profileMenuOpen && (
                                <div className="profile-dropdown">
                                    <div className="profile-dropdown-header">
                                        <strong>{user?.name}</strong>
                                        <span>{user?.email}</span>
                                    </div>
                                    <div className="profile-dropdown-divider" />
                                    <button onClick={() => { navigate("/profile"); setProfileMenuOpen(false); }}>
                                        {t.profile}
                                    </button>
                                    <button onClick={handleLogout} className="signout-btn">
                                        {t.signOut}
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button className="navbar-btn" onClick={() => navigate("/login")}>
                            {t.signIn}
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
