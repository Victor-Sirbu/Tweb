import "../styles/LoginPage.css";
import doctor from "../../public/doctor.svg";

const LoginPage = () => {
    return (
        <div className="page">
            <div className="card">

                {/* LEFT */}
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

                {/* RIGHT */}
                <div className="right">
                    <h3>MyHub</h3>

                    <div className="tabs">
                        <button className="active">New Patient</button>
                        <button>Existing Patient</button>
                    </div>

                    <h4>Login to start your session</h4>
                    <p className="subtext">Secure, quick, and easy</p>

                    <form>
                        <label>Email ID / Phone</label>
                        <input type="text" placeholder="+373 xx xxx xxx" />

                        <label>Password</label>
                        <input type="password" placeholder="********" />

                        <a href="#" className="reset">Reset Password</a>

                        <button className="login-btn">Login</button>
                    </form>

                    <a href="#" className="code-login">Login With Code</a>
                </div>

            </div>
        </div>
    );
};

export default LoginPage;
