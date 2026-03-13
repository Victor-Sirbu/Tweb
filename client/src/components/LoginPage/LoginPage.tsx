import "./LoginPage.css";
import doctor from "../../assets/doctor.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";

const TEST_EMAIL = "admin@gmail.com";
const TEST_PASSWORD = "admin";

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

                <div className="left">
                    <h2>
                        Protejează-te pe tine și familia ta — <br />
                        Programări online ușoare.
                    </h2>
                    <div className="image-box">
                        <img src={doctor} alt="doctor" />
                    </div>
                </div>

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

                            <a href="#" className="code-login">{t.loginWithCode}</a>
                        </>
                    ) : (
                        <form className="form">
                            <div className="field">
                                <label>{t.firstName}</label>
                                <input type="text" placeholder="Introdu prenumele" />
                            </div>

                            <div className="field">
                                <label>{t.lastName}</label>
                                <input type="text" placeholder="Introdu numele" />
                            </div>

                            <div className="field">
                                <label>{t.emailLabel}</label>
                                <input type="email" placeholder="exemplu@email.com" />
                            </div>

                            <div className="field">
                                <label>{t.phone}</label>
                                <input type="text" placeholder="+373 xx xxx xxx" />
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

                            <button type="submit" className="login-btn">{t.registerBtn}</button>
                        </form>
                    )}
                </div>

            </div>
        </div>
    );
};

export default LoginPage;
