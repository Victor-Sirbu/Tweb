import type { Language } from "../context/LanguageContext";

export const translateSpecialization = (specialization: string, language: Language): string => {
    const normalized = specialization.toLowerCase().trim();

    const translations: Record<string, Record<Language, string>> = {
        // Cardiologie
        "cardiologie": { ro: "Cardiologie", en: "Cardiology", ru: "Кардиология" },
        "cardiology": { ro: "Cardiologie", en: "Cardiology", ru: "Кардиология" },
        "кардиология": { ro: "Cardiologie", en: "Cardiology", ru: "Кардиология" },

        // Pediatrie
        "pediatrie": { ro: "Pediatrie", en: "Pediatrics", ru: "Педиатрия" },
        "pediatrics": { ro: "Pediatrie", en: "Pediatrics", ru: "Педиатрия" },
        "педиатрия": { ro: "Pediatrie", en: "Pediatrics", ru: "Педиатрия" },

        // Medicina Generală / Internă
        "medicina generală": { ro: "Medicina Generală", en: "General Medicine", ru: "Общая медицина" },
        "medicină generală": { ro: "Medicina Generală", en: "General Medicine", ru: "Общая медицина" },
        "general medicine": { ro: "Medicina Generală", en: "General Medicine", ru: "Общая медицина" },
        "общая медицина": { ro: "Medicina Generală", en: "General Medicine", ru: "Общая медицина" },
        "medicină internă": { ro: "Medicină Internă", en: "Internal Medicine", ru: "Внутренняя медицина" },
        "medicina internă": { ro: "Medicină Internă", en: "Internal Medicine", ru: "Внутренняя медицина" },
        "internal medicine": { ro: "Medicină Internă", en: "Internal Medicine", ru: "Внутренняя медицина" },
        "внутренняя медицина": { ro: "Medicină Internă", en: "Internal Medicine", ru: "Внутренняя медицина" },

        // Ortopedie
        "ortopedie": { ro: "Ortopedie", en: "Orthopedics", ru: "Ортопедия" },
        "orthopedics": { ro: "Ortopedie", en: "Orthopedics", ru: "Ортопедия" },
        "ортопедия": { ro: "Ortopedie", en: "Orthopedics", ru: "Ортопедия" },

        // Dermatologie
        "dermatologie": { ro: "Dermatologie", en: "Dermatology", ru: "Дерматология" },
        "dermatology": { ro: "Dermatologie", en: "Dermatology", ru: "Дерматология" },
        "дерматология": { ro: "Dermatologie", en: "Dermatology", ru: "Дерматология" },

        // Neurologie
        "neurologie": { ro: "Neurologie", en: "Neurology", ru: "Неврология" },
        "neurology": { ro: "Neurologie", en: "Neurology", ru: "Неврология" },
        "неврология": { ro: "Neurologie", en: "Neurology", ru: "Неврология" },

        // ORL
        "orl": { ro: "ORL", en: "ENT", ru: "ЛОР" },
        "ent": { ro: "ORL", en: "ENT", ru: "ЛОР" },
        "лор": { ro: "ORL", en: "ENT", ru: "ЛОР" },

        // Oftalmologie
        "oftalmologie": { ro: "Oftalmologie", en: "Ophthalmology", ru: "Офтальмология" },
        "ophthalmology": { ro: "Oftalmologie", en: "Ophthalmology", ru: "Офтальмология" },
        "офтальмология": { ro: "Oftalmologie", en: "Ophthalmology", ru: "Офтальмология" },
    };

    // Verifică dacă există traducere
    const translation = translations[normalized];
    if (translation) {
        return translation[language];
    }

    // Dacă nu găsește traducere, returnează originalul
    return specialization;
};

// Helper pentru traducerea cuvântului "Specializare"
export const getSpecializationLabel = (language: Language): string => {
    const labels: Record<Language, string> = {
        ro: "Specializare",
        en: "Specialization",
        ru: "Специализация",
    };
    return labels[language];
};
