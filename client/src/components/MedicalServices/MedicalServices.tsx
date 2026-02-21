import "./MedicalServices.css";
import Navbar from "../../shared/Navbar/Navbar";
import Footer from "../../shared/Footer/Footer";
import { useState } from "react";

const allServices = [
    {
        title: "Medicina Interna",
        category: "Generala",
        description: "Consultatii complete pentru diagnostic si tratament al afectiunilor interne.",
        details: "Evaluare medicala complexa, tratamente personalizate si monitorizare continua.",
        price: "250 MDL",
        duration: "45 min",
        abbr: "MI"
    },
    {
        title: "Cardiologie",
        category: "Specialitate",
        description: "Evaluari cardiologice complete, ECG, monitorizare holter si ecocardiografie.",
        details: "Preventie si tratament boli cardiovasculare, consult specializat.",
        price: "350 MDL",
        duration: "60 min",
        abbr: "CR"
    },
    {
        title: "Analize Medicale",
        category: "Laborator",
        description: "Laborator modern cu rezultate rapide si precise disponibile online.",
        details: "Analize sange, urina, teste hormonale, markeri tumorali si biochimie.",
        price: "150 MDL",
        duration: "30 min",
        abbr: "AM"
    },
    {
        title: "Medicina de Familie",
        category: "Generala",
        description: "Ingrijire medicala continua si personalizata pentru intreaga familie.",
        details: "Medic de familie, vaccinari, consultatii pediatrice si geriatrice.",
        price: "200 MDL",
        duration: "40 min",
        abbr: "MF"
    },
    {
        title: "Ortopedie",
        category: "Specialitate",
        description: "Diagnostic si tratament afectiuni osteo-articulare si traumatologie.",
        details: "Traumatologie, recuperare medicala, infiltratii articulare.",
        price: "400 MDL",
        duration: "60 min",
        abbr: "OR"
    },
    {
        title: "Oftalmologie",
        category: "Specialitate",
        description: "Consultatii oftalmologice complete si teste de vedere avansate.",
        details: "Control vedere, diagnostic glaucom, tratament cataracta si retinopatie.",
        price: "300 MDL",
        duration: "45 min",
        abbr: "OF"
    },
    {
        title: "Neurologie",
        category: "Specialitate",
        description: "Evaluare neurologica si tratament afectiuni ale sistemului nervos.",
        details: "Migrene, vertij, neuropatii periferice, diagnostic AVC.",
        price: "380 MDL",
        duration: "60 min",
        abbr: "NR"
    },
    {
        title: "Endocrinologie",
        category: "Specialitate",
        description: "Diagnostic si tratament afectiuni hormonale si metabolice.",
        details: "Diabet, afectiuni tiroidiene, tulburari metabolice si suprarenale.",
        price: "350 MDL",
        duration: "50 min",
        abbr: "EN"
    },
    {
        title: "Ecografie",
        category: "Imagistica",
        description: "Ecografie abdominala, cardiaca si musculo-scheletala de inalta rezolutie.",
        details: "Aparat ecograf performant, rezultate imediate cu raport detaliat.",
        price: "280 MDL",
        duration: "30 min",
        abbr: "EC"
    }
];

const categories = ["Toate", "Generala", "Specialitate", "Laborator", "Imagistica"];

