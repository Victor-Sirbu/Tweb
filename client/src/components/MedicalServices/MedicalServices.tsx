import "./MedicalServices.css";
import Navbar from "../../shared/Navbar/Navbar";
import Footer from "../../shared/Footer/Footer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import heroBg1 from "../../assets/hero-bg1.jpg";
import heroBg2 from "../../assets/hero-bg2.jpg";
import heroBg3 from "../../assets/hero-bg3.jpg";
import heroBg4 from "../../assets/hero-bg4.jpg";
import heroBg5 from "../../assets/hero-bg5.jpg";
import { useLanguage } from "../../context/LanguageContext";
import { useApi } from "../../api/context";
import type { Language } from "../../context/LanguageContext";

interface ServiceAPI {
    id: number;
    serviceName: string;
    servicePrice: number;
    serviceDescription: string;
    serviceDuration: number;
    category: number;
}

interface Service {
    category: string;
    ro: { title: string; desc: string };
    ru: { title: string; desc: string };
    en: { title: string; desc: string };
    price: string;
    duration: string;
}

const CATEGORY_MAP: Record<number, string> = {
    0: "Generala",
    1: "Specialitate",
    2: "Laborator",
    3: "Imagistica",
};

const MedicalServices = () => {
    const { t, language } = useLanguage();
    const navigate = useNavigate();
    const api = useApi();
    const lang = language as Language;

    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get<ServiceAPI[]>("/api/service/list")
            .then((data) => {
                if (data && data.length > 0) {
                    setServices(data.map((s) => ({
                        category: CATEGORY_MAP[s.category] ?? "Generala",
                        ro: { title: s.serviceName, desc: s.serviceDescription },
                        ru: { title: s.serviceName, desc: s.serviceDescription },
                        en: { title: s.serviceName, desc: s.serviceDescription },
                        price: `${s.servicePrice} MDL`,
                        duration: `${s.serviceDuration} min`,
                    })));
                } else {
                    setServices([]);
                }
            })
            .catch(() => setServices([]))
            .finally(() => setLoading(false));
    }, []);

    const categories = [
        { key: "Toate",        label: t.msCatAll },
        { key: "Generala",     label: t.msCatGeneral },
        { key: "Specialitate", label: t.msCatSpec },
        { key: "Laborator",    label: t.msCatLab },
        { key: "Imagistica",   label: t.msCatImaging },
    ];

    const [activeCategoryKey, setActiveCategoryKey] = useState("Toate");
    const [searchQuery, setSearchQuery] = useState("");
    const images = [heroBg1, heroBg2, heroBg3, heroBg4, heroBg5];
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const filtered = services.filter((s) => {
        const matchCat = activeCategoryKey === "Toate" || s.category === activeCategoryKey;
        const q = searchQuery.toLowerCase().trim();
        if (!q) return matchCat;

        const catAliases: Record<string, string[]> = {
            "Generala":     ["generala", "generală", "general", "общая"],
            "Specialitate": ["specialitate", "specialty", "специальность"],
            "Laborator":    ["laborator", "laboratory", "лаборатория"],
            "Imagistica":   ["imagistica", "imagistică", "imaging", "визуализация"],
        };

        const catMatchesSearch = catAliases[s.category]?.some(
            alias => alias.includes(q) || q.includes(alias)
        ) ?? false;

        const matchSearch =
            catMatchesSearch ||
            s.ro.title.toLowerCase().includes(q) || s.ro.desc.toLowerCase().includes(q) ||
            s.ru.title.toLowerCase().includes(q) || s.ru.desc.toLowerCase().includes(q) ||
            s.en.title.toLowerCase().includes(q) || s.en.desc.toLowerCase().includes(q);

        return matchCat && matchSearch;
    });

    const activeCategoryLabel = categories.find(c => c.key === activeCategoryKey)?.label ?? t.msCatAll;

    return (
        <div className="ms-page">
            <Navbar />

            <section className="ms-hero">
                {images.map((img, index) => (
                    <div key={index} className="hero-slide" style={{
                        backgroundImage: `url(${img})`,
                        opacity: index === currentImage ? 1 : 0
                    } as React.CSSProperties}></div>
                ))}
                <div className="hero-overlay"></div>
                <div className="ms-hero-container">
                    <div className="ms-hero-content">
                        <div className="ms-hero-badge">{t.msHeroBadge}</div>
                        <h1 className="ms-hero-title">
                            {t.msHeroTitle1}<br />
                            <span className="ms-hero-highlight">{t.msHeroTitle2}</span>
                        </h1>
                        <p className="ms-hero-description">{t.msHeroDesc}</p>
                        <div className="ms-hero-buttons">
                            <button className="ms-btn-primary" onClick={() => navigate("/appointments")}>{t.msBookNow}</button>
                            <button className="ms-btn-secondary" onClick={() => navigate("/contact")}>{t.msContactUs}</button>
                        </div>
                    </div>

                    <div className="ms-hero-stats-box">
                        <div className="ms-hero-stat">
                            <span className="ms-stat-number">{services.length}+</span>
                            <span className="ms-stat-label">{t.msSpecialties}</span>
                        </div>
                        <div className="ms-stat-divider"></div>
                        <div className="ms-hero-stat">
                            <span className="ms-stat-number">30+</span>
                            <span className="ms-stat-label">{t.msDoctors}</span>
                        </div>
                        <div className="ms-stat-divider"></div>
                        <div className="ms-hero-stat">
                            <span className="ms-stat-number">24/7</span>
                            <span className="ms-stat-label">{t.msBooking}</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="ms-filter-section">
                <div className="ms-filter-container">
                    <input
                        className="ms-search-input"
                        type="text"
                        placeholder={t.msSearchPlaceholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="ms-category-tabs">
                        {categories.map((cat) => (
                            <button
                                key={cat.key}
                                className={`ms-cat-btn ${activeCategoryKey === cat.key ? "ms-cat-active" : ""}`}
                                onClick={() => setActiveCategoryKey(cat.key)}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="ms-services-section">
                <div className="ms-section-container">
                    <div className="ms-section-header">
                        <span className="ms-section-badge">{t.msAvailableSpec}</span>
                        <h2 className="ms-section-title">
                            {activeCategoryKey === "Toate" ? t.msAllServices : activeCategoryLabel}
                        </h2>
                        <p className="ms-section-subtitle">
                            {loading ? "Se încarcă..." : `${filtered.length} ${filtered.length === 1 ? t.msFound1 : t.msFoundMany}`}
                        </p>
                    </div>

                    {loading ? (
                        <div className="ms-empty-state">
                            <p style={{ fontSize: "16px", color: "#999" }}>Se încarcă serviciile...</p>
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="ms-empty-state">
                            <div className="ms-empty-icon">🔍</div>
                            <h3>{t.msNoResults}</h3>
                            <p>{t.msNoResultsHint}</p>
                        </div>
                    ) : (
                        <div className="ms-services-grid">
                            {filtered.map((service, index) => {
                                const localized = service[lang] ?? service.ro;
                                return (
                                    <div key={index} className="ms-service-card">
                                        <div className="ms-service-cat-badge">
                                            {categories.find(c => c.key === service.category)?.label ?? service.category}
                                        </div>
                                        <h3 className="ms-service-title">{localized.title}</h3>
                                        <p className="ms-service-description">{localized.desc}</p>
                                        <div className="ms-service-meta">
                                            <div className="ms-meta-item">
                                                <span className="ms-meta-label">{t.msPrice}</span>
                                                <span className="ms-meta-value">{service.price}</span>
                                            </div>
                                            <div className="ms-meta-item">
                                                <span className="ms-meta-label">{t.msDuration}</span>
                                                <span className="ms-meta-value">{service.duration}</span>
                                            </div>
                                        </div>
                                        <button className="ms-service-btn" onClick={() => navigate("/appointments")}>{t.msBookBtn}</button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default MedicalServices;
