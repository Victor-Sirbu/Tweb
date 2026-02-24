import "./AdminNavbar.css";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AdminNavbar = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(true);
    const [lastScroll, setLastScroll] = useState<number>(0);
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

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

    return (
        <nav className="admin-navbar" style={{
            transform: visible ? "translateY(0)" : "translateY(-100%)",
            transition: "transform 0.4s ease"
        }}>
            <div className="admin-navbar-container">
                <div className="admin-navbar-logo" onClick={() => navigate("/")}>
                    <div className="logo-text">
                        <span className="logo-title">MediCare</span>
                        <span className="logo-subtitle">Panou Administrator</span>
                    </div>
                </div>

                <button className="admin-menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                    ☰
                </button>

                <ul className={`admin-navbar-menu ${menuOpen ? 'active' : ''}`}>
                    <li>
                        <a href="/admin/dashboard" className={isActive("/admin/dashboard") ? "admin-nav-active" : ""}>
                            Dashboard
                        </a>
                    </li>
                    <li>
                        <a href="/activity" className={isActive("/activity") ? "admin-nav-active" : ""}>
                            Audit & Activitate
                        </a>
                    </li>
                </ul>

                <div className="admin-navbar-actions">
                    <div className="admin-role-badge">Super Admin</div>
                    <button className="admin-navbar-btn" onClick={() => navigate("/")}>
                        Iesi din Admin
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default AdminNavbar;