import "./DoctorProfilePage.css";

const DoctorProfilePage = () => {
    return (
        <div className="doctor-profile-page">
            {/* Modern Navbar */}
            <nav className="navbar">
                <div className="navbar-left">
                    <div className="logo">Rooh</div>
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Caută medici, clinici, spitale etc."
                        />
                    </div>
                </div>
                <div className="navbar-right">
                    <div className="currency">AED 530.56</div>
                    <div className="notification-icon">
                        <span>🔔</span>
                    </div>
                    <div className="user-avatar">
                        <img
                            src="https://via.placeholder.com/40"
                            alt="User Avatar"
                        />
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="profile-container">
                {/* Doctor Profile Card */}
                <div className="profile-card">
                    <div className="profile-image-section">
                        <img
                            src="https://via.placeholder.com/120"
                            alt="Dr. Stephen Munoz"
                            className="doctor-avatar"
                        />
                    </div>

                    <h2 className="doctor-name">Dr. Stephen Munoz</h2>
                    <p className="doctor-specialty">Cardiolog</p>

                    <div className="specialization-tags">
                        <span className="tag">Cardiologie Generală</span>
                        <span className="tag">Ecocardiologie</span>
                        <span className="tag">Cardiologie Congenitală la Adulți</span>
                    </div>

                    <p className="doctor-bio">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                        ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat.
                    </p>

                    <div className="stats-row">
                        <div className="stat-item">
                            <span className="stat-number">41k</span>
                            <span className="stat-label">Urmăritori</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">21k</span>
                            <span className="stat-label">Urmăriți</span>
                        </div>
                    </div>

                    <div className="action-buttons">
                        <button className="btn-follow">Urmărește</button>
                        <button className="btn-chat">Mesaj</button>
                    </div>

                    <button className="btn-add-contact">Adaugă la contacte</button>
                </div>
            </div>
        </div>
    );
};

export default DoctorProfilePage;
