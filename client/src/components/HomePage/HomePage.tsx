import "./HomePage.css";
import { useState } from "react";

const HomePage = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const services = [
        {
            title: "Medicină Internă",
            description: "Consultații complete pentru diagnostic și tratament al afecțiunilor interne",
            details: "Evaluare medicală complexă, tratamente personalizate"
        },
        {
            title: "Cardiologie",
            description: "Evaluări cardiologice complete, ECG, monitorizare holter",
            details: "Prevenție și tratament boli cardiovasculare"
        },
        {
            title: "Analize Medicale",
            description: "Laborator modern cu rezultate rapide și precise",
            details: "Analize sânge, urină, teste hormonale, markeri tumorali"
        },
        {
            title: "Medicina de Familie",
            description: "Îngrijire medicală continuă pentru întreaga familie",
            details: "Medic de familie, vaccinări, consultații pediatrice"
        },
        {
            title: "Ortopedie",
            description: "Diagnostic și tratament afecțiuni osteo-articulare",
            details: "Traumatologie, recuperare medicală, infiltrații"
        },
        {
            title: "Oftalmologie",
            description: "Consultații oftalmologice complete și teste de vedere",
            details: "Control vedere, diagnostic glaucom, tratament cataractă"
        },
        {
            title: "Neurologie",
            description: "Evaluare neurologică și tratament afecțiuni neurologice",
            details: "Migrene, vertij, neuropatii, AVC"
        },
        {
            title: "Endocrinologie",
            description: "Diagnostic și tratament afecțiuni hormonale",
            details: "Diabet, tiroidă, tulburări metabolice"
        }
    ];

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

    const schedule = [
        { day: "Luni - Vineri", hours: "08:00 - 20:00" },
        { day: "Sâmbătă", hours: "09:00 - 14:00" },
        { day: "Duminică", hours: "Închis" }
    ];

    return (
        <div className="homepage">
            {/* Navigation Bar */}
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="navbar-logo">
                        <div className="logo-text">
                            <span className="logo-title">MediCare</span>
                            <span className="logo-subtitle">Cabinet Medical</span>
                        </div>
                    </div>

                    <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                        ☰
                    </button>

                    <ul className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
                        <li><a href="#acasa">Acasă</a></li>
                        <li><a href="#servicii">Servicii</a></li>
                        <li><a href="#echipa">Echipa</a></li>
                        <li><a href="#testimoniale">Testimoniale</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>

                    <div className="navbar-actions">
                        <a href="tel:+37322123456" className="navbar-phone">+373 22 123 456</a>
                        <button className="navbar-btn">Programare</button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="acasa" className="hero-section">
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
                    <div className="hero-image">
                        <div className="image-card">
                            <div className="image-badge">Rating 4.9/5</div>
                            <div className="hero-img-placeholder">
                                <p className="placeholder-text">Echipă Medicală Profesionistă</p>
                            </div>
                            <div className="image-info">
                                <div className="info-item">
                                    <span>✓ Echipamente Moderne</span>
                                </div>
                                <div className="info-item">
                                    <span>✓ Rezultate Rapide</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
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

            {/* Services Section */}
            <section id="servicii" className="services-section">
                <div className="section-container">
                    <div className="section-header">
                        <span className="section-badge">Servicii Medicale</span>
                        <h2 className="section-title">Specialități Medicale Complete</h2>
                        <p className="section-subtitle">
                            Oferim o gamă largă de servicii medicale de specialitate cu echipamente moderne
                            și medici cu experiență vastă în domeniu
                        </p>
                    </div>
                    <div className="services-grid">
                        {services.map((service, index) => (
                            <div key={index} className="service-card">
                                <h3 className="service-title">{service.title}</h3>
                                <p className="service-description">{service.description}</p>
                                <p className="service-details">{service.details}</p>
                                <button className="service-btn">Detalii →</button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
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

            {/* How It Works Section */}
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

            {/* Testimonials Section */}
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

            {/* CTA Section */}
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

            {/* Footer */}
            <footer id="contact" className="footer">
                <div className="footer-container">
                    <div className="footer-section">
                        <div className="footer-logo">
                            <div className="logo-text">
                                <span className="logo-title">MediCare</span>
                                <span className="logo-subtitle">Cabinet Medical</span>
                            </div>
                        </div>
                        <p className="footer-description">
                            Cabinet medical modern cu servicii complete de diagnostic și tratament.
                            Echipă de medici specialiști dedicați sănătății tale.
                        </p>
                        <div className="footer-social">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                                <span>Facebook</span>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                                <span>Instagram</span>
                            </a>
                        </div>
                    </div>

                    <div className="footer-section">
                        <h3 className="footer-title">Link-uri Rapide</h3>
                        <ul className="footer-links">
                            <li><a href="#servicii">Servicii Medicale</a></li>
                            <li><a href="#echipa">Echipa Noastră</a></li>
                            <li><a href="#testimoniale">Testimoniale</a></li>
                            <li><a href="#">Prețuri</a></li>
                            <li><a href="#">Blog Medical</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h3 className="footer-title">Program</h3>
                        <ul className="footer-schedule">
                            {schedule.map((item, index) => (
                                <li key={index}>
                                    <span>{item.day}</span>
                                    <span className="hours">{item.hours}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h3 className="footer-title">Contact</h3>
                        <ul className="footer-contact">
                            <li>
                                <span className="contact-label">Adresă:</span>
                                <span>Bd. Ștefan cel Mare nr. 123, Chișinău, Moldova</span>
                            </li>
                            <li>
                                <span className="contact-label">Telefon:</span>
                                <span>+373 22 123 456</span>
                            </li>
                            <li>
                                <span className="contact-label">Email:</span>
                                <span>contact@medicare.md</span>
                            </li>
                            <li>
                                <span className="contact-label">Program:</span>
                                <span>Luni-Vineri: 08:00-20:00</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2026 MediCare Cabinet Medical. Toate drepturile rezervate.</p>
                    <div className="footer-bottom-links">
                        <a href="#">Politică Confidențialitate</a>
                        <a href="#">Termeni și Condiții</a>
                        <a href="#">GDPR</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
