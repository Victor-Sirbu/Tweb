import "./NewsModal.css";
import { useEffect } from "react";
import type { NewsItem, NewsCategory } from "./mockNewsData";
import * as React from "react";
import { useLanguage } from "../../context/LanguageContext";

interface NewsModalProps {
    news: NewsItem | null;
    onClose: () => void;
}

const NewsModal = ({ news, onClose }: NewsModalProps) => {
    const { t, language } = useLanguage();

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        if (news) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [news, onClose]);

    if (!news) return null;

    const getCategoryColor = (category: NewsCategory): string => {
        switch (category) {
            case "Serviciu nou": return "#1e90ff";
            case "Promoție": return "#ff6b6b";
            case "Medic nou": return "#2ecc71";
            case "Actualizare preț": return "#f39c12";
            default: return "#1e90ff";
        }
    };

    const getCategoryLabel = (category: NewsCategory): string => {
        const labels: Record<string, Record<NewsCategory, string>> = {
            ru: {
                "Serviciu nou": "Новая услуга",
                "Promoție": "Акция",
                "Medic nou": "Новый врач",
                "Actualizare preț": "Обновление цены",
            },
            en: {
                "Serviciu nou": "New service",
                "Promoție": "Promotion",
                "Medic nou": "New doctor",
                "Actualizare preț": "Price update",
            },
            ro: {
                "Serviciu nou": "Serviciu nou",
                "Promoție": "Promoție",
                "Medic nou": "Medic nou",
                "Actualizare preț": "Actualizare preț",
            },
        };
        return labels[language]?.[category] ?? category;
    };

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <button className="modal-close-btn" onClick={onClose}>
                    ✕
                </button>

                <div
                    className="modal-category-badge"
                    style={{ backgroundColor: getCategoryColor(news.category) }}
                >
                    {getCategoryLabel(news.category)}
                </div>

                <h2 className="modal-title">{news.title[language]}</h2>

                <div className="modal-date">{news.date}</div>

                <div className="modal-divider"></div>

                <p className="modal-full-description">{news.fullDescription[language]}</p>

                <button className="modal-close-bottom-btn" onClick={onClose}>
                    {t.newsClose}
                </button>
            </div>
        </div>
    );
};

export default NewsModal;