const MedicalServices = () => {
    const [activeCategory, setActiveCategory] = useState("Toate");
    const [searchQuery, setSearchQuery] = useState("");

    const filtered = allServices.filter((s) => {
        const matchCat = activeCategory === "Toate" || s.category === activeCategory;
        const matchSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCat && matchSearch;
    });

    return (
        <div className="ms-page">

            <Navbar />

            <section className="ms-hero">
                <div className="ms-hero-container">
                    <div className="ms-hero-content">
                        <div className="ms-hero-badge">Servicii Medicale</div>
                        <h1 className="ms-hero-title">
                            Servicii Medicale<br />
                            <span className="ms-hero-highlight">de Înaltă Calitate</span>
                        </h1>
                        <p className="ms-hero-description">
                            Oferim o gamă completă de servicii medicale cu echipamente de ultimă generație și
                            o echipă de specialiști dedicată sănătății tale. Programare rapidă, rezultate precise.
                        </p>
                        <div className="ms-hero-buttons">
                            <button className="ms-btn-primary">Programează Acum</button>
                            <button className="ms-btn-secondary">Contactează-ne</button>
                        </div>
                    </div>

                    <div className="ms-hero-stats-box">
                        <div className="ms-hero-stat">
                            <span className="ms-stat-number">9+</span>
                            <span className="ms-stat-label">Specialități</span>
                        </div>
                        <div className="ms-stat-divider"></div>
                        <div className="ms-hero-stat">
                            <span className="ms-stat-number">30+</span>
                            <span className="ms-stat-label">Medici</span>
                        </div>
                        <div className="ms-stat-divider"></div>
                        <div className="ms-hero-stat">
                            <span className="ms-stat-number">24/7</span>
                            <span className="ms-stat-label">Programare</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="ms-filter-section">
                <div className="ms-filter-container">
                    <input
                        className="ms-search-input"
                        type="text"
                        placeholder="Caută un serviciu medical..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="ms-category-tabs">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                className={`ms-cat-btn ${activeCategory === cat ? "ms-cat-active" : ""}`}
                                onClick={() => setActiveCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="ms-services-section">
                <div className="ms-section-container">
                    <div className="ms-section-header">
                        <span className="ms-section-badge">Specialități Disponibile</span>
                        <h2 className="ms-section-title">
                            {activeCategory === "Toate" ? "Toate Serviciile Noastre" : activeCategory}
                        </h2>
                        <p className="ms-section-subtitle">
                            {filtered.length} {filtered.length === 1 ? "serviciu găsit" : "servicii găsite"}
                        </p>
                    </div>

                    {filtered.length === 0 ? (
                        <div className="ms-empty-state">
                            <div className="ms-empty-icon">🔍</div>
                            <h3>Niciun serviciu găsit</h3>
                            <p>Încearcă o altă căutare sau selectează o altă categorie.</p>
                        </div>
                    ) : (
                        <div className="ms-services-grid">
                            {filtered.map((service, index) => (
                                <div key={index} className="ms-service-card">
                                    <div className="ms-service-abbr">{service.abbr}</div>
                                    <div className="ms-service-cat-badge">{service.category}</div>
                                    <h3 className="ms-service-title">{service.title}</h3>
                                    <p className="ms-service-description">{service.description}</p>
                                    <p className="ms-service-details">{service.details}</p>
                                    <div className="ms-service-meta">
                                        <div className="ms-meta-item">
                                            <span className="ms-meta-label">Preț</span>
                                            <span className="ms-meta-value">{service.price}</span>
                                        </div>
                                        <div className="ms-meta-item">
                                            <span className="ms-meta-label">Durată</span>
                                            <span className="ms-meta-value">{service.duration}</span>
                                        </div>
                                    </div>
                                    <button className="ms-service-btn">Programează →</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <section className="ms-cta-section">
                <div className="ms-cta-container">
                    <div className="ms-cta-content">
                        <h2 className="ms-cta-title">Nu găsești ce cauți?</h2>
                        <p className="ms-cta-description">
                            Contactează-ne și îți vom recomanda cel mai potrivit medic specialist pentru nevoile tale.
                        </p>
                        <div className="ms-cta-buttons">
                            <button className="ms-cta-btn-primary">Sună Acum</button>
                            <button className="ms-cta-btn-secondary">Trimite Mesaj</button>
                        </div>
                    </div>
                    <div className="ms-cta-stats">
                        <div className="ms-cta-stat">
                            <span className="ms-cta-stat-number">98%</span>
                            <span className="ms-cta-stat-label">Satisfacție Pacienți</span>
                        </div>
                        <div className="ms-cta-stat">
                            <span className="ms-cta-stat-number">&lt;2h</span>
                            <span className="ms-cta-stat-label">Timp Răspuns</span>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

        </div>
    );
};

export default MedicalServices;
