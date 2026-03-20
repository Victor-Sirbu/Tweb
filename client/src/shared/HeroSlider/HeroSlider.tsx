import "./HeroSlider.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import heroBg1 from "../../assets/hero-bg1.jpg";
import heroBg2 from "../../assets/hero-bg2.jpg";
import heroBg3 from "../../assets/hero-bg3.jpg";
import heroBg4 from "../../assets/hero-bg4.jpg";
import heroBg5 from "../../assets/hero-bg5.jpg";
import { useLanguage } from "../../context/LanguageContext";

interface HeroSliderProps {
    badge?: string;
    title1?: string;
    title2?: string;
    description?: string;
    showButtons?: boolean;
    showStats?: boolean;
    showScheduleCard?: boolean;
    customContent?: React.ReactNode;
}

const HeroSlider = ({
    badge,
    title1,
    title2,
    description,
    showButtons = true,
    showStats = true,
    showScheduleCard = true,
    customContent
}: HeroSliderProps) => {
    const { t } = useLanguage();
    const navigate = useNavigate();

    const images = [heroBg1, heroBg2, heroBg3, heroBg4, heroBg5];
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="hero-section">
            {images.map((img, index) => (
                <div key={index} className="hero-slide" style={{
                    backgroundImage: `url(${img})`,
                    opacity: index === currentImage ? 1 : 0
                } as React.CSSProperties}></div>
            ))}
            <div className="hero-overlay"></div>
            <div className="hero-container">
                <div className="hero-content">
                    <div className="hero-badge">{badge || t.heroBadge}</div>
                    <h1 className="hero-title">
                        {title1 || t.heroTitle1}<br />
                        <span className="hero-highlight">{title2 || t.heroTitle2}</span>
                    </h1>
                    <p className="hero-description">{description || t.heroDesc}</p>
                    {showButtons && (
                        <div className="hero-buttons">
                            <button className="btn-primary" onClick={() => navigate("/appointments")}>{t.heroBook}</button>
                            <button className="btn-secondary" onClick={() => navigate("/contact")}>{t.heroContact}</button>
                        </div>
                    )}
                    {showStats && (
                        <div className="hero-stats">
                            <div className="stat-item">
                                <span className="stat-number">25,000+</span>
                                <span className="stat-label">{t.statPatients}</span>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <span className="stat-number">30+</span>
                                <span className="stat-label">{t.statDoctors}</span>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <span className="stat-number">15</span>
                                <span className="stat-label">{t.statYears}</span>
                            </div>
                        </div>
                    )}
                </div>

                {showScheduleCard && (
                    <div className="hero-schedule-card">
                        <h3 className="schedule-title">{t.scheduleTitle}</h3>
                        <div className="schedule-item">
                            <span className="schedule-day">{t.schedMonFri}</span>
                            <span className="schedule-time">08:00 - 20:00</span>
                        </div>
                        <div className="schedule-divider"></div>
                        <div className="schedule-item">
                            <span className="schedule-day">{t.schedSat}</span>
                            <span className="schedule-time">09:00 - 14:00</span>
                        </div>
                        <div className="schedule-divider"></div>
                        <div className="schedule-item">
                            <span className="schedule-day">{t.schedSun}</span>
                            <span className="schedule-time closed">{t.closed}</span>
                        </div>
                    </div>
                )}

                {customContent}

            </div>
        </section>
    );
};

export default HeroSlider;
