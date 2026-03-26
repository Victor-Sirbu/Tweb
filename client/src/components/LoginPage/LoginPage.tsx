import "./LoginPage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";

const TEST_EMAIL = "admin@gmail.com";
const TEST_PASSWORD = "admin";

const AUDIT_EMAIL = "audit@gmail.com";
const AUDIT_PASSWORD = "audit";

const LoginPage = () => {
    const [activeTab, setActiveTab] = useState<"existing" | "new">("existing");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [birthDay, setBirthDay] = useState("");
    const [birthMonth, setBirthMonth] = useState("");
    const [birthYear, setBirthYear] = useState("");
    const [dateError, setDateError] = useState("");
    const [selectedGender, setSelectedGender] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [newPatientPassword, setNewPatientPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const { t } = useLanguage();
    const navigate = useNavigate();

    const currentYear = new Date().getFullYear();
    const genderOptions = [t.male, t.female];
    const isExistingPatient = activeTab === "existing";

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (loginEmail === TEST_EMAIL && loginPassword === TEST_PASSWORD) {
            login({ name: "Admin", email: TEST_EMAIL });
            navigate("/");
        } else if (loginEmail === AUDIT_EMAIL && loginPassword === AUDIT_PASSWORD) {
            login({ name: "Audit Admin", email: AUDIT_EMAIL });
            navigate("/activity");
        } else {
            setLoginError("Email sau parolă incorectă.");
        }
    };

    const validateDate = (day: string, month: string, year: string) => {
        const dayNum = parseInt(day);
        const monthNum = parseInt(month);
        const yearNum = parseInt(year);
        if (day && (dayNum < 1 || dayNum > 31)) { setDateError("Ziua trebuie să fie între 1 și 31"); return false; }
        if (month && (monthNum < 1 || monthNum > 12)) { setDateError("Luna trebuie să fie între 1 și 12"); return false; }
        if (year && (yearNum < 1900 || yearNum > currentYear)) { setDateError(`Anul trebuie să fie între 1900 și ${currentYear}`); return false; }
        setDateError(""); return true;
    };

    return (
        <div className="page">
            <div className="card">

                <div className={`right ${!isExistingPatient ? 'scroll-enabled' : ''}`}>
                    <div className="login-header">
                        <h2>{isExistingPatient ? t.loginTitle : t.registerTitle}</h2>
                    </div>

                    <div className="patient-tabs">
                        <button
                            className={`tab-btn ${activeTab === "existing" ? "active" : ""}`}
                            onClick={() => setActiveTab("existing")}
                        >
                            {t.existingPatient}
                        </button>
                        <button
                            className={`tab-btn ${activeTab === "new" ? "active" : ""}`}
                            onClick={() => setActiveTab("new")}
                        >
                            {t.newPatient}
                        </button>
                    </div>

                    {isExistingPatient ? (
                        <>
                            <form className="form" onSubmit={handleLogin}>
                                <div className="field">
                                    <label>{t.emailLabel}</label>
                                    <input
                                        type="email"
                                        placeholder="exemplu@email.com"
                                        value={loginEmail}
                                        onChange={(e) => { setLoginEmail(e.target.value); setLoginError(""); }}
                                        required
                                    />
                                </div>

                                <div className="field">
                                    <label>{t.password}</label>
                                    <input
                                        type="password"
                                        placeholder="********"
                                        value={loginPassword}
                                        onChange={(e) => { setLoginPassword(e.target.value); setLoginError(""); }}
                                        required
                                    />
                                    <a href="#" className="reset">{t.resetPassword}</a>
                                </div>

                                {loginError && <span className="error-message">{loginError}</span>}

                                <button type="submit" className="login-btn">{t.loginBtn}</button>
                            </form>
                        </>
                    ) : (
                        <form className="form">

                            {/* Prenume + Nume pe același rând */}
                            <div className="field-row">
                                <div className="field">
                                    <label>{t.firstName}</label>
                                    <input type="text" placeholder="Introdu prenumele" />
                                </div>
                                <div className="field">
                                    <label>{t.lastName}</label>
                                    <input type="text" placeholder="Introdu numele" />
                                </div>
                            </div>

                            <div className="field">
                                <label>{t.emailLabel}</label>
                                <input type="email" placeholder="exemplu@email.com" />
                            </div>

                            <div className="field">
                                <label>Parolă</label>
                                <div className="password-input-wrapper">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Introdu parola"
                                        value={newPatientPassword}
                                        onChange={(e) => setNewPatientPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="toggle-password"
                                        onClick={() => setShowPassword(!showPassword)}
                                        aria-label={showPassword ? "Ascunde parola" : "Arată parola"}
                                    >
                                        {showPassword ? (
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                                                <line x1="1" y1="1" x2="23" y2="23"/>
                                            </svg>
                                        ) : (
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                                <circle cx="12" cy="12" r="3"/>
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Telefon + Gen pe același rând */}
                            <div className="field-row">
                                <div className="field">
                                    <label>{t.phone}</label>
                                    <input type="text" placeholder="+373 xx xxx xxx" />
                                </div>
                                <div className="field">
                                    <label>{t.gender}</label>
                                    <div className="custom-dropdown">
                                        <div className="dropdown-header" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                            <span>{selectedGender || t.selectGender}</span>
                                            <span className={`dropdown-arrow ${isDropdownOpen ? "open" : ""}`}>▼</span>
                                        </div>
                                        {isDropdownOpen && (
                                            <div className="dropdown-list">
                                                {genderOptions.map((option) => (
                                                    <div key={option} className="dropdown-option"
                                                         onClick={() => { setSelectedGender(option); setIsDropdownOpen(false); }}>
                                                        {option}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="field">
                                <label>{t.birthDate}</label>
                                <div className="date-inputs">
                                    <input type="number" placeholder={t.day} min="1" max="31" value={birthDay}
                                           onChange={(e) => { setBirthDay(e.target.value); validateDate(e.target.value, birthMonth, birthYear); }} className="date-input" />
                                    <input type="number" placeholder={t.month} min="1" max="12" value={birthMonth}
                                           onChange={(e) => { setBirthMonth(e.target.value); validateDate(birthDay, e.target.value, birthYear); }} className="date-input" />
                                    <input type="number" placeholder={t.year} min="1900" max={currentYear} value={birthYear}
                                           onChange={(e) => { setBirthYear(e.target.value); validateDate(birthDay, birthMonth, e.target.value); }} className="date-input" />
                                </div>
                                {dateError && <span className="error-message">{dateError}</span>}
                            </div>

                            <button type="submit" className="login-btn">{t.registerBtn}</button>
                        </form>
                    )}
                </div>

            </div>
        </div>
    );
};

export default LoginPage;
