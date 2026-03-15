import "./HomePage.css";
import Footer from "../../shared/Footer/Footer";
import Navbar from "../../shared/Navbar/Navbar";
import HeroSlider from "../../shared/HeroSlider/HeroSlider";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

const HomePage = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();

    const doctors = [
        { name: "Dr. Tatiana Cobzac",  specialty: t.specInterna,   experience: t.exp15, education: "USMF Nicolae Testemițanu, Chișinău", initials: "TC" },
        { name: "Dr. Vasile Munteanu", specialty: t.specCardio,     experience: t.exp12, education: "USMF Nicolae Testemițanu, Chișinău", initials: "VM" },
        { name: "Dr. Natalia Botnari", specialty: t.specPediatrie,  experience: t.exp10, education: "USMF Nicolae Testemițanu, Chișinău", initials: "NB" },
        { name: "Dr. Andrei Leahu",    specialty: t.specOrtoped,    experience: t.exp18, education: "UMF Carol Davila București",         initials: "AL" },
    ];

    const testimonials = [
        { name: "Tatiana Cojocaru", rating: 5, text: t.testi1, initials: "TC", date: "Ianuarie 2026" },
        { name: "Vasile Rusu",      rating: 5, text: t.testi2, initials: "VR", date: "Decembrie 2025" },
        { name: "Elena Ciobanu",    rating: 5, text: t.testi3, initials: "EC", date: "Februarie 2026" },
        { name: "Dumitru Moraru",   rating: 5, text: t.testi4, initials: "DM", date: "Ianuarie 2026" },
    ];

    return (
        <div className="homepage">

            <Navbar />

            <HeroSlider />


            <section className="features-section">
                <div className="features-header">
                    <span className="features-label">{t.featuresLabel}</span>
                    <h2 className="features-title">{t.featuresTitle}</h2>
                    <p className="features-subtitle">{t.featuresSubtitle}</p>
                </div>
                <div className="features-container">
                    <div className="feature-box"><h3>{t.feat1Title}</h3><p>{t.feat1Desc}</p></div>
                    <div className="feature-box"><h3>{t.feat2Title}</h3><p>{t.feat2Desc}</p></div>
                    <div className="feature-box"><h3>{t.feat3Title}</h3><p>{t.feat3Desc}</p></div>
                    <div className="feature-box"><h3>{t.feat4Title}</h3><p>{t.feat4Desc}</p></div>
                </div>
            </section>


            <section id="echipa" className="team-section">
                <div className="section-container">
                    <div className="section-header">
                        <span className="section-badge">{t.teamBadge}</span>
                        <h2 className="section-title">{t.teamTitle}</h2>
                        <p className="section-subtitle">{t.teamSubtitle}</p>
                    </div>
                    <div className="team-grid">
                        {doctors.map((doctor, index) => (
                            <div key={index} className="doctor-card">
                                <div className="doctor-avatar">{doctor.initials}</div>
                                <h3 className="doctor-name">{doctor.name}</h3>
                                <p className="doctor-specialty">{doctor.specialty}</p>
                                <div className="doctor-info">
                                    <p className="doctor-experience">{doctor.experience}</p>
                                    <p className="doctor-education">{doctor.education}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            <section className="how-it-works-section">
                <div className="section-container">
                    <div className="section-header">
                        <span className="section-badge">{t.howBadge}</span>
                        <h2 className="section-title">{t.howTitle}</h2>
                        <p className="section-subtitle">{t.howSubtitle}</p>
                    </div>
                    <div className="steps-container">
                        <div className="step-card">
                            <div className="step-number">1</div>
                            <h3 className="step-title">{t.step1Title}</h3>
                            <p className="step-description">{t.step1Desc}</p>
                        </div>
                        <div className="step-arrow">→</div>
                        <div className="step-card">
                            <div className="step-number">2</div>
                            <h3 className="step-title">{t.step2Title}</h3>
                            <p className="step-description">{t.step2Desc}</p>
                        </div>
                        <div className="step-arrow">→</div>
                        <div className="step-card">
                            <div className="step-number">3</div>
                            <h3 className="step-title">{t.step3Title}</h3>
                            <p className="step-description">{t.step3Desc}</p>
                        </div>
                    </div>
                </div>
            </section>


            <section id="testimoniale" className="testimonials-section">
                <div className="section-container">
                    <div className="section-header">
                        <span className="section-badge">{t.testiBadge}</span>
                        <h2 className="section-title">{t.testiTitle}</h2>
                        <p className="section-subtitle">{t.testiSubtitle}</p>
                    </div>
                    <div className="testimonials-grid">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="testimonial-card">
                                <div className="testimonial-header">
                                    <div className="testimonial-avatar">{testimonial.initials}</div>
                                    <div className="testimonial-info">
                                        <p className="testimonial-name">{testimonial.name}</p>
                                        <p className="testimonial-date">{testimonial.date}</p>
                                    </div>
                                </div>
                                <div className="testimonial-rating">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <span key={i} className="star">★</span>
                                    ))}
                                </div>
                                <p className="testimonial-text">"{testimonial.text}"</p>
                                <div className="testimonial-verified">✓ {t.verifiedPatient}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            <section className="cta-section">
                <div className="cta-container">
                    <div className="cta-content">
                        <h2 className="cta-title">{t.ctaTitle}</h2>
                        <p className="cta-description">{t.ctaDesc}</p>
                        <div className="cta-buttons">
                            <button className="cta-button-primary" onClick={() => navigate("/appointments")}>{t.ctaBook}</button>
                            <button className="cta-button-secondary" onClick={() => navigate("/services")}>{t.ctaPrices}</button>
                        </div>
                    </div>
                    <div className="cta-stats">
                        <div className="cta-stat">
                            <span className="cta-stat-number">98%</span>
                            <span className="cta-stat-label">{t.ctaSatisfaction}</span>
                        </div>
                        <div className="cta-stat">
                            <span className="cta-stat-number">24/7</span>
                            <span className="cta-stat-label">{t.ctaOnline}</span>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

        </div>
    );
};

export default HomePage;
