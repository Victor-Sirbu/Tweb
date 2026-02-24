import "./HomePage.css";
import Footer from "../../shared/Footer/Footer";
import Navbar from "../../shared/Navbar/Navbar";
import { useState, useEffect } from "react";
import heroBg1 from "../../assets/hero-bg1.jpg";
import heroBg2 from "../../assets/hero-bg2.jpg";
import heroBg3 from "../../assets/hero-bg3.jpg";
import heroBg4 from "../../assets/hero-bg4.jpg";
import heroBg5 from "../../assets/hero-bg5.jpg";


const HomePage = () => {


    const doctors = [
        {
            name: "Dr. Tatiana Cobzac",
            specialty: "Medicină Internă",
            experience: "15 ani experiență",
            education: "USMF Nicolae Testemițanu, Chișinău",
            initials: "TC"
        },
        {
            name: "Dr. Vasile Munteanu",
            specialty: "Cardiologie",
            experience: "12 ani experiență",
            education: "USMF Nicolae Testemițanu, Chișinău",
            initials: "VM"
        },
        {
            name: "Dr. Natalia Botnari",
            specialty: "Pediatrie",
            experience: "10 ani experiență",
            education: "USMF Nicolae Testemițanu, Chișinău",
            initials: "NB"
        },
        {
            name: "Dr. Andrei Leahu",
            specialty: "Ortopedie",
            experience: "18 ani experiență",
            education: "UMF Carol Davila București",
            initials: "AL"
        }
    ];

    const testimonials = [
        {
            name: "Tatiana Cojocaru",
            rating: 5,
            text: "Cel mai profesionist cabinet medical din oraș. Dr. Tatiana mi-a salvat viața diagnosticând la timp o afecțiune serioasă. Personalul este extrem de amabil și empatic.",
            initials: "TC",
            date: "Ianuarie 2026"
        },
        {
            name: "Vasile Rusu",
            rating: 5,
            text: "Am făcut analize medicale complete aici. Rezultatele au venit foarte rapid, totul a fost foarte bine organizat. Recomand cu încredere!",
            initials: "VR",
            date: "Decembrie 2025"
        },
        {
            name: "Elena Ciobanu",
            rating: 5,
            text: "Copiii mei sunt îngrijiți aici de Dr. Natalia. Este o doctoriță extraordinară, foarte răbdătoare și competentă. Ne simțim în siguranță!",
            initials: "EC",
            date: "Februarie 2026"
        },
        {
            name: "Dumitru Moraru",
            rating: 5,
            text: "Programările online sunt foarte convenabile. Nu mai stai la cozi! Serviciile medicale sunt de top, medicii sunt foarte pregătiți.",
            initials: "DM",
            date: "Ianuarie 2026"
        }
    ];

    const images = [heroBg1, heroBg2, heroBg3, heroBg4, heroBg5];
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="homepage">

            <Navbar />

            <section id="acasa" className="hero-section">
                {images.map((img, index) => (
                    <div key={index} className="hero-slide" style={{
                        backgroundImage: `url(${img})`,
                        opacity: index === currentImage ? 1 : 0
                    } as React.CSSProperties}></div>
                ))}
                <div className="hero-overlay"></div>
                <div className="hero-container">
                    <div className="hero-content">
                        <div className="hero-badge">Cabinet Medical Acreditat</div>
                        <h1 className="hero-title">
                            Sănătatea Ta Este<br />
                            <span className="hero-highlight">Prioritatea Noastră</span>
                        </h1>
                        <p className="hero-description">
                            Cabinet medical modern cu echipamente de ultimă generație și o echipă de medici specialiști
                            cu experiență vastă. Oferim servicii medicale complete, de la consultații de specialitate
                            până la analize de laborator complexe.
                        </p>
                        <div className="hero-buttons">
                            <button className="btn-primary">Programează Consultație</button>
                            <button className="btn-secondary">Contactează-ne</button>
                        </div>
                        <div className="hero-stats">
                            <div className="stat-item">
                                <span className="stat-number">25,000+</span>
                                <span className="stat-label">Pacienți Tratați</span>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <span className="stat-number">30+</span>
                                <span className="stat-label">Medici Specialiști</span>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <span className="stat-number">15</span>
                                <span className="stat-label">Ani Experiență</span>
                            </div>
                        </div>
                    </div>

                    <div className="hero-schedule-card">
                        <h3 className="schedule-title">Program</h3>
                        <div className="schedule-item">
                            <span className="schedule-day">Luni - Vineri</span>
                            <span className="schedule-time">08:00 - 20:00</span>
                        </div>
                        <div className="schedule-divider"></div>
                        <div className="schedule-item">
                            <span className="schedule-day">Sâmbătă</span>
                            <span className="schedule-time">09:00 - 14:00</span>
                        </div>
                        <div className="schedule-divider"></div>
                        <div className="schedule-item">
                            <span className="schedule-day">Duminică</span>
                            <span className="schedule-time closed">Închis</span>
                        </div>
                    </div>

                </div>
            </section>


            <section className="features-section">
                <div className="features-header">
                    <span className="features-label">Avantajele Noastre</span>
                    <h2 className="features-title">Ce Oferă Cabinetul Nostru Medical</h2>
                    <p className="features-subtitle">
                        Servicii de calitate, accesibile și rapide — pentru sănătatea ta și a familiei tale
                    </p>
                </div>
                <div className="features-container">
                    <div className="feature-box">
                        <h3>Program Flexibil</h3>
                        <p>Luni-Vineri 08:00-20:00</p>
                    </div>
                    <div className="feature-box">
                        <h3>Prețuri Accesibile</h3>
                        <p>Convenții cu case de asigurări</p>
                    </div>
                    <div className="feature-box">
                        <h3>Rezultate Rapide</h3>
                        <p>Analize în aceeași zi</p>
                    </div>
                    <div className="feature-box">
                        <h3>Programare Online</h3>
                        <p>24/7 disponibil</p>
                    </div>
                </div>
            </section>





            <section id="echipa" className="team-section">
                <div className="section-container">
                    <div className="section-header">
                        <span className="section-badge">Echipa Noastră</span>
                        <h2 className="section-title">Medici Specialiști Experimentați</h2>
                        <p className="section-subtitle">
                            Echipa noastră este formată din medici cu pregătire superioară și experiență vastă,
                            dedicați să vă ofere cele mai bune servicii medicale
                        </p>
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
                                <button className="doctor-btn">Programează Consultație</button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            <section className="how-it-works-section">
                <div className="section-container">
                    <div className="section-header">
                        <span className="section-badge">Procesul Nostru</span>
                        <h2 className="section-title">Cum Funcționează Programarea</h2>
                        <p className="section-subtitle">
                            Simplu, rapid și sigur - programează-te online în doar 3 pași
                        </p>
                    </div>
                    <div className="steps-container">
                        <div className="step-card">
                            <div className="step-number">1</div>
                            <h3 className="step-title">Creează Cont</h3>
                            <p className="step-description">
                                Înregistrare rapidă cu email sau telefon. Date personale în siguranță.
                            </p>
                        </div>
                        <div className="step-arrow">→</div>
                        <div className="step-card">
                            <div className="step-number">2</div>
                            <h3 className="step-title">Alege Medicul</h3>
                            <p className="step-description">
                                Selectează specialitatea și medicul dorit. Vezi disponibilitatea în timp real.
                            </p>
                        </div>
                        <div className="step-arrow">→</div>
                        <div className="step-card">
                            <div className="step-number">3</div>
                            <h3 className="step-title">Confirmă</h3>
                            <p className="step-description">
                                Confirmare instantanee prin SMS și email. Reminder 24h înainte.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            <section id="testimoniale" className="testimonials-section">
                <div className="section-container">
                    <div className="section-header">
                        <span className="section-badge">Recenzii Pacienți</span>
                        <h2 className="section-title">Ce Spun Pacienții Noștri</h2>
                        <p className="section-subtitle">
                            Feedback real de la pacienți care au beneficiat de serviciile noastre medicale
                        </p>
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
                                <div className="testimonial-verified">✓ Pacient Verificat</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            <section className="cta-section">
                <div className="cta-container">
                    <div className="cta-content">
                        <h2 className="cta-title">Pregătit să Îți Îmbunătățești Sănătatea?</h2>
                        <p className="cta-description">
                            Nu amâna! Programează-te astăzi pentru o consultație cu unul din medicii noștri specialiști.
                            Echipa noastră este gata să te ajute.
                        </p>
                        <div className="cta-buttons">
                            <button className="cta-button-primary">Programează Acum</button>
                            <button className="cta-button-secondary">Vezi Prețuri</button>
                        </div>
                    </div>
                    <div className="cta-stats">
                        <div className="cta-stat">
                            <span className="cta-stat-number">98%</span>
                            <span className="cta-stat-label">Satisfacție Pacienți</span>
                        </div>
                        <div className="cta-stat">
                            <span className="cta-stat-number">24/7</span>
                            <span className="cta-stat-label">Programare Online</span>
                        </div>
                    </div>
                </div>

            </section>

            <Footer />

        </div>
    );
};

export default HomePage;
