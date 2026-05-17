import "./NewsPage.css";
import { useState, useEffect } from "react";
import Navbar from "../../shared/Navbar/Navbar";
import Footer from "../../shared/Footer/Footer";
import HeroSlider from "../../shared/HeroSlider/HeroSlider";
import { useLanguage } from "../../context/LanguageContext";
import { useApi } from "../../api/context";

interface NewsAPI {
    id: number;
    name: string;
    description: string;
    type: number;
    date: string;
}

type NewsCategory = "ServiciuNou" | "Promotie" | "MedicNou" | "ActualizarePret";

interface NewsItem {
    id: number;
    name: string;
    description: string;
    category: NewsCategory;
    date: string;
}

const TYPE_MAP: Record<number, NewsCategory> = {
    0: "ServiciuNou",
    1: "Promotie",
    2: "MedicNou",
    3: "ActualizarePret",
};

const CATEGORY_COLORS: Record<NewsCategory, string> = {
    ServiciuNou:      "#1e90ff",
    Promotie:         "#ff6b6b",
    MedicNou:         "#2ecc71",
    ActualizarePret:  "#f39c12",
};

const CATEGORY_LABELS: Record<string, Record<NewsCategory, string>> = {
    ro: { ServiciuNou: "Serviciu nou", Promotie: "Promoție", MedicNou: "Medic nou", ActualizarePret: "Actualizare preț" },
    ru: { ServiciuNou: "Новая услуга", Promotie: "Акция",    MedicNou: "Новый врач", ActualizarePret: "Обновление цены" },
    en: { ServiciuNou: "New service",  Promotie: "Promotion", MedicNou: "New doctor", ActualizarePret: "Price update" },
};

