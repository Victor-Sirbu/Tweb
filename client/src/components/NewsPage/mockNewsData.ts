export type NewsCategory = "Serviciu nou" | "Promoție" | "Medic nou" | "Actualizare preț";

export interface NewsItem {
    id: number;
    title: string;
    date: string;
    category: NewsCategory;
    description: string;
}

export const newsData: NewsItem[] = [
    {
        id: 1,
        title: "Am introdus serviciul de cardiologie pediatrică",
        date: "15 Februarie 2026",
        category: "Serviciu nou",
        description: "Clinica noastră extinde serviciile medicale cu un nou departament de cardiologie pediatrică, dedicat sănătății cardiovasculare a copiilor."
    },
    {
        id: 2,
        title: "Promoție: Pachete complete de analize la preț redus",
        date: "10 Februarie 2026",
        category: "Promoție",
        description: "În luna martie oferim reducere de 20% la pachetele complete de analize medicale. Profitați de oferta noastră pentru un bilanț complet de sănătate."
    },
    {
        id: 3,
        title: "Dra. Maria Popescu se alătură echipei noastre",
        date: "5 Februarie 2026",
        category: "Medic nou",
        description: "Cu mare bucurie anunțăm că Dra. Maria Popescu, specialist în dermatologie cu 15 ani de experiență, s-a alăturat echipei MediCare."
    },
    {
        id: 4,
        title: "Actualizare prețuri servicii de radiologie",
        date: "1 Februarie 2026",
        category: "Actualizare preț",
        description: "Din 1 martie 2026, prețurile serviciilor de radiologie digitală vor fi ajustate conform inflației și costurilor echipamentelor moderne."
    },
    {
        id: 5,
        title: "Serviciu nou: Terapie prin ultrasunete pentru recuperare",
        date: "28 Ianuarie 2026",
        category: "Serviciu nou",
        description: "Introducem terapia prin ultrasunete pentru recuperare musculară și tratarea afecțiunilor osteoarticulare. Echipament de ultimă generație."
    },
    {
        id: 6,
        title: "Ofertă specială: Consultații ORL cu reducere 30%",
        date: "20 Ianuarie 2026",
        category: "Promoție",
        description: "Pe toată luna februarie, consultațiile ORL beneficiază de o reducere de 30%. Programați-vă acum pentru un consult specializat."
    },
    {
        id: 7,
        title: "Dr. Ion Enache, specialist în neurologie, în echipa noastră",
        date: "15 Ianuarie 2026",
        category: "Medic nou",
        description: "Dr. Ion Enache, cu certificare internațională în neurologie și specializare în boli neurodegenerative, începe consultațiile la MediCare."
    },
    {
        id: 8,
        title: "Program extins pentru consultații de pediatrie",
        date: "10 Ianuarie 2026",
        category: "Serviciu nou",
        description: "Răspundem nevoilor părinților: consultațiile de pediatrie sunt acum disponibile și sâmbăta între orele 9:00-14:00."
    },
    {
        id: 9,
        title: "Actualizare tarife consultații specializate",
        date: "5 Ianuarie 2026",
        category: "Actualizare preț",
        description: "Începând cu 1 februarie 2026, tarifele consultațiilor specializate vor fi actualizate pentru a reflecta investițiile în echipamente moderne."
    },
    {
        id: 10,
        title: "Pachet complet de analize prenatale la prețuri avantajoase",
        date: "28 Decembrie 2025",
        category: "Promoție",
        description: "Oferim un pachet complet de analize prenatale cu reducere de 25%, incluzând toate investigațiile esențiale pentru o sarcină sănătoasă."
    },
    {
        id: 11,
        title: "Laborator de analize extins cu tehnologie de ultimă generație",
        date: "20 Decembrie 2025",
        category: "Serviciu nou",
        description: "Laboratorul nostru a fost extins cu aparatură modernă, reducând timpul de așteptare pentru rezultate la 24 de ore pentru majoritatea analizelor."
    },
    {
        id: 12,
        title: "Dra. Elena Ionescu, specialist în endocrinologie, în echipa MediCare",
        date: "15 Decembrie 2025",
        category: "Medic nou",
        description: "Dra. Elena Ionescu, cu experiență vastă în tratamentul diabetului și bolilor tiroidiene, începe consultațiile în clinica noastră."
    }
];
