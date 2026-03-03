import "./ContactPage.css";
import Navbar from "../../shared/Navbar/Navbar";
import Footer from "../../shared/Footer/Footer";
import { useState } from "react";

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const ContactPage = () => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert("Mesajul a fost trimis cu succes! Vă vom contacta în curând.");
        setFormData({
            name: "",
            email: "",
            subject: "",
            message: ""
        });
    };

    return (
        <div className="contact-page">
            <Navbar />
            
            <div className="contact-hero">
                <div className="contact-hero-overlay"></div>
                <div className="contact-hero-container">
                    <h1 className="contact-hero-title">Contact & Suport</h1>
                    <p className="contact-hero-description">
                        Suntem aici pentru a vă ajuta. Contactați-ne pentru programări, întrebări sau feedback.
                    </p>
                </div>
            </div>

            <div className="contact-content">
                <div className="contact-container">
                    <div className="contact-info-section">
                        <h2 className="section-title">Informații de Contact</h2>
                        
                        <div className="contact-cards">
                            <div className="contact-card">
                                <div className="contact-icon">📞</div>
                                <h3>Telefon</h3>
                                <p>+373 22 123 456</p>
                                <p>+373 79 123 456</p>
                            </div>

                            <div className="contact-card">
                                <div className="contact-icon">📧</div>
                                <h3>Email</h3>
                                <p>contact@clinica.md</p>
                                <p>programari@clinica.md</p>
                            </div>

                            <div className="contact-card">
                                <div className="contact-icon">📍</div>
                                <h3>Adresă</h3>
                                <p>Strada Mihai Eminescu 47</p>
                                <p>Chișinău, MD-2012</p>
                            </div>

                            <div className="contact-card">
                                <div className="contact-icon">🕐</div>
                                <h3>Program de Lucru</h3>
                                <p>Luni - Vineri: 08:00 - 20:00</p>
                                <p>Sâmbătă: 09:00 - 14:00</p>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form-section">
                        <h2 className="section-title">Trimite-ne un Mesaj</h2>
                        
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Nume Complet</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Introduceți numele complet"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="exemplu@email.com"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject">Subiect</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="Subiectul mesajului"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Mesaj</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Descrieți mesajul dvs..."
                                    rows={6}
                                    required
                                ></textarea>
                            </div>

                            <button type="submit" className="submit-btn">
                                Trimite Mesajul
                            </button>
                        </form>
                    </div>

                    <div className="map-section">
                        <h2 className="section-title">Locația Noastră</h2>
                        <div className="map-container">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2719.9999999999995!2d28.8356!3d47.0105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDAwJzM3LjgiTiAyOMKwNTAnMDguMiJF!5e0!3m2!1sen!2s!4v1234567890123"
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Locația Clinicii"
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
