import "./ContactPage.css";
import Navbar from "../../shared/Navbar/Navbar";
import Footer from "../../shared/Footer/Footer";
import HeroSlider from "../../shared/HeroSlider/HeroSlider";
import { useLanguage } from "../../context/LanguageContext";

const ContactPage = () => {
    const { t, language } = useLanguage();


    const contactMethods = [
        {
            icon: language === "ro" ? "TELEFON" : language === "ru" ? "ТЕЛЕФОН" : "PHONE",
            title: language === "ro" ? "Sună-ne acum" : language === "ru" ? "Позвоните нам" : "Call us now",
            detail: "+373 22 123 456",
            subdetail: "+373 79 123 456"
        },
        {
            icon: language === "ro" ? "EMAIL" : language === "ru" ? "ПОЧТА" : "EMAIL",
            title: language === "ro" ? "Scrie-ne" : language === "ru" ? "Напишите нам" : "Write to us",
            detail: "contact@clinica.md",
            subdetail: "programari@clinica.md"
        },
        {
            icon: language === "ro" ? "LOCAȚIE" : language === "ru" ? "ЛОКАЦИЯ" : "LOCATION",
            title: language === "ro" ? "Vizitează-ne" : language === "ru" ? "Посетите нас" : "Visit us",
            detail: "Str. Mihai Eminescu 47",
            subdetail: "Chișinău, MD-2012"
        }
    ];

    return (
        <div className="contact-page">
            <Navbar />

            <HeroSlider
                badge={language === "ro" ? "CONTACTEAZĂ-NE" : language === "ru" ? "СВЯЖИТЕСЬ С НАМИ" : "CONTACT US"}
                title1={language === "ro" ? "Suntem mereu aici pentru" : language === "ru" ? "Мы всегда здесь для" : "We are always here for"}
                title2={language === "ro" ? "Sănătatea Ta" : language === "ru" ? "Вашего Здоровья" : "Your Health"}
                description={
                    language === "ro"
                        ? "Contactați-ne pentru programări medicale, consultații, întrebări sau feedback. Echipa noastră profesionistă de specialiști este pregătită să vă ofere îngrijirea medicală de care aveți nevoie și să răspundă tuturor întrebărilor dumneavoastră."
                        : language === "ru"
                        ? "Свяжитесь с нами для медицинских записей, консультаций, вопросов или отзывов. Наша профессиональная команда специалистов готова предоставить вам необходимую медицинскую помощь и ответить на все ваши вопросы."
                        : "Contact us for medical appointments, consultations, questions or feedback. Our professional team of specialists is ready to provide you with the healthcare you need and answer all your questions."
                }
                showButtons={false}
                showStats={false}
                showScheduleCard={false}
                customContent={
                    <div className="contact-hero-methods">
                        {contactMethods.map((method, index) => (
                            <div key={index} className="contact-method-card">
                                <div className="contact-method-icon">{method.icon}</div>
                                <div className="contact-method-title">{method.title}</div>
                                <div className="contact-method-detail">{method.detail}</div>
                                <div className="contact-method-subdetail">{method.subdetail}</div>
                            </div>
                        ))}
                    </div>
                }
            />

            <div className="contact-content">
                <div className="contact-container">
                    <div className="contact-info-section">
                        <h2 className="section-title">{t.contactInfoTitle}</h2>

                        <div className="contact-cards">
                            <div className="contact-card">
                                <div className="contact-icon-text">{language === "ro" ? "TELEFON" : language === "ru" ? "ТЕЛЕФОН" : "PHONE"}</div>
                                <h3>{t.contactPhone}</h3>
                                <p>+373 22 123 456</p>
                                <p>+373 79 123 456</p>
                            </div>

                            <div className="contact-card">
                                <div className="contact-icon-text">{language === "ro" ? "EMAIL" : language === "ru" ? "ПОЧТА" : "EMAIL"}</div>
                                <h3>{t.contactEmail}</h3>
                                <p>contact@clinica.md</p>
                                <p>programari@clinica.md</p>
                            </div>

                            <div className="contact-card">
                                <div className="contact-icon-text">{language === "ro" ? "ADRESĂ" : language === "ru" ? "АДРЕС" : "ADDRESS"}</div>
                                <h3>{t.contactAddress}</h3>
                                <p>Strada Mihai Eminescu 47</p>
                                <p>Chișinău, MD-2012</p>
                            </div>

                            <div className="contact-card">
                                <div className="contact-icon-text">{language === "ro" ? "PROGRAM" : language === "ru" ? "ГРАФИК" : "SCHEDULE"}</div>
                                <h3>{t.contactScheduleLabel}</h3>
                                <p>{t.contactScheduleVal}</p>
                                <p>{t.contactScheduleSat}</p>
                            </div>
                        </div>
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
