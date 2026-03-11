export type NewsCategory = "Serviciu nou" | "Promoție" | "Medic nou" | "Actualizare preț";

export interface NewsItem {
    id: number;
    title: string;
    date: string;
    category: NewsCategory;
    description: string;
    fullDescription: string;
}

export const newsData: NewsItem[] = [
    {
        id: 1,
        title: "Am introdus serviciul de cardiologie pediatrică",
        date: "15 Februarie 2026",
        category: "Serviciu nou",
        description: "Clinica noastră extinde serviciile medicale cu un nou departament de cardiologie pediatrică, dedicat sănătății cardiovasculare a copiilor.",
        fullDescription: "Cu mândrie anunțăm deschiderea departamentului de cardiologie pediatrică la MediCare. Acest serviciu nou vine ca răspuns la cererea crescândă pentru servicii medicale specializate pentru copii. Echipa noastră este formată din cardiologi pediatri cu certificare internațională și experiență vastă în tratarea afecțiunilor cardiovasculare la copii, de la nou-născuți până la adolescenți. Departamentul este dotat cu echipamente moderne de diagnostic: ecograf cardiac de ultimă generație, EKG pediatric, monitoring Holter și test de efort adaptat pentru copii. Serviciile includ: consultații cardiologice complete, diagnosticarea și tratarea malformațiilor cardiace congenitale, monitorizarea bolilor cardiace dobândite, evaluări pre și post-operatorii, precum și consiliere pentru familii. Programările se pot face online sau telefonic, de luni până vineri între 8:00-18:00."
    },
    {
        id: 2,
        title: "Promoție: Pachete complete de analize la preț redus",
        date: "10 Februarie 2026",
        category: "Promoție",
        description: "În luna martie oferim reducere de 20% la pachetele complete de analize medicale. Profitați de oferta noastră pentru un bilanț complet de sănătate.",
        fullDescription: "În luna martie 2026, MediCare oferă o promoție specială pentru pachetele complete de analize medicale. Beneficiați de o reducere de 20% la toate pachetele de analize: Pachetul CHECK-UP COMPLET (hemoleucogramă, biochimie completă, analize hormonale, markeri tumorali), Pachetul CARDIOVASCULAR (profil lipidic, troponine, D-dimeri, electroliți), Pachetul DIABET (glicemie, hemoglobină glicată, insulină, profil lipidic) și Pachetul TIROIDA (TSH, T3, T4, anticorpi antitiroidieni). Toate analizele se efectuează cu echipamente de ultimă generație, iar rezultatele sunt disponibile în format digital în maxim 24 de ore. Promoția este valabilă pentru programări efectuate în luna martie, cu prelevare între 1-31 martie 2026. Pentru programări, sunați la +373 22 123 456 sau rezervați online prin platforma noastră. Oferta nu se cumulează cu alte reduceri."
    },
    {
        id: 3,
        title: "Dra. Maria Popescu se alătură echipei noastre",
        date: "5 Februarie 2026",
        category: "Medic nou",
        description: "Cu mare bucurie anunțăm că Dra. Maria Popescu, specialist în dermatologie cu 15 ani de experiență, s-a alăturat echipei MediCare.",
        fullDescription: "Echipa MediCare se extinde cu un specialist de renume în domeniul dermatologiei. Dra. Maria Popescu are o experiență de 15 ani în tratarea afecțiunilor dermatologice și este absolventă a Universității de Medicină și Farmacie din București, cu specializare în dermato-venerologie la Spitalul Clinic de Dermatologie București. A urmat cursuri de perfecționare în dermatologie estetică și dermatoscopie digitală în Franța și Germania. Dra. Popescu tratează afecțiuni precum: acnee, psoriazis, dermatită atopică, vitiligo, infecții fungice, alergii cutanate, și oferă servicii de dermatologie estetică: tratamente anti-aging, mezoterapie, peelinguri chimice. Consultațiile includ dermatoscopie digitală pentru screening-ul cancerului de piele. Programările pentru consultații cu Dra. Popescu se pot face începând de astăzi, de luni până joi între 10:00-17:00."
    },
    {
        id: 4,
        title: "Actualizare prețuri servicii de radiologie",
        date: "1 Februarie 2026",
        category: "Actualizare preț",
        description: "Din 1 martie 2026, prețurile serviciilor de radiologie digitală vor fi ajustate conform inflației și costurilor echipamentelor moderne.",
        fullDescription: "Începând cu 1 martie 2026, tarifele pentru serviciile de radiologie digitală vor suferi ajustări minore pentru a reflecta creșterea costurilor operaționale și investițiile în echipamente de ultimă generație. Noile tarife: Radiografie digitală torace - 350 MDL (față de 320 MDL), Radiografie digitală coloană vertebrală - 400 MDL (față de 370 MDL), Radiografie digitală membre - 300 MDL (față de 280 MDL), Radiografie digitală abdomen - 380 MDL (față de 350 MDL). Aceste ajustări sunt necesare pentru menținerea standardelor înalte de calitate și pentru achiziționarea de echipamente moderne care oferă imagini de rezoluție superioară și expunere redusă la radiații. Pacienții cu abonamente medicale sau asigurări private vor beneficia în continuare de acoperire completă sau parțială conform contractelor. Apreciem înțelegerea dumneavoastră și vă asigurăm că oferim în continuare cele mai competitive prețuri din regiune."
    },
    {
        id: 5,
        title: "Serviciu nou: Terapie prin ultrasunete pentru recuperare",
        date: "28 Ianuarie 2026",
        category: "Serviciu nou",
        description: "Introducem terapia prin ultrasunete pentru recuperare musculară și tratarea afecțiunilor osteoarticulare. Echipament de ultimă generație.",
        fullDescription: "MediCare investește în sănătatea pacienților și introduce un serviciu nou de fizioterapie: terapia prin ultrasunete medicale. Acest tratament non-invaziv este eficient în tratarea: dureri musculare cronice, tendinite, bursită, artroză, recuperare post-traumatică, contracturi musculare, cicatrici și aderențe. Am achiziționat un aparat profesional de ultrasunoterapie cu frecvență variabilă (1-3 MHz) și intensitate reglabilă, care permite tratamente personalizate. Beneficiile includ: reducerea inflamației și durerii, accelerarea vindecării țesuturilor, îmbunătățirea circulației sanguine, relaxarea musculară profundă. Ședințele durează 15-30 minute și sunt recomandate cure de 10-15 ședințe. Serviciul este disponibil de luni până vineri între 9:00-18:00. Tarif per ședință: 250 MDL. Pachete avantajoase: 10 ședințe - 2200 MDL (economie 300 MDL). Programări la +373 22 123 456."
    },
    {
        id: 6,
        title: "Ofertă specială: Consultații ORL cu reducere 30%",
        date: "20 Ianuarie 2026",
        category: "Promoție",
        description: "Pe toată luna februarie, consultațiile ORL beneficiază de o reducere de 30%. Programați-vă acum pentru un consult specializat.",
        fullDescription: "În luna februarie 2026, MediCare oferă o campanie specială de prevenție ORL cu reducere de 30% la toate consultațiile de otorinolaringologie. Consultația standard ORL costă normal 500 MDL, în februarie doar 350 MDL. Consultația include: examinare completă ORL, laringoscopie indirectă, rinoscopia, otoscopie, evaluare audiometrică de bază. Dr. Ana Munteanu, medicul nostru ORL cu 12 ani de experiență, va efectua consultații în zilele de marți, joi și vineri între 10:00-16:00. Această promoție este ideală pentru: persoanele cu rinite alergice sau cronice, pacienți cu probleme de auz, copii cu infecții recurente ORL, adulți cu amigdalite cronice, evaluări pre-operatorii. Promoția este valabilă doar în luna februarie pentru programări noi. Pentru a beneficia de reducere, menționați codul promoțional 'ORL30' la programare. Locurile sunt limitate, așa că vă recomandăm să vă programați cât mai curând."
    },
    {
        id: 7,
        title: "Dr. Ion Enache, specialist în neurologie, în echipa noastră",
        date: "15 Ianuarie 2026",
        category: "Medic nou",
        description: "Dr. Ion Enache, cu certificare internațională în neurologie și specializare în boli neurodegenerative, începe consultațiile la MediCare.",
        fullDescription: "Cu deosebită plăcere anunțăm că Dr. Ion Enache s-a alăturat echipei MediCare. Dr. Enache este medic specialist neurolog cu certificare europeană și o experiență de 18 ani în domeniu. A absolvit Universitatea de Medicină și Farmacie Carol Davila București și a făcut fellowships în boli neurodegenerative la clinici de prestigiu din Austria și Elveția. Expertiza sa include: boli Parkinson și Alzheimer, scleroza multiplă, epilepsie, migrene și cefalee, neuropatii periferice, accidente vasculare cerebrale (prevenție și recuperare), tulburări de somn, vertij și tulburări de echilibru. Dr. Enache utilizează tehnici moderne de diagnostic: electroencefalografie (EEG), electromiografie (EMG), evaluare neuro-psihologică. Consultațiile se desfășoară luni, miercuri și vineri între 14:00-19:00. Tarif consultație: 600 MDL. Pentru programări, sunați la +373 22 123 456 sau rezervați online."
    },
    {
        id: 8,
        title: "Program extins pentru consultații de pediatrie",
        date: "10 Ianuarie 2026",
        category: "Serviciu nou",
        description: "Răspundem nevoilor părinților: consultațiile de pediatrie sunt acum disponibile și sâmbăta între orele 9:00-14:00.",
        fullDescription: "Ascultând feedback-ul părinților, MediCare extinde programul de consultații pediatrice și în zilele de sâmbătă. Înțelegem că mulți părinți lucrează în timpul săptămânii și au dificultăți în a-și programa copiii pentru consultații. De aceea, începând cu 15 ianuarie 2026, Dr. Cristina Vasile, medicul nostru pediatru, va fi disponibilă și sâmbăta între 9:00-14:00. Servicii disponibile sâmbăta: consultații pediatrice generale, vaccinări conform schemei naționale și opționale, consulturi pentru afecțiuni acute (febră, tuse, dureri), evaluări de creștere și dezvoltare, consiliere nutrițională pentru copii, interpretare analize medicale. Tarifele rămân neschimbate: consultație pediatrică - 400 MDL, vaccinări - conform listei de prețuri. Pentru a evita aglomerația, vă rugăm să vă programați din timp. Programări telefonice la +373 22 123 456 sau online pe site-ul nostru. Locurile pentru sâmbătă sunt limitate la 15 consultații pe zi."
    },
    {
        id: 9,
        title: "Actualizare tarife consultații specializate",
        date: "5 Ianuarie 2026",
        category: "Actualizare preț",
        description: "Începând cu 1 februarie 2026, tarifele consultațiilor specializate vor fi actualizate pentru a reflecta investițiile în echipamente moderne.",
        fullDescription: "Începând cu 1 februarie 2026, MediCare actualizează tarifele pentru consultațiile specializate ca urmare a investițiilor semnificative în echipamente medicale de ultimă generație și în formarea continuă a echipei medicale. Noile tarife: Consultație cardiologie - 650 MDL (față de 600 MDL), Consultație gastroenterologie - 600 MDL (față de 550 MDL), Consultație endocrinologie - 600 MDL (față de 550 MDL), Consultație reumatologie - 550 MDL (față de 500 MDL), Consultație dermatologie - 500 MDL (față de 450 MDL). Consultațiile de medicină generală rămân la 350 MDL. Toți pacienții cu programări confirmate înainte de 1 februarie vor beneficia de tarifele vechi. Investițiile noastre includ: ecograf cardiac 4D, fibroscop digestiv cu tehnologie NBI, densitometru osos, dermatoscop digital. Aceste echipamente ne permit diagnostice mai precise și tratamente mai eficiente. Prețurile noastre rămân competitive și includ consultația completă cu recomandări detaliate."
    },
    {
        id: 10,
        title: "Pachet complet de analize prenatale la prețuri avantajoase",
        date: "28 Decembrie 2025",
        category: "Promoție",
        description: "Oferim un pachet complet de analize prenatale cu reducere de 25%, incluzând toate investigațiile esențiale pentru o sarcină sănătoasă.",
        fullDescription: "MediCare lansează un pachet special pentru viitoarele mămici: Pachetul Prenatal Complet cu reducere de 25%. Acest pachet include toate analizele esențiale recomandate în timpul sarcinii: Trimestrul I (săptămânile 1-12): hemoleucogramă completă, grup sanguin și Rh, glicemie, TSH, TORCH (toxoplasmoză, rubeolă, citomegalovirus, herpes), HIV, VDRL, AgHBs, anti-HCV, acid folic, vitamina D. Trimestrul II (săptămânile 13-26): hemoleucogramă, glicemie, test toleranță glucoză, urocultură, toxoplasmoză IgG. Trimestrul III (săptămânile 27-40): hemoleucogramă, glicemie, urocultură, VDRL, HIV, AgHBs. Preț pachet complet: 2800 MDL (față de 3700 MDL individual). Economie: 900 MDL. Toate analizele se efectuează în laboratorul nostru acreditat, cu echipamente moderne. Rezultatele sunt disponibile în 24-48 ore în format digital. Consultanță gratuită cu medicul ginecolog pentru interpretarea rezultatelor. Pachetul poate fi achiziționat în orice trimestru al sarcinii. Valabil până la 31 martie 2026."
    },
    {
        id: 11,
        title: "Laborator de analize extins cu tehnologie de ultimă generație",
        date: "20 Decembrie 2025",
        category: "Serviciu nou",
        description: "Laboratorul nostru a fost extins cu aparatură modernă, reducând timpul de așteptare pentru rezultate la 24 de ore pentru majoritatea analizelor.",
        fullDescription: "MediCare a investit peste 500.000 EUR în extinderea și modernizarea laboratorului de analize medicale. Noua secție este dotată cu: analizor automat de hematologie Sysmex XN-1000 (procesare 100 probe/oră), analizor biochimic Cobas 6000 (teste biochimice și imunologice), analizor imunochimic Architect i2000SR (hormoni, markeri tumorali), sistem automatizat de microbiologie VITEK 2 (identificare rapidă bacterii și antibiogramă), echipament PCR în timp real pentru teste moleculare. Beneficii pentru pacienți: rezultate în 24 ore pentru 95% din analize (față de 48-72 ore anterior), precizie crescută (coeficient variație <2%), gamă extinsă de analize (peste 500 parametri disponibili), rezultate electronice accesibile online, costuri optimizate datorită automatizării. Laboratul este acreditat conform ISO 15189 și participă la programe internaționale de control calitate. Program prelevări: Luni-Vineri 7:00-12:00, Sâmbătă 8:00-11:00. Pentru analize care necesită repaus alimentar, vă rugăm să veniți dimineața pe stomacul gol."
    },
    {
        id: 12,
        title: "Dra. Elena Ionescu, specialist în endocrinologie, în echipa MediCare",
        date: "15 Decembrie 2025",
        category: "Medic nou",
        description: "Dra. Elena Ionescu, cu experiență vastă în tratamentul diabetului și bolilor tiroidiene, începe consultațiile în clinica noastră.",
        fullDescription: "Cu mare bucurie anunțăm că Dra. Elena Ionescu, medic specialist endocrinolog cu 20 de ani de experiență, se alătură echipei MediCare. Dra. Ionescu este absolventă a Institutului de Medicină din Chișinău și a Universității Carol Davila București, cu specializare în diabet zaharat și boli metabolice. A lucrat la Institutul Național de Diabet, Nutriție și Boli Metabolice N. Paulescu și are certificare europeană în diabetologie. Expertiza Dra. Ionescu include: diabet zaharat tip 1 și 2 (diagnostic, tratament, ajustare terapie, educație), boli tiroidiene (hipotiroidism, hipertiroidism, tiroidită, noduli), tulburări hipofizare și suprarenaliene, obezitate și sindrom metabolic, osteoporoză, tulburări hormonale la femei (PCOS, menopauză), tulburări de creștere la copii. Servicii oferite: consultații endocrinologice complete, interpretare analize hormonale, ajustare tratament, monitorizare continuă glucoză (CGM), planuri nutriționale personalizate. Programări: marți și joi 9:00-16:00. Tarif: 600 MDL. Telefon: +373 22 123 456."
    }
];
