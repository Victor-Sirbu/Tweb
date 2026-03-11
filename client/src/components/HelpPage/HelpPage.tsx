import { useState } from "react";
import "./HelpPage.css";

type FaqItem = {
    id: number;
    category: string;
    question: string;
    answer: string;
};

type GuideStep = {
    step: number;
    title: string;
    description: string;
};

type Guide = {
    id: number;
    title: string;
    color: string;
    bg: string;
    steps: GuideStep[];
};

const guides: Guide[] = [
    {
        id: 1,
        title: "Cum fac o programare",
        color: "#3a7bd5",
        bg: "#dbeafe",
        steps: [
            { step: 1, title: "Deschide Programari", description: "Apasa pe Programari in meniul din stanga." },
            { step: 2, title: "Apasa Add Appointment", description: "Butonul se afla in coltul din dreapta sus." },
            { step: 3, title: "Completeaza formularul", description: "Introdu numele pacientului, telefonul si emailul." },
            { step: 4, title: "Selecteaza medicul si ora", description: "Alege medicul dorit, data si intervalul orar." },
            { step: 5, title: "Confirma", description: "Apasa Confirma programarea. Pacientul va fi notificat." },
        ],
    },
    {
        id: 2,
        title: "Cum adaug un pacient",
        color: "#7c3aed",
        bg: "#ede9fe",
        steps: [
            { step: 1, title: "Deschide Pacienti", description: "Apasa pe Pacienti in meniul din stanga." },
            { step: 2, title: "Apasa Add Patient", description: "Butonul se afla in coltul din dreapta sus." },
            { step: 3, title: "Completeaza datele", description: "Introdu numele, varsta, telefonul si emailul pacientului." },
            { step: 4, title: "Seteaza statusul", description: "Alege Activ sau Inactiv din dropdown." },
            { step: 5, title: "Salveaza", description: "Apasa Salveaza. Pacientul apare imediat in lista." },
        ],
    },
    {
        id: 3,
        title: "Cum adaug un medic",
        color: "#0d9488",
        bg: "#ccfbf1",
        steps: [
            { step: 1, title: "Deschide Medici", description: "Apasa pe Medici in meniul din stanga." },
            { step: 2, title: "Apasa Add Doctor", description: "Butonul se afla in coltul din dreapta sus." },
            { step: 3, title: "Completeaza profilul", description: "Introdu numele, specializarea, telefonul si emailul." },
            { step: 4, title: "Salveaza", description: "Apasa Salveaza. Medicul va fi disponibil la programari." },
        ],
    },
];

const faqs: FaqItem[] = [
    { id: 1, category: "Programari", question: "Cum fac o programare?", answer: "Mergeti la sectiunea Programari din meniul lateral, apasati butonul Add Appointment, completati formularul cu datele pacientului, selectati medicul, data si ora dorita, apoi apasati Confirma programarea." },
    { id: 2, category: "Programari", question: "Cum anulez o programare?", answer: "Intrati in sectiunea Programari, gasiti programarea dorita in lista si apasati butonul Anuleaza. Vi se va cere confirmarea actiunii. Programarea va fi marcata ca Anulata si pacientul va fi notificat." },
    { id: 3, category: "Programari", question: "Pot modifica ora unei programari existente?", answer: "Da. Deschideti programarea din lista, apasati Editeaza si selectati noua data sau ora. Salvati modificarile si pacientul va primi o notificare automata." },
    { id: 4, category: "Medici", question: "Cum contactez un medic?", answer: "Accesati sectiunea Medici din meniu, selectati medicul dorit si apasati Vizualizeaza profil. Acolo veti gasi datele de contact: telefon si email." },
    { id: 5, category: "Medici", question: "Cum adaug un medic nou in sistem?", answer: "Din sectiunea Medici, apasati butonul Add Doctor din coltul din dreapta sus. Completati numele, specializarea, emailul si telefonul, apoi salvati." },
    { id: 6, category: "Pacienti", question: "Cum adaug un pacient nou?", answer: "Navigati la sectiunea Pacienti si apasati Add Patient. Completati datele pacientului: nume, varsta, telefon, email si statusul. Pacientul va aparea imediat in lista." },
    { id: 7, category: "Pacienti", question: "Cum caut un pacient?", answer: "In sectiunea Pacienti exista o bara de cautare in partea de sus. Puteti cauta dupa nume sau email. Rezultatele se filtreaza automat pe masura ce tastati." },
    { id: 8, category: "Notificari", question: "Ce tipuri de notificari exista?", answer: "Sistemul trimite 4 tipuri de notificari: Programare, Rezultat, Reamintire si Sistem. Fiecare are o culoare distincta pentru identificare rapida." },
    { id: 9, category: "Notificari", question: "Cum marchez toate notificarile ca citite?", answer: "In pagina Notificari apasati butonul Marcheaza toate ca citite din coltul din dreapta sus. Toate notificarile necitite vor fi marcate instant." },
    { id: 10, category: "Cont", question: "Cum imi schimb parola?", answer: "Accesati sectiunea Setari din meniu, apoi tab-ul Securitate. Introduceti parola actuala, noua parola si confirmati. Apasati Salveaza modificarile." },
    { id: 11, category: "Cont", question: "Ce fac daca am uitat parola?", answer: "Pe pagina de autentificare apasati Am uitat parola. Introduceti adresa de email asociata contului si veti primi un link de resetare in cateva minute." },
];

