import "./LoginPage.css";
import doctor from "../../assets/doctor.png";
import { useState } from "react";

const LoginPage = () => {
    const [isExistingPatient, setIsExistingPatient] = useState(true);

    return (
        <div className="page">
            <div className="card">

                <div className="left">
                    <h2>
                        Protect Yourself and Your Family — <br />
                        Easy Online Appointments.
                    </h2>

                    <div className="image-box">
                        <img src={doctor} alt="doctor" />
                    </div>
                </div>

                <div className={`right ${!isExistingPatient ? 'scroll-enabled' : ''}`}>
                    <div className="login-header">
                        <h2>{isExistingPatient ? "Login to start your session" : "Register as New Patient"}</h2>
                        <p>Secure, quick, and easy</p>
                    </div>

                    <div className="tabs">
                        <button
                            className={`tab ${isExistingPatient ? "active" : ""}`}
                            onClick={() => setIsExistingPatient(true)}
                        >
                            Existing Patient
                        </button>
                        <button
                            className={`tab ${!isExistingPatient ? "active" : ""}`}
                            onClick={() => setIsExistingPatient(false)}
                        >
                            New Patient
                        </button>
                    </div>

                    {isExistingPatient ? (
                        <>
                            <form className="form">
                                <div className="field">
                                    <label>Email ID / Phone</label>
                                    <input type="text" placeholder="+373 xx xxx xxx" />
                                </div>

                                <div className="field">
                                    <label>Password</label>
                                    <input type="password" placeholder="********" />
                                    <a href="#" className="reset">Reset Password</a>
                                </div>

                                <button type="submit" className="login-btn">Login</button>
                            </form>

                            <a href="#" className="code-login">Login With Code</a>
                        </>
                    ) : (
                        <form className="form">
                            <div className="field">
                                <label>First Name</label>
                                <input type="text" placeholder="Enter your first name" />
                            </div>

                            <div className="field">
                                <label>Last Name</label>
                                <input type="text" placeholder="Enter your last name" />
                            </div>

                            <div className="field">
                                <label>Email</label>
                                <input type="email" placeholder="example@email.com" />
                            </div>

                            <div className="field">
                                <label>Phone Number</label>
                                <input type="text" placeholder="+373 xx xxx xxx" />
                            </div>

                            <div className="field">
                                <label>Age</label>
                                <input
                                    type="number"
                                    placeholder="Enter your age"
                                    min="0"
                                    max="120"
                                />
                            </div>

                            <div className="field">
                                <label>Gender</label>
                                <select>
                                    <option value="">Select your gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <button type="submit" className="login-btn">Register</button>
                        </form>
                    )}
                </div>

            </div>
        </div>
    );
};

export default LoginPage;
