import "./NewsPage.css";
import { useState } from "react";
import Navbar from "../../shared/Navbar/Navbar";
import Footer from "../../shared/Footer/Footer";
import HeroSlider from "../../shared/HeroSlider/HeroSlider";
import NewsModal from "./NewsModal";
import { newsData } from "./mockNewsData";
import type { NewsItem, NewsCategory } from "./mockNewsData";
import { useLanguage } from "../../context/LanguageContext";

const NewsPage = () => {
    const { t, language } = useLanguage();
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

    const rawCategories: NewsCategory[] = ["Serviciu nou", "Promoție", "Medic nou", "Actualizare preț"];

    const getCategoryLabels = () => {
        if (language === "ru") return { "all": "Все", "Serviciu nou": "Новая услуга", "Promoție": "Акция", "Medic nou": "Новый врач", "Actualizare preț": "Обновление цены" };
        if (language === "en") return { "all": "All", "Serviciu nou": "New service", "Promoție": "Promotion", "Medic nou": "New doctor", "Actualizare preț": "Price update" };
        return { "all": "Toate", "Serviciu nou": "Serviciu nou", "Promoție": "Promoție", "Medic nou": "Medic nou", "Actualizare preț": "Actualizare preț" };
    };
    const labels = getCategoryLabels();

    const filteredNews = selectedCategory === "all"
        ? newsData
        : newsData.filter(item => item.category === selectedCategory);

    const getCategoryColor = (category: NewsCategory): string => {
        switch (category) {
            case "Serviciu nou": return "#1e90ff";
            case "Promoție": return "#ff6b6b";
            case "Medic nou": return "#2ecc71";
            case "Actualizare preț": return "#f39c12";
            default: return "#1e90ff";
        }
    };

    const newsStats = [
        {
            icon: language === "ro" ? "TOTAL" : language === "ru" ? "ВСЕГО" : "TOTAL",
            count: newsData.length,
            label: language === "ro" ? "Noutăți" : language === "ru" ? "Новости" : "News Items"
        },
        {
            icon: language === "ro" ? "PROMOȚII" : language === "ru" ? "АКЦИИ" : "PROMOTIONS",
            count: newsData.filter(n => n.category === "Promoție").length,
            label: language === "ro" ? "Promoții Active" : language === "ru" ? "Активные акции" : "Active Promotions"
        },
        {
            icon: language === "ro" ? "SERVICII" : language === "ru" ? "УСЛУГИ" : "SERVICES",
            count: newsData.filter(n => n.category === "Serviciu nou").length,
            label: language === "ro" ? "Servicii Noi" : language === "ru" ? "Новые услуги" : "New Services"
        }
    ];

    return (
        <div className="news-page">
            <Navbar />
            <HeroSlider
                badge={language === "ro" ? "NOUTĂȚI ȘI ACTUALIZĂRI" : language === "ru" ? "НОВОСТИ И ОБНОВЛЕНИЯ" : "NEWS & UPDATES"}
                title1={language === "ro" ? "Fii mereu la curent cu" : language === "ru" ? "Будьте всегда в курсе" : "Always stay informed about"}
                title2={language === "ro" ? "Ultimele Noutăți ale Clinicii" : language === "ru" ? "Последних Новостей Клиники" : "Latest Clinic News"}
                description={
                    language === "ro"
                        ? "Descoperiți cele mai recente servicii medicale, promoții exclusive și actualizări importante din clinica noastră. Suntem dedicați să vă ținem la curent cu toate inovațiile și oportunitățile pentru îngrijirea dumneavoastră."
                        : language === "ru"
                        ? "Узнайте о новейших медицинских услугах, эксклюзивных акциях и важных обновлениях в нашей клинике. Мы стремимся держать вас в курсе всех инноваций и возможностей для вашего здоровья."
                        : "Discover the latest medical services, exclusive promotions and important updates from our clinic. We are dedicated to keeping you informed about all innovations and opportunities for your healthcare."
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
                    <button className={`filter-btn ${selectedCategory === "all" ? "active" : ""}`} onClick={() => setSelectedCategory("all")}>{labels.all}</button>
                    {rawCategories.map((category) => (
                        <button key={category} className={`filter-btn ${selectedCategory === category ? "active" : ""}`} onClick={() => setSelectedCategory(category)}>
                            {labels[category as keyof typeof labels]}
                        </button>
                    ))}
                </div>
                <div className="news-grid">
                    {filteredNews.map((item: NewsItem) => (
                        <div key={item.id} className="news-card">
                            <div className="news-category-badge" style={{ backgroundColor: getCategoryColor(item.category) }}>
                                {labels[item.category as keyof typeof labels]}
                            </div>
                            <h3 className="news-title">{item.title[language]}</h3>
                            <div className="news-date">{item.date}</div>
                            <p className="news-description">{item.description[language]}</p>
                            <button className="news-btn" onClick={() => setSelectedNews(item)}>{t.newsViewDetails}</button>
                        </div>
                    ))}
                </div>
                {filteredNews.length === 0 && <div className="no-news"><p>{t.newsNoItems}</p></div>}
            </div>
            <NewsModal news={selectedNews} onClose={() => setSelectedNews(null)} />
            <Footer />
        </div>
    );
};

export default NewsPage;
