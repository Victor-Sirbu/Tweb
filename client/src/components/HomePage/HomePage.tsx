import "./HomePage.css";
import Footer from "../../shared/Footer/Footer";
import Navbar from "../../shared/Navbar/Navbar";
import HeroSlider from "../../shared/HeroSlider/HeroSlider";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { useState, useEffect } from "react";
import { useApi } from "../../api/context";

interface MedicAPI {
    id: number;
    firstName: string;
    lastName: string;
    specialty: number;
}

interface ReviewAPI {
    id: number;
    authorName: string;
    reviewText: string;
    rating: number;
    createdAt: string;
    isVerifiedPatient: boolean;
}

const SPECIALITY_MAP: Record<number, string> = {
    0: "Cardiologie",
    1: "Pediatrie",
    2: "Neurologie",
    3: "Dermatologie",
    4: "Oftalmologie",
    5: "Stomatologie",
    6: "Chirurgie",
    7: "Ortopedie",
};

const getInitials = (firstName: string, lastName: string) =>
    `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();

const formatReviewDate = (createdAt: string) => {
    const date = new Date(createdAt);
    return date.toLocaleDateString("ro-RO", { month: "long", year: "numeric" });
};

const HomePage = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const api = useApi();

    const [medici, setMedici] = useState<MedicAPI[]>([]);
    const [medicPage, setMedicPage] = useState(0);
    const [medicFading, setMedicFading] = useState(false);
    const MEDICI_PER_PAGE = 4;

    useEffect(() => {
        api.get<MedicAPI[]>("/api/medic/list")
            .then(setMedici)
            .catch(() => setMedici([]));
    }, []);

    const totalMediciPages = Math.ceil(medici.length / MEDICI_PER_PAGE);

    useEffect(() => {
        if (medici.length <= MEDICI_PER_PAGE) return;
        const timer = setInterval(() => {
            goToMedicPage((medicPage + 1) % totalMediciPages);
        }, 4000);
        return () => clearInterval(timer);
    }, [medici, medicPage, totalMediciPages]);

    const goToMedicPage = (page: number) => {
        setMedicFading(true);
        setTimeout(() => {
            setMedicPage(page);
            setMedicFading(false);
        }, 400);
    };

    const visibleMedici = medici.slice(
        medicPage * MEDICI_PER_PAGE,
        medicPage * MEDICI_PER_PAGE + MEDICI_PER_PAGE
    );

    const [reviews, setReviews] = useState<ReviewAPI[]>([]);
    const [reviewPage, setReviewPage] = useState(0);
    const [reviewFading, setReviewFading] = useState(false);
    const REVIEWS_PER_PAGE = 5;

    useEffect(() => {
        api.get<ReviewAPI[]>("/api/reviews/list")
            .then(setReviews)
            .catch(() => setReviews([]));
    }, []);

    const totalReviewPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);

    useEffect(() => {
        if (reviews.length <= REVIEWS_PER_PAGE) return;
        const timer = setInterval(() => {
            goToReviewPage((reviewPage + 1) % totalReviewPages);
        }, 5000);
        return () => clearInterval(timer);
    }, [reviews, reviewPage, totalReviewPages]);

    const goToReviewPage = (page: number) => {
        setReviewFading(true);
        setTimeout(() => {
            setReviewPage(page);
            setReviewFading(false);
        }, 400);
    };

    const visibleReviews = reviews.slice(
        reviewPage * REVIEWS_PER_PAGE,
        reviewPage * REVIEWS_PER_PAGE + REVIEWS_PER_PAGE
    );

    return (
        <div className="homepage">
            <Navbar />
            <HeroSlider />

            {/* Features */}
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

            {/* Medici */}
            <section id="echipa" className="team-section">
                <div className="section-container">
                    <div className="section-header">
                        <span className="section-badge">{t.teamBadge}</span>
                        <h2 className="section-title">{t.teamTitle}</h2>
                        <p className="section-subtitle">{t.teamSubtitle}</p>
                    </div>

                    {medici.length === 0 ? (
                        <p style={{ textAlign: "center", color: "#999" }}>Se încarcă medicii...</p>
                    ) : (
                        <>
                            <div className={`team-grid ${medicFading ? "team-fading" : ""}`}>
                                {visibleMedici.map((medic, idx) => (
                                    <div key={`${medic.id}-${idx}`} className="doctor-card">
                                        <div className="doctor-avatar">
                                            {getInitials(medic.firstName, medic.lastName)}
                                        </div>
                                        <div className="doctor-details">
                                            <h3 className="doctor-name">
                                                Dr. {medic.firstName} {medic.lastName}
                                            </h3>
                                            <p className="doctor-specialty">
                                                {SPECIALITY_MAP[medic.specialty] ?? "Specialist"}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {totalMediciPages > 1 && (
                                <div className="slideshow-dots">
                                    {Array.from({ length: totalMediciPages }).map((_, i) => (
                                        <button
                                            key={i}
                                            className={`slideshow-dot ${medicPage === i ? "slideshow-dot--active" : ""}`}
                                            onClick={() => goToMedicPage(i)}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>

            {/* Cum funcționează */}
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

            {/* Reviews */}
            <section id="testimoniale" className="testimonials-section">
                <div className="section-container">
                    <div className="section-header">
                        <span className="section-badge">{t.testiBadge}</span>
                        <h2 className="section-title">{t.testiTitle}</h2>
                        <p className="section-subtitle">{t.testiSubtitle}</p>
                    </div>

                    {reviews.length === 0 ? (
                        <p style={{ textAlign: "center", color: "#fff", opacity: 0.7 }}>Nu există recenzii încă.</p>
                    ) : (
                        <>
                            <div className={`testimonials-grid ${reviewFading ? "testimonials-fading" : ""}`}>
                                {visibleReviews.map((review, idx) => {
                                    const initials = review.authorName
                                        .split(" ")
                                        .map((w) => w[0])
                                        .join("")
                                        .substring(0, 2)
                                        .toUpperCase();
                                    return (
                                        <div key={`${review.id}-${idx}`} className="testimonial-card">
                                            <div className="testimonial-header">
                                                <div className="testimonial-avatar">{initials}</div>
                                                <div className="testimonial-info">
                                                    <p className="testimonial-name">{review.authorName}</p>
                                                    <p className="testimonial-date">{formatReviewDate(review.createdAt)}</p>
                                                </div>
                                            </div>
                                            <div className="testimonial-rating">
                                                {[...Array(review.rating)].map((_, i) => (
                                                    <span key={i} className="star">★</span>
                                                ))}
                                            </div>
                                            <p className="testimonial-text">"{review.reviewText}"</p>
                                            {review.isVerifiedPatient && (
                                                <div className="testimonial-verified">✓ {t.verifiedPatient}</div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            {totalReviewPages > 1 && (
                                <div className="slideshow-dots">
                                    {Array.from({ length: totalReviewPages }).map((_, i) => (
                                        <button
                                            key={i}
                                            className={`slideshow-dot ${reviewPage === i ? "slideshow-dot--active" : ""}`}
                                            onClick={() => goToReviewPage(i)}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>

            {/* CTA */}
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
