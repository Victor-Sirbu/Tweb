import "./NewsPage.css";
import { useState } from "react";
import Navbar from "../../shared/Navbar/Navbar";
import Footer from "../../shared/Footer/Footer";
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

    return (
        <div className="news-page">
            <Navbar />
            <div className="news-hero">
                <div className="news-hero-content">
                    <h1 className="news-hero-title">{t.newsTitle}</h1>
                    <p className="news-hero-subtitle">{t.newsSubtitle}</p>
                </div>
            </div>
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
                            <h3 className="news-title">{item.title}</h3>
                            <div className="news-date">{item.date}</div>
                            <p className="news-description">{item.description}</p>
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