const categories = ["Toate", ...Array.from(new Set(faqs.map((f) => f.category)))];

const categoryConfig: Record<string, { color: string; bg: string }> = {
    "Programari": { color: "#3a7bd5", bg: "#dbeafe" },
    "Medici":     { color: "#0d9488", bg: "#ccfbf1" },
    "Pacienti":   { color: "#7c3aed", bg: "#ede9fe" },
    "Notificari": { color: "#d97706", bg: "#fef3c7" },
    "Cont":       { color: "#6b7280", bg: "#f3f4f6" },
};

export default function HelpPage() {
    const [activeCategory, setActiveCategory] = useState("Toate");
    const [openId, setOpenId] = useState<number | null>(null);
    const [search, setSearch] = useState("");
    const [activeGuide, setActiveGuide] = useState<number>(1);

    const filtered = faqs.filter((f) => {
        const matchCat = activeCategory === "Toate" || f.category === activeCategory;
        const matchSearch =
            f.question.toLowerCase().includes(search.toLowerCase()) ||
            f.answer.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
    });

    const toggle = (id: number) => setOpenId((prev) => (prev === id ? null : id));
    const selectedGuide = guides.find((g) => g.id === activeGuide)!;

    return (
        <div className="help-page">

            <div className="help-header">
                <h1 className="help-title">Ajutor & FAQ</h1>
                <p className="help-subtitle">Gasiti rapid raspunsuri la intrebarile frecvente</p>
            </div>

            {/* GHID RAPID */}
            <div className="guide-section">
                <h2 className="section-title">Ghid rapid</h2>
                <p className="section-subtitle">Urmati pasii de mai jos pentru actiunile principale</p>

                <div className="guide-tabs">
                    {guides.map((g) => (
                        <button
                            key={g.id}
                            className={`guide-tab ${activeGuide === g.id ? "guide-tab--active" : ""}`}
                            style={activeGuide === g.id ? { background: g.color, borderColor: g.color } : {}}
                            onClick={() => setActiveGuide(g.id)}
                        >
                            {g.title}
                        </button>
                    ))}
                </div>

                <div className="guide-steps">
                    {selectedGuide.steps.map((s, index) => (
                        <div key={s.step} className="guide-step">
                            <div className="step-left">
                                <div className="step-number" style={{ background: selectedGuide.bg, color: selectedGuide.color }}>
                                    {s.step}
                                </div>
                                {index < selectedGuide.steps.length - 1 && (
                                    <div className="step-line" style={{ background: selectedGuide.bg }} />
                                )}
                            </div>
                            <div className="step-content">
                                <span className="step-title">{s.title}</span>
                                <p className="step-desc">{s.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* SEARCH */}
            <div className="help-search-wrap">
                <input
                    className="help-search"
                    type="text"
                    placeholder="Cauta o intrebare..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* STATS */}
            <div className="help-stats">
                {Object.entries(categoryConfig).map(([cat, cfg]) => (
                    <div
                        key={cat}
                        className="stat-chip"
                        style={{ background: cfg.bg, color: cfg.color }}
                        onClick={() => { setActiveCategory(cat); setSearch(""); }}
                    >
                        <span className="stat-count">{faqs.filter((f) => f.category === cat).length}</span>
                        <span className="stat-label">{cat}</span>
                    </div>
                ))}
            </div>

            {/* FILTER TABS */}
            <div className="filter-tabs">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        className={`filter-tab ${activeCategory === cat ? "filter-tab--active" : ""}`}
                        onClick={() => setActiveCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* FAQ */}
            <div className="faq-list">
                {filtered.length === 0 && (
                    <div className="empty-state">
                        <p className="empty-text">Nu am gasit nicio intrebare pentru cautarea ta.</p>
                    </div>
                )}
                {filtered.map((f) => {
                    const cfg = categoryConfig[f.category];
                    const isOpen = openId === f.id;
                    return (
                        <div
                            key={f.id}
                            className={`faq-card ${isOpen ? "faq-card--open" : ""}`}
                            onClick={() => toggle(f.id)}
                        >
                            <div className="faq-top">
                                <div className="faq-left">
                                    <span className="faq-badge" style={{ background: cfg.bg, color: cfg.color }}>
                                        {f.category}
                                    </span>
                                    <span className="faq-question">{f.question}</span>
                                </div>
                                <span className={`faq-arrow ${isOpen ? "faq-arrow--open" : ""}`}>›</span>
                            </div>
                            {isOpen && (
                                <div className="faq-answer">
                                    <p>{f.answer}</p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* CONTACT */}
            <div className="help-contact">
                <p className="contact-text">Nu ati gasit raspunsul? Contactati echipa de suport:</p>
                <div className="contact-actions">
                    <a href="mailto:suport@cabinetmedical.md" className="contact-btn contact-btn--email">
                        suport@cabinetmedical.md
                    </a>
                    <a href="tel:+37369000000" className="contact-btn contact-btn--phone">
                        +373 69 000 000
                    </a>
                </div>
            </div>
        </div>
    );
}