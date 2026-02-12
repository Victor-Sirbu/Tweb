import "../styles/LoginPage.css";
import doctor from "../assets/doctor.png";

const LoginPage = () => {
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

                    <div className="stats">
                        <span>5.7 Million doses injected</span>
                        <span>98% recovery rate</span>
                    </div>
                </div>

                <div className="right">
                    <h3 className="brand">MyHub</h3>

                    <div className="tabs">
                        <button className="tab">New Patient</button>
                        <button className="tab">Existing Patient</button>
                    </div>

                    <div className="login-text">
                        <h4>Login to start your session</h4>
                        <p>Secure, quick, and easy</p>
                    </div>

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

                        <button className="login-btn">Login</button>
                    </form>

                    <a href="#" className="code-login">Login With Code</a>
                </div>

            </div>
        </div>
    );
};

export default LoginPage;
