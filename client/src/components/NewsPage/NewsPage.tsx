import "./NewsPage.css";
import { useState } from "react";
import Navbar from "../../shared/Navbar/Navbar";
import Footer from "../../shared/Footer/Footer";
import { newsData, NewsItem, NewsCategory } from "./mockNewsData";

const NewsPage = () => {
    const [selectedCategory, setSelectedCategory] = useState<NewsCategory | "Toate">("Toate");

    const filteredNews = selectedCategory === "Toate"
        ? newsData
        : newsData.filter(item => item.category === selectedCategory);

    const categories: (NewsCategory | "Toate")[] = [
        "Toate",
        "Serviciu nou",
        "Promoție",
        "Medic nou",
        "Actualizare preț"
    ];

    const getCategoryColor = (category: NewsCategory): string => {
        switch (category) {
            case "Serviciu nou":
                return "#1e90ff";
            case "Promoție":
                return "#ff6b6b";
            case "Medic nou":
                return "#2ecc71";
            case "Actualizare preț":
                return "#f39c12";
            default:
                return "#1e90ff";
        }
    };

    return (
        <div className="news-page">
            <Navbar />

            <div className="news-hero">
                <div className="news-hero-content">
                    <h1 className="news-hero-title">Noutăți și Actualizări</h1>
                    <p className="news-hero-subtitle">
                        Află cele mai recente modificări și anunțuri ale clinicii noastre.
                    </p>
                </div>
            </div>

            <div className="news-container">
                <div className="news-filters">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`filter-btn ${selectedCategory === category ? "active" : ""}`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="news-grid">
                    {filteredNews.map((item: NewsItem) => (
                        <div key={item.id} className="news-card">
                            <div
                                className="news-category-badge"
                                style={{ backgroundColor: getCategoryColor(item.category) }}
                            >
                                {item.category}
                            </div>

                            <h3 className="news-title">{item.title}</h3>

                            <div className="news-date">{item.date}</div>

                            <p className="news-description">{item.description}</p>

                            <button className="news-btn">Vezi detalii</button>
                        </div>
                    ))}
                </div>

                {filteredNews.length === 0 && (
                    <div className="no-news">
                        <p>Nu există noutăți în această categorie momentan.</p>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default NewsPage;
