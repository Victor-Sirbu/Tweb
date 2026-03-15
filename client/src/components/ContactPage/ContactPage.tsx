import "./ContactPage.css";
import Navbar from "../../shared/Navbar/Navbar";
import Footer from "../../shared/Footer/Footer";
import HeroSlider from "../../shared/HeroSlider/HeroSlider";
import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const ContactPage = () => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert(t.contactSuccessMsg);
        setFormData({ name: "", email: "", subject: "", message: "" });
    };

    return (
        <div className="contact-page">
            <Navbar />

            <HeroSlider />

            <div className="contact-content">
                <div className="contact-container">
                    <div className="contact-info-section">
                        <h2 className="section-title">{t.contactInfoTitle}</h2>

                        <div className="contact-cards">
                            <div className="contact-card">
                                <div className="contact-icon">📞</div>
                                <h3>{t.contactPhone}</h3>
                                <p>+373 22 123 456</p>
                                <p>+373 79 123 456</p>
                            </div>

                            <div className="contact-card">
                                <div className="contact-icon">📧</div>
                                <h3>{t.contactEmail}</h3>
                                <p>contact@clinica.md</p>
                                <p>programari@clinica.md</p>
                            </div>

                            <div className="contact-card">
                                <div className="contact-icon">📍</div>
                                <h3>{t.contactAddress}</h3>
                                <p>Strada Mihai Eminescu 47</p>
                                <p>Chișinău, MD-2012</p>
                            </div>

                            <div className="contact-card">
                                <div className="contact-icon">🕐</div>
                                <h3>{t.contactScheduleLabel}</h3>
                                <p>{t.contactScheduleVal}</p>
                                <p>{t.contactScheduleSat}</p>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form-section">
                        <h2 className="section-title">{t.contactFormTitle}</h2>

                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">{t.contactFullName}</label>
                                <input type="text" id="name" name="name" value={formData.name}
                                    onChange={handleChange} placeholder={t.contactFullName} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">{t.contactEmail}</label>
                                <input type="email" id="email" name="email" value={formData.email}
                                    onChange={handleChange} placeholder="exemplu@email.com" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject">{t.contactSubject}</label>
                                <input type="text" id="subject" name="subject" value={formData.subject}
                                    onChange={handleChange} placeholder={t.contactSubject} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">{t.contactMessage}</label>
                                <textarea id="message" name="message" value={formData.message}
                                    onChange={handleChange} placeholder={t.contactMessage} rows={6} required></textarea>
                            </div>

                            <button type="submit" className="submit-btn">{t.contactSubmit}</button>
                        </form>
                    </div>

                    <div className="map-section">
                        <h2 className="section-title">{t.contactLocationTitle}</h2>
                        <div className="map-container">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2719.9999999999995!2d28.8356!3d47.0105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDAwJzM3LjgiTiAyOMKwNTAnMDguMiJF!5e0!3m2!1sen!2s!4v1234567890123"
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title={t.contactLocationTitle}
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ContactPage;
