import "./Navbar.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import { useNotifications } from "../../context/NotificationContext";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [menuClosing, setMenuClosing] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(true);
    const [lastScroll, setLastScroll] = useState<number>(0);
    const [profileMenuOpen, setProfileMenuOpen] = useState<boolean>(false);
    const [langMenuOpen, setLangMenuOpen] = useState<boolean>(false);
    const profileRef = useRef<HTMLDivElement>(null);
    const langRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout, isAuthenticated } = useAuth();
    const { language, setLanguage, t } = useLanguage();
    const { unreadCount } = useNotifications();

    const langLabels = { ro: "RO", ru: "RU", en: "EN" };

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
        const handleClickOutside = (e: MouseEvent | TouchEvent) => {
            if (profileRef.current && !profileRef.current.contains(e.target as Node))
                setProfileMenuOpen(false);
            if (langRef.current && !langRef.current.contains(e.target as Node))
                setLangMenuOpen(false);

            if (menuOpen && menuRef.current && !menuRef.current.contains(e.target as Node)) {
                const target = e.target as HTMLElement;
                if (!target.closest('.menu-toggle')) {
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

                <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                </button>

                {/* Desktop menu - only navigation links */}
                <ul className="navbar-menu-desktop">
                    <li><Link to="/">{t.home}</Link></li>
                    <li><Link to="/services">{t.services}</Link></li>
                    <li><a onClick={() => scrollToSection("echipa")} style={{ cursor: "pointer" }}>{t.doctors}</a></li>
                    <li><a onClick={() => scrollToSection("testimoniale")} style={{ cursor: "pointer" }}>{t.reviews}</a></li>
                    <li><Link to="/news">{t.navNews}</Link></li>
                    <li><Link to="/help">{t.navHelp}</Link></li>
                    <li><Link to="/contact">{t.contact}</Link></li>
                </ul>

                {/* Desktop actions */}
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

                {/* Mobile overlay menu */}
                {menuOpen && <div className="mobile-menu-overlay" onClick={closeMenu}></div>}

                <div ref={menuRef} className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""} ${menuClosing ? "mobile-menu--closing" : ""}`}>
                    <div className="mobile-menu-header">
                        <div className="mobile-menu-logo">
                            <span className="logo-title">MediCare</span>
                            <span className="logo-subtitle">Cabinet Medical</span>
                        </div>
                        <button className="mobile-menu-close" onClick={closeMenu} aria-label="Close menu">×</button>
                    </div>

                    {/* Mobile menu user section */}
                    {isAuthenticated && (
                        <div className="mobile-menu-user">
                            <div className="mobile-user-avatar">
                                {user?.photo ? (
                                    <img src={user.photo} alt="avatar" />
                                ) : (
                                    <div className="avatar-initials-mobile">
                                        {user?.name?.charAt(0).toUpperCase() ?? "U"}
                                    </div>
                                )}
                            </div>
                            <div className="mobile-user-info">
                                <strong>{user?.name}</strong>
                                <span>{user?.email}</span>
                            </div>
                        </div>
                    )}

                    {/* Mobile menu navigation */}
                    <nav className="mobile-menu-nav">
                        <Link to="/" onClick={() => handleMenuLinkClick(() => navigate("/"))}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            </svg>
                            {t.home}
                        </Link>
                        <Link to="/services" onClick={() => handleMenuLinkClick(() => navigate("/services"))}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                                <path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path>
                            </svg>
                            {t.services}
                        </Link>
                        <a onClick={() => handleMenuLinkClick(() => scrollToSection("echipa"))}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                            {t.doctors}
                        </a>
                        <a onClick={() => handleMenuLinkClick(() => scrollToSection("testimoniale"))}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                            {t.reviews}
                        </a>
                        <Link to="/news" onClick={() => handleMenuLinkClick(() => navigate("/news"))}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                            </svg>
                            {t.navNews}
                        </Link>
                        <Link to="/help" onClick={() => handleMenuLinkClick(() => navigate("/help"))}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                            </svg>
                            {t.navHelp}
                        </Link>
                        <Link to="/contact" onClick={() => handleMenuLinkClick(() => navigate("/contact"))}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                            {t.contact}
                        </Link>

                        {isAuthenticated && (
                            <>
                                <div className="mobile-menu-divider"></div>
                                <Link to="/profile" onClick={() => handleMenuLinkClick(() => navigate("/profile"))}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                    {t.profile}
                                </Link>
                                <Link to="/notifications" onClick={() => handleMenuLinkClick(() => navigate("/notifications"))}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                                        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                                    </svg>
                                    {t.notifTitle}
                                    {unreadCount > 0 && <span className="mobile-notif-badge">{unreadCount}</span>}
                                </Link>
                            </>
                        )}
                    </nav>

                    {/* Mobile menu footer */}
                    <div className="mobile-menu-footer">
                        <div className="mobile-lang-selector">
                            <span className="mobile-lang-label">{t.adminLanguage}:</span>
                            <div className="mobile-lang-buttons">
                                {(["ro", "ru", "en"] as const).map((lang) => (
                                    <button
                                        key={lang}
                                        className={`mobile-lang-btn ${language === lang ? "mobile-lang-btn--active" : ""}`}
                                        onClick={() => setLanguage(lang)}
                                    >
                                        {langLabels[lang]}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {isAuthenticated ? (
                            <button className="mobile-logout-btn" onClick={() => handleMenuLinkClick(handleLogout)}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                    <polyline points="16 17 21 12 16 7"></polyline>
                                    <line x1="21" y1="12" x2="9" y2="12"></line>
                                </svg>
                                {t.signOut}
                            </button>
                        ) : (
                            <button className="mobile-login-btn" onClick={() => handleMenuLinkClick(() => navigate("/login"))}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                                    <polyline points="10 17 15 12 10 7"></polyline>
                                    <line x1="15" y1="12" x2="3" y2="12"></line>
                                </svg>
                                {t.signIn}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
