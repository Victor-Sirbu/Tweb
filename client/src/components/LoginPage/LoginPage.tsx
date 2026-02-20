import "./LoginPage.css";
import doctor from "../../assets/doctor.png";
import { useState } from "react";

const LoginPage = () => {
    const [isExistingPatient, setIsExistingPatient] = useState(true);
    const [birthDay, setBirthDay] = useState("");
    const [birthMonth, setBirthMonth] = useState("");
    const [birthYear, setBirthYear] = useState("");
    const [dateError, setDateError] = useState("");
    const [selectedGender, setSelectedGender] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const currentYear = new Date().getFullYear();
    const genderOptions = ["Bărbat", "Femeie"];

    const validateDate = (day: string, month: string, year: string) => {
        const dayNum = parseInt(day);
        const monthNum = parseInt(month);
        const yearNum = parseInt(year);

        if (day && (dayNum < 1 || dayNum > 31)) {
            setDateError("Ziua trebuie să fie între 1 și 31");
            return false;
        }

        if (month && (monthNum < 1 || monthNum > 12)) {
            setDateError("Luna trebuie să fie între 1 și 12");
            return false;
        }

        if (year && (yearNum < 1900 || yearNum > currentYear)) {
            setDateError(`Anul trebuie să fie între 1900 și ${currentYear}`);
            return false;
        }

        setDateError("");
        return true;
    };

    const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setBirthDay(value);
        validateDate(value, birthMonth, birthYear);
    };

    const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setBirthMonth(value);
        validateDate(birthDay, value, birthYear);
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setBirthYear(value);
        validateDate(birthDay, birthMonth, value);
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
                        <h2>{isExistingPatient ? "Autentificare pentru a începe sesiunea" : "Înregistrare pacient nou"}</h2>
                    </div>

                    <div className="tabs">
                        <button
                            className={`tab ${isExistingPatient ? "active" : ""}`}
                            onClick={() => setIsExistingPatient(true)}
                        >
                            Pacient existent
                        </button>
                        <button
                            className={`tab ${!isExistingPatient ? "active" : ""}`}
                            onClick={() => setIsExistingPatient(false)}
                        >
                            Pacient nou
                        </button>
                    </div>

                    {isExistingPatient ? (
                        <>
                            <form className="form">
                                <div className="field">
                                    <label>Email / Telefon</label>
                                    <input type="text" placeholder="+373 xx xxx xxx" />
                                </div>

                                <div className="field">
                                    <label>Parolă</label>
                                    <input type="password" placeholder="********" />
                                    <a href="#" className="reset">Resetează parola</a>
                                </div>

                                <button type="submit" className="login-btn">Autentificare</button>
                            </form>

                            <a href="#" className="code-login">Autentificare cu cod</a>
                        </>
                    ) : (
                        <form className="form">
                            <div className="field">
                                <label>Prenume</label>
                                <input type="text" placeholder="Introdu prenumele" />
                            </div>

                            <div className="field">
                                <label>Nume</label>
                                <input type="text" placeholder="Introdu numele" />
                            </div>

                            <div className="field">
                                <label>Email</label>
                                <input type="email" placeholder="exemplu@email.com" />
                            </div>

                            <div className="field">
                                <label>Număr de telefon</label>
                                <input type="text" placeholder="+373 xx xxx xxx" />
                            </div>

                            <div className="field">
                                <label>Data nașterii</label>
                                <div className="date-inputs">
                                    <input
                                        type="number"
                                        placeholder="Zi"
                                        min="1"
                                        max="31"
                                        value={birthDay}
                                        onChange={handleDayChange}
                                        className="date-input"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Lună"
                                        min="1"
                                        max="12"
                                        value={birthMonth}
                                        onChange={handleMonthChange}
                                        className="date-input"
                                    />
                                    <input
                                        type="number"
                                        placeholder="An"
                                        min="1900"
                                        max={currentYear}
                                        value={birthYear}
                                        onChange={handleYearChange}
                                        className="date-input"
                                    />
                                </div>
                                {dateError && <span className="error-message">{dateError}</span>}
                            </div>

                            <div className="field">
                                <label>Gen</label>
                                <div className="custom-dropdown">
                                    <div
                                        className="dropdown-header"
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    >
                                        <span>{selectedGender || "Selectează genul"}</span>
                                        <span className={`dropdown-arrow ${isDropdownOpen ? "open" : ""}`}>
                                            ▼
                                        </span>
                                    </div>
                                    {isDropdownOpen && (
                                        <div className="dropdown-list">
                                            {genderOptions.map((option) => (
                                                <div
                                                    key={option}
                                                    className="dropdown-option"
                                                    onClick={() => {
                                                        setSelectedGender(option);
                                                        setIsDropdownOpen(false);
                                                    }}
                                                >
                                                    {option}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button type="submit" className="login-btn">Înregistrează-te</button>
                        </form>
                    )}
                </div>

            </div>
        </div>
    );
};

export default LoginPage;
