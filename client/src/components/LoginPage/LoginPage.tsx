import "./LoginPage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import { useApi } from "../../api/context";

interface LoginResponse {
    token: string;
}

function decodeToken(token: string): Record<string, string> {
    try {
        const payload = token.split(".")[1];
        return JSON.parse(atob(payload));
    } catch {
        return {};
    }
}

type View = "login" | "register" | "reset";

const LoginPage = () => {
    const [activeTab, setActiveTab] = useState<"existing" | "new">("existing");
    const [view, setView] = useState<View>("login");

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginError, setLoginError] = useState("");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [newPatientPassword, setNewPatientPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [selectedGender, setSelectedGender] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [birthDay, setBirthDay] = useState("");
    const [birthMonth, setBirthMonth] = useState("");
    const [birthYear, setBirthYear] = useState("");
    const [dateError, setDateError] = useState("");
    const [registerError, setRegisterError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [resetEmail, setResetEmail] = useState("");
    const [resetNewPassword, setResetNewPassword] = useState("");
    const [resetConfirmPassword, setResetConfirmPassword] = useState("");
    const [resetError, setResetError] = useState("");
    const [resetSuccess, setResetSuccess] = useState("");

    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [showResetPassword, setShowResetPassword] = useState(false);
    const [showResetConfirmPassword, setShowResetConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const { t } = useLanguage();
    const navigate = useNavigate();
    const api = useApi();

    const currentYear = new Date().getFullYear();
    const genderOptions = [t.male, t.female];

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setLoginError("");
        try {
            const res = await api.post<LoginResponse>("/api/session/Auth", {
                email: loginEmail,
                password: loginPassword,
            });
            const decoded = decodeToken(res.token);
            const rawRole = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
                || decoded["role"] || decoded["Role"] || "";
            const role = rawRole.toLowerCase() === "admin" ? "admin" : "user";
            const name = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]
                || decoded["name"] || loginEmail;
            login({ name, email: loginEmail, role }, res.token);
            navigate(role === "admin" ? "/admin" : "/profile");
        } catch {
            setLoginError("Email sau parolă incorectă.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!birthDay || !birthMonth || !birthYear) {
            setDateError("Completează data nașterii.");
            return;
        }
        setIsLoading(true);
        setRegisterError("");
        try {
            const dateOfBirth = `${birthYear}-${birthMonth.padStart(2, "0")}-${birthDay.padStart(2, "0")}`;
            await api.post("/api/register", {
                firstName, lastName, email: registerEmail,
                password: newPatientPassword, phone, sex: selectedGender, dateOfBirth,
            });
            setActiveTab("existing");
            setView("login");
            setLoginEmail(registerEmail);
        } catch {
            setRegisterError("Eroare la înregistrare. Încearcă din nou.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setResetError("");
        setResetSuccess("");
        if (resetNewPassword !== resetConfirmPassword) {
            setResetError("Parolele nu coincid.");
            return;
        }
        if (resetNewPassword.length < 4) {
            setResetError("Parola trebuie să aibă cel puțin 4 caractere.");
            return;
        }
        setIsLoading(true);
        try {
            await api.post("/api/session/reset-password", {
                email: resetEmail,
                newPassword: resetNewPassword,
            });
            setResetSuccess("Parola a fost schimbată cu succes!");
            setTimeout(() => {
                setView("login");
                setResetEmail("");
                setResetNewPassword("");
                setResetConfirmPassword("");
                setResetSuccess("");
            }, 2000);
        } catch {
            setResetError("Email-ul nu a fost găsit.");
        } finally {
            setIsLoading(false);
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
                <div className={`right ${activeTab === "new" || view === "reset" ? "scroll-enabled" : ""}`}>

                    {/* RESET PAROLA VIEW */}
                    {view === "reset" ? (
                        <>
                            <div className="login-header">
                                <button className="back-home-btn" onClick={() => setView("login")}>
                                    ← Înapoi la Login
                                </button>
                                <h2>Resetează parola</h2>
                            </div>
                            <form className="form" onSubmit={handleResetPassword}>
                                <div className="field">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        placeholder="exemplu@email.com"
                                        value={resetEmail}
                                        onChange={(e) => setResetEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="field">
                                    <label>Parolă nouă</label>
                                    <div className="password-input-wrapper">
                                        <input
                                            type={showResetPassword ? "text" : "password"}
                                            placeholder="Introdu parola nouă"
                                            value={resetNewPassword}
                                            onChange={(e) => setResetNewPassword(e.target.value)}
                                            required
                                        />
                                        <button type="button" className="toggle-password"
                                                onClick={() => setShowResetPassword(!showResetPassword)}>
                                            {showResetPassword ? (
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
                                <div className="field">
                                    <label>Confirmă parola</label>
                                    <div className="password-input-wrapper">
                                        <input
                                            type={showResetConfirmPassword ? "text" : "password"}
                                            placeholder="Repetă parola nouă"
                                            value={resetConfirmPassword}
                                            onChange={(e) => setResetConfirmPassword(e.target.value)}
                                            required
                                        />
                                        <button type="button" className="toggle-password"
                                                onClick={() => setShowResetConfirmPassword(!showResetConfirmPassword)}>
                                            {showResetConfirmPassword ? (
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
                                {resetError && <span className="error-message">{resetError}</span>}
                                {resetSuccess && <span className="success-message">{resetSuccess}</span>}
                                <button type="submit" className="login-btn" disabled={isLoading}>
                                    {isLoading ? "Se încarcă..." : "Schimbă parola"}
                                </button>
                            </form>
                        </>
                    ) : (
                        <>
                            <div className="login-header">
                                <button className="back-home-btn" onClick={() => navigate("/")}>
                                    ← {t.backToHome ?? "Înapoi la Home"}
                                </button>
                                <h2>{activeTab === "existing" ? t.loginTitle : t.registerTitle}</h2>
                            </div>

                            <div className="patient-tabs">
                                <button
                                    className={`tab-btn ${activeTab === "existing" ? "active" : ""}`}
                                    onClick={() => { setActiveTab("existing"); setView("login"); }}
                                >
                                    {t.existingPatient}
                                </button>
                                <button
                                    className={`tab-btn ${activeTab === "new" ? "active" : ""}`}
                                    onClick={() => { setActiveTab("new"); setView("register"); }}
                                >
                                    {t.newPatient}
                                </button>
                            </div>

                            {activeTab === "existing" ? (
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
                                        <div className="password-input-wrapper">
                                            <input
                                                type={showLoginPassword ? "text" : "password"}
                                                placeholder="********"
                                                value={loginPassword}
                                                onChange={(e) => { setLoginPassword(e.target.value); setLoginError(""); }}
                                                required
                                            />
                                            <button type="button" className="toggle-password"
                                                    onClick={() => setShowLoginPassword(!showLoginPassword)}>
                                                {showLoginPassword ? (
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
                                        <a
                                            href="#"
                                            className="reset"
                                            onClick={(e) => { e.preventDefault(); setView("reset"); }}
                                        >
                                            {t.resetPassword}
                                        </a>
                                    </div>
                                    {loginError && <span className="error-message">{loginError}</span>}
                                    <button type="submit" className="login-btn" disabled={isLoading}>
                                        {isLoading ? "Se încarcă..." : t.loginBtn}
                                    </button>
                                </form>
                            ) : (
                                <form className="form" onSubmit={handleRegister}>
                                    <div className="field-row">
                                        <div className="field">
                                            <label>{t.firstName}</label>
                                            <input type="text" placeholder="Introdu prenumele" value={firstName}
                                                   onChange={(e) => setFirstName(e.target.value)} required />
                                        </div>
                                        <div className="field">
                                            <label>{t.lastName}</label>
                                            <input type="text" placeholder="Introdu numele" value={lastName}
                                                   onChange={(e) => setLastName(e.target.value)} required />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label>{t.emailLabel}</label>
                                        <input type="email" placeholder="exemplu@email.com" value={registerEmail}
                                               onChange={(e) => setRegisterEmail(e.target.value)} required />
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
                                            <button type="button" className="toggle-password"
                                                    onClick={() => setShowPassword(!showPassword)}>
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
                                    <div className="field-row">
                                        <div className="field">
                                            <label>{t.phone}</label>
                                            <input type="text" placeholder="+373 xx xxx xxx" value={phone}
                                                   onChange={(e) => setPhone(e.target.value)} required />
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
                                    {registerError && <span className="error-message">{registerError}</span>}
                                    <button type="submit" className="login-btn" disabled={isLoading}>
                                        {isLoading ? "Se încarcă..." : t.registerBtn}
                                    </button>
                                </form>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
