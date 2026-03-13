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

// Each service has names and descriptions for all 3 languages, plus the raw category key
const servicesData = [
    {
        category: "Generala",
        ro: { title: "Medicina Internă",      desc: "Consultații complete pentru diagnostic și tratament al afecțiunilor interne.", det: "Evaluare medicală complexă, tratamente personalizate și monitorizare continuă." },
        ru: { title: "Внутренняя медицина",   desc: "Полные консультации по диагностике и лечению внутренних заболеваний.",        det: "Комплексная медицинская оценка, персонализированное лечение и наблюдение." },
        en: { title: "Internal Medicine",     desc: "Complete consultations for diagnosis and treatment of internal conditions.",    det: "Complex medical evaluation, personalized treatments and continuous monitoring." },
        price: "250 MDL", duration: "45 min",
    },
    {
        category: "Specialitate",
        ro: { title: "Cardiologie",            desc: "Evaluări cardiologice complete, ECG, monitorizare holter și ecocardiografie.",     det: "Prevenție și tratament boli cardiovasculare, consult specializat." },
        ru: { title: "Кардиология",            desc: "Полные кардиологические обследования, ЭКГ, мониторинг Холтера и эхокардиография.", det: "Профилактика и лечение сердечно-сосудистых заболеваний." },
        en: { title: "Cardiology",             desc: "Complete cardiology evaluations, ECG, Holter monitoring and echocardiography.",     det: "Prevention and treatment of cardiovascular diseases, specialized consultation." },
        price: "350 MDL", duration: "60 min",
    },
    {
        category: "Laborator",
        ro: { title: "Analize Medicale",       desc: "Laborator modern cu rezultate rapide și precise disponibile online.",            det: "Analize sânge, urină, teste hormonale, markeri tumorali și biochimie." },
        ru: { title: "Медицинские анализы",    desc: "Современная лаборатория с быстрыми и точными результатами онлайн.",             det: "Анализы крови, мочи, гормональные тесты, онкомаркеры и биохимия." },
        en: { title: "Medical Lab Tests",      desc: "Modern laboratory with fast, precise results available online.",                 det: "Blood, urine, hormonal tests, tumor markers and biochemistry." },
        price: "150 MDL", duration: "30 min",
    },
    {
        category: "Generala",
        ro: { title: "Medicine de Familie",    desc: "Îngrijire medicală continuă și personalizată pentru întreaga familie.",          det: "Medic de familie, vaccinări, consultații pediatrice și geriatrice." },
        ru: { title: "Семейная медицина",      desc: "Непрерывная и персонализированная медицинская помощь для всей семьи.",          det: "Семейный врач, вакцинация, педиатрические и гериатрические консультации." },
        en: { title: "Family Medicine",        desc: "Continuous and personalized medical care for the whole family.",                  det: "Family doctor, vaccinations, pediatric and geriatric consultations." },
        price: "200 MDL", duration: "40 min",
    },
    {
        category: "Specialitate",
        ro: { title: "Ortopedie",             desc: "Diagnostic și tratament afecțiuni osteo-articulare și traumatologie.",           det: "Traumatologie, recuperare medicală, infiltrații articulare." },
        ru: { title: "Ортопедия",             desc: "Диагностика и лечение костно-суставных заболеваний и травм.",                   det: "Травматология, медицинская реабилитация, суставные инъекции." },
        en: { title: "Orthopedics",           desc: "Diagnosis and treatment of bone-joint conditions and traumatology.",             det: "Traumatology, medical rehabilitation, joint infiltrations." },
        price: "400 MDL", duration: "60 min",
    },
    {
        category: "Specialitate",
        ro: { title: "Oftalmologie",          desc: "Consultații oftalmologice complete și teste de vedere avansate.",               det: "Control vedere, diagnostic glaucom, tratament cataractă și retinopatie." },
        ru: { title: "Офтальмология",         desc: "Полные офтальмологические консультации и расширенные тесты зрения.",           det: "Проверка зрения, диагностика глаукомы, лечение катаракты и ретинопатии." },
        en: { title: "Ophthalmology",         desc: "Complete ophthalmologic consultations and advanced vision tests.",              det: "Vision check, glaucoma diagnosis, cataract and retinopathy treatment." },
        price: "300 MDL", duration: "45 min",
    },
    {
        category: "Specialitate",
        ro: { title: "Neurologie",            desc: "Evaluare neurologică și tratament afecțiuni ale sistemului nervos.",            det: "Migrene, vertij, neuropatii periferice, diagnostic AVC." },
        ru: { title: "Неврология",            desc: "Неврологическая оценка и лечение заболеваний нервной системы.",                det: "Мигрень, головокружение, периферические нейропатии, диагностика инсульта." },
        en: { title: "Neurology",             desc: "Neurological evaluation and treatment of nervous system conditions.",           det: "Migraines, vertigo, peripheral neuropathies, stroke diagnosis." },
        price: "380 MDL", duration: "60 min",
    },
    {
        category: "Specialitate",
        ro: { title: "Endocrinologie",        desc: "Diagnostic și tratament afecțiuni hormonale și metabolice.",                   det: "Diabet, afecțiuni tiroidiene, tulburări metabolice și suprarenale." },
        ru: { title: "Эндокринология",        desc: "Диагностика и лечение гормональных и метаболических заболеваний.",            det: "Диабет, заболевания щитовидной железы, метаболические и надпочечниковые нарушения." },
        en: { title: "Endocrinology",         desc: "Diagnosis and treatment of hormonal and metabolic conditions.",                 det: "Diabetes, thyroid disorders, metabolic and adrenal disorders." },
        price: "350 MDL", duration: "50 min",
    },
    {
        category: "Imagistica",
        ro: { title: "Ecografie",             desc: "Ecografie abdominală, cardiacă și musculo-scheletală de înaltă rezoluție.",    det: "Aparat ecograf performant, rezultate imediate cu raport detaliat." },
        ru: { title: "УЗИ",                   desc: "Брюшное, сердечное и мышечно-скелетное УЗИ высокого разрешения.",             det: "Современный аппарат УЗИ, немедленные результаты с подробным отчётом." },
        en: { title: "Ultrasound",            desc: "Abdominal, cardiac and musculoskeletal ultrasound of high resolution.",        det: "High-performance ultrasound machine, immediate results with detailed report." },
        price: "280 MDL", duration: "30 min",
    },
];

