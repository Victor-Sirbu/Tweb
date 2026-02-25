import Navbar from "../../shared/Navbar/Navbar";
import Footer from "../../shared/Footer/Footer";
import DoctorRightPanel from "./DoctorRightPanel";
import "./DoctorProfilePage.css";

const DoctorProfilePage = () => {
    return (
        <div className="doctor-profile-page">
            <Navbar />

            <div className="doctor-content">
                <div className="doctor-layout">
                    <div className="doctor-main-section">
                        <div className="doctor-banner">
                            <img
                                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=300&fit=crop"
                                alt="Banner"
                                className="banner-image"
                            />
                        </div>

                        <div className="doctor-profile-header">
                            <div className="doctor-avatar-wrapper">
                                <img
                                    src="https://via.placeholder.com/150"
                                    alt="Dr. Ionescu Mihai"
                                    className="doctor-avatar-large"
                                />
                            </div>

                            <div className="doctor-header-info">
                                <h1 className="doctor-name-main">Dr. Ionescu Mihai</h1>
                                <p className="doctor-specialty-main">Cardiolog Senior</p>

                                <div className="doctor-stats-inline">
                                    <div className="stat-inline-item">
                                        <span className="stat-value">2,547</span>
                                        <span className="stat-label">Urmăritori</span>
                                    </div>
                                    <div className="stat-inline-item">
                                        <span className="stat-value">1,850</span>
                                        <span className="stat-label">Pacienți</span>
                                    </div>
                                    <div className="stat-inline-item">
                                        <span className="stat-value">4.8/5</span>
                                        <span className="stat-label">Rating</span>
                                    </div>
                                </div>

                                <div className="doctor-action-buttons">
                                    <button className="btn-primary-action">Urmărește</button>
                                    <button className="btn-secondary-action">Trimite mesaj</button>
                                    <button className="btn-tertiary-action">Programează consultație</button>
                                </div>
                            </div>
                        </div>

                        <div className="doctor-content-sections">
                            <section className="services-section">
                                <h2 className="section-title">Servicii oferite</h2>
                                <div className="services-grid">
                                    <div className="service-card">
                                        <h3>Consultație Cardiologie</h3>
                                        <p>Evaluare completă a sănătății cardiovasculare</p>
                                        <span className="service-price">250 MDL</span>
                                    </div>
                                    <div className="service-card">
                                        <h3>Ecocardiografie</h3>
                                        <p>Examen imagistic al inimii prin ultrasunete</p>
                                        <span className="service-price">400 MDL</span>
                                    </div>
                                    <div className="service-card">
                                        <h3>Electrocardiogramă (ECG)</h3>
                                        <p>Monitorizarea activității electrice a inimii</p>
                                        <span className="service-price">150 MDL</span>
                                    </div>
                                    <div className="service-card">
                                        <h3>Test de Efort</h3>
                                        <p>Evaluarea capacității cardiace sub efort</p>
                                        <span className="service-price">350 MDL</span>
                                    </div>
                                    <div className="service-card">
                                        <h3>Holter ECG 24h</h3>
                                        <p>Monitorizare cardiacă continuă 24 de ore</p>
                                        <span className="service-price">500 MDL</span>
                                    </div>
                                    <div className="service-card">
                                        <h3>Consultație Preventivă</h3>
                                        <p>Sfaturi pentru menținerea sănătății cardiovasculare</p>
                                        <span className="service-price">200 MDL</span>
                                    </div>
                                </div>
                            </section>

                            <section className="reviews-section">
                                <h2 className="section-title">Recenzii pacienți</h2>
                                <div className="reviews-summary">
                                    <div className="rating-overview">
                                        <div className="rating-number">4.8</div>
                                        <div className="rating-stars">★★★★★</div>
                                        <div className="rating-count">Bazat pe 127 recenzii</div>
                                    </div>
                                </div>

                                <div className="reviews-list">
                                    <div className="review-item">
                                        <div className="review-header">
                                            <img
                                                src="https://via.placeholder.com/50"
                                                alt="Pacient"
                                                className="reviewer-avatar"
                                            />
                                            <div className="reviewer-info">
                                                <h4>Maria Popescu</h4>
                                                <div className="review-stars">★★★★★</div>
                                            </div>
                                            <span className="review-date">15 Feb 2026</span>
                                        </div>
                                        <p className="review-text">
                                            Doctor foarte profesionist și empatic. Mi-a explicat în detaliu diagnosticul și
                                            opțiunile de tratament. Recomand cu încredere!
                                        </p>
                                    </div>

                                    <div className="review-item">
                                        <div className="review-header">
                                            <img
                                                src="https://via.placeholder.com/50"
                                                alt="Pacient"
                                                className="reviewer-avatar"
                                            />
                                            <div className="reviewer-info">
                                                <h4>Ion Vasile</h4>
                                                <div className="review-stars">★★★★★</div>
                                            </div>
                                            <span className="review-date">10 Feb 2026</span>
                                        </div>
                                        <p className="review-text">
                                            Excelentă consultație! Dr. Ionescu și-a luat timp să răspundă la toate întrebările
                                            mele. Foarte mulțumit de serviciile oferite.
                                        </p>
                                    </div>

                                    <div className="review-item">
                                        <div className="review-header">
                                            <img
                                                src="https://via.placeholder.com/50"
                                                alt="Pacient"
                                                className="reviewer-avatar"
                                            />
                                            <div className="reviewer-info">
                                                <h4>Elena Radu</h4>
                                                <div className="review-stars">★★★★☆</div>
                                            </div>
                                            <span className="review-date">5 Feb 2026</span>
                                        </div>
                                        <p className="review-text">
                                            Medic competent, dar timpul de așteptare a fost puțin mai lung decât programat.
                                            În rest, foarte profesional.
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>

                    <div className="right-panel">
                        <DoctorRightPanel />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default DoctorProfilePage;