const NewsPage = () => {
    const { t, language } = useLanguage();
    const api = useApi();

    const [news, setNews]                   = useState<NewsItem[]>([]);
    const [loading, setLoading]             = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [selectedNews, setSelectedNews]   = useState<NewsItem | null>(null);

    useEffect(() => {
        api.get<NewsAPI[]>("/api/news/list")
            .then((data) => {
                if (data && data.length > 0) {
                    setNews(data.map((n) => ({
                        id:          n.id,
                        name:        n.name,
                        description: n.description,
                        category:    TYPE_MAP[n.type] ?? "ServiciuNou",
                        date:        n.date,
                    })));
                } else {
                    setNews([]);
                }
            })
            .catch(() => setNews([]))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelectedNews(null);
        };
        if (selectedNews) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [selectedNews]);

    const catLabels = CATEGORY_LABELS[language] ?? CATEGORY_LABELS.ro;

    const allLabel  = language === "ru" ? "Все" : language === "en" ? "All" : "Toate";

    const filterButtons: { key: string; label: string }[] = [
        { key: "all",             label: allLabel },
        { key: "ServiciuNou",     label: catLabels.ServiciuNou },
        { key: "Promotie",        label: catLabels.Promotie },
        { key: "MedicNou",        label: catLabels.MedicNou },
        { key: "ActualizarePret", label: catLabels.ActualizarePret },
    ];

    const filtered = selectedCategory === "all"
        ? news
        : news.filter((n) => n.category === selectedCategory);

    const newsStats = [
        {
            icon:  language === "ru" ? "ВСЕГО"   : language === "en" ? "TOTAL"      : "TOTAL",
            count: news.length,
            label: language === "ru" ? "Новости" : language === "en" ? "News Items" : "Noutăți",
        },
        {
            icon:  language === "ru" ? "АКЦИИ"          : language === "en" ? "PROMOTIONS"        : "PROMOȚII",
            count: news.filter((n) => n.category === "Promotie").length,
            label: language === "ru" ? "Активные акции" : language === "en" ? "Active Promotions" : "Promoții Active",
        },
        {
            icon:  language === "ru" ? "УСЛУГИ"      : language === "en" ? "SERVICES"    : "SERVICII",
            count: news.filter((n) => n.category === "ServiciuNou").length,
            label: language === "ru" ? "Новые услуги" : language === "en" ? "New Services" : "Servicii Noi",
        },
    ];


    const formatDate = (dateStr: string): string => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("ro-RO", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    };

    return (
        <div className="news-page">
            <Navbar />

            <HeroSlider
                badge={language === "ro" ? "NOUTĂȚI ȘI ACTUALIZĂRI" : language === "ru" ? "НОВОСТИ И ОБНОВЛЕНИЯ" : "NEWS & UPDATES"}
                title1={language === "ro" ? "Fii mereu la curent cu" : language === "ru" ? "Будьте всегда в курсе" : "Always stay informed about"}
                title2={language === "ro" ? "Ultimele Noutăți ale Clinicii" : language === "ru" ? "Последних Новостей Клиники" : "Latest Clinic News"}
                description={
                    language === "ro"
                        ? "Descoperiți cele mai recente servicii medicale, promoții exclusive și actualizări importante din clinica noastră."
                        : language === "ru"
                            ? "Узнайте о новейших медицинских услугах, эксклюзивных акциях и важных обновлениях в нашей клинике."
                            : "Discover the latest medical services, exclusive promotions and important updates from our clinic."
                }
                showButtons={false}
                showStats={false}
                showScheduleCard={false}
                customContent={
                    <div className="news-hero-stats">
                        {newsStats.map((stat, index) => (
                            <div key={index} className="news-stat-card">
                                <div className="news-stat-icon">{stat.icon}</div>
                                <div className="news-stat-number">{stat.count}</div>
                                <div className="news-stat-label">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                }
            />

            <div className="news-container">
                <div className="news-filters">
                    {filterButtons.map((btn) => (
                        <button
                            key={btn.key}
                            className={`filter-btn ${selectedCategory === btn.key ? "active" : ""}`}
                            onClick={() => setSelectedCategory(btn.key)}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="no-news">
                        <p>{language === "ru" ? "Загрузка..." : language === "en" ? "Loading..." : "Se încarcă..."}</p>
                    </div>
                ) : (
                    <>
                        <div className="news-grid">
                            {filtered.map((item) => (
                                <div key={item.id} className="news-card">
                                    <div
                                        className="news-category-badge"
                                        style={{ backgroundColor: CATEGORY_COLORS[item.category] }}
                                    >
                                        {catLabels[item.category]}
                                    </div>
                                    <h3 className="news-title">{item.name}</h3>
                                    <div className="news-date">{formatDate(item.date)}</div>
                                    <p className="news-description">{item.description}</p>
                                    <button className="news-btn" onClick={() => setSelectedNews(item)}>
                                        {t.newsViewDetails}
                                    </button>
                                </div>
                            ))}
                        </div>
                        {filtered.length === 0 && (
                            <div className="no-news">
                                <p>{t.newsNoItems}</p>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* ─── Modal ─────────────────────────────────────────────────────── */}
            {selectedNews && (
                <div
                    className="modal-overlay"
                    onClick={(e) => { if (e.target === e.currentTarget) setSelectedNews(null); }}
                >
                    <div className="modal-content">
                        <button className="modal-close-btn" onClick={() => setSelectedNews(null)}>✕</button>

                        <div
                            className="modal-category-badge"
                            style={{ backgroundColor: CATEGORY_COLORS[selectedNews.category] }}
                        >
                            {catLabels[selectedNews.category]}
                        </div>

                        <h2 className="modal-title">{selectedNews.name}</h2>
                        <div className="modal-date">{formatDate(selectedNews.date)}</div>
                        <div className="modal-divider"></div>
                        <p className="modal-full-description">{selectedNews.description}</p>

                        <button className="modal-close-bottom-btn" onClick={() => setSelectedNews(null)}>
                            {t.newsClose}
                        </button>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default NewsPage;