import type { Language } from "../../context/LanguageContext";

const MedicalServices = () => {
    const { t, language } = useLanguage();
    const navigate = useNavigate();
    const lang = language as Language;

    const categories = [
        { key: "Toate",       label: t.msCatAll },
        { key: "Generala",    label: t.msCatGeneral },
        { key: "Specialitate",label: t.msCatSpec },
        { key: "Laborator",   label: t.msCatLab },
        { key: "Imagistica",  label: t.msCatImaging },
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

    const filtered = servicesData.filter((s) => {
        const matchCat = activeCategoryKey === "Toate" || s.category === activeCategoryKey;
        const q = searchQuery.toLowerCase().trim();
        if (!q) return matchCat;

        // Map category keys to their multilingual aliases for searching
        const catAliases: Record<string, string[]> = {
            "Generala":    ["generala", "generală", "general", "общая", "общей", t.msCatGeneralaAlias.toLowerCase()],
            "Specialitate":["specialitate", "specialty", "специальность", t.msCatSpecAlias.toLowerCase()],
            "Laborator":   ["laborator", "laboratory", "лаборатория", "лаборатор", t.msCatLabAlias.toLowerCase()],
            "Imagistica":  ["imagistica", "imagistică", "imaging", "визуализация", t.msCatImagAlias.toLowerCase()],
        };

        // Check if query matches this service's category in any language
        const catMatchesSearch = catAliases[s.category]?.some(alias => alias.includes(q) || q.includes(alias)) ?? false;

        // Search across all 3 languages
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
                            <button className="ms-btn-primary" onClick={() => navigate("/login")}>{t.msBookNow}</button>
                            <button className="ms-btn-secondary" onClick={() => navigate("/contact")}>{t.msContactUs}</button>
                        </div>
                    </div>

                    <div className="ms-hero-stats-box">
                        <div className="ms-hero-stat">
                            <span className="ms-stat-number">9+</span>
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
                            {filtered.length} {filtered.length === 1 ? t.msFound1 : t.msFoundMany}
                        </p>
                    </div>

                    {filtered.length === 0 ? (
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
                                        <div className="ms-service-cat-badge">{activeCategoryLabel !== t.msCatAll ? activeCategoryLabel : categories.find(c => c.key === service.category)?.label}</div>
                                        <h3 className="ms-service-title">{localized.title}</h3>
                                        <p className="ms-service-description">{localized.desc}</p>
                                        <p className="ms-service-details">{localized.det}</p>
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
                                        <button className="ms-service-btn">{t.msBookBtn}</button>
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
