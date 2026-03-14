export type NewsCategory = "Serviciu nou" | "Promoție" | "Medic nou" | "Actualizare preț";

export interface NewsItem {
    id: number;
    title: { ro: string; ru: string; en: string };
    date: string;
    category: NewsCategory;
    description: { ro: string; ru: string; en: string };
    fullDescription: { ro: string; ru: string; en: string };
}

export const newsData: NewsItem[] = [
    {
        id: 1,
        title: {
            ro: "Am introdus serviciul de cardiologie pediatrică",
            ru: "Мы открыли отделение детской кардиологии",
            en: "We launched the pediatric cardiology service",
        },
        date: "15 Februarie 2026",
        category: "Serviciu nou",
        description: {
            ro: "Clinica noastră extinde serviciile medicale cu un nou departament de cardiologie pediatrică, dedicat sănătății cardiovasculare a copiilor.",
            ru: "Наша клиника расширяет медицинские услуги новым отделением детской кардиологии, посвящённым сердечно-сосудистому здоровью детей.",
            en: "Our clinic expands medical services with a new pediatric cardiology department dedicated to children's cardiovascular health.",
        },
        fullDescription: {
            ro: "Cu mândrie anunțăm deschiderea departamentului de cardiologie pediatrică la MediCare. Acest serviciu nou vine ca răspuns la cererea crescândă pentru servicii medicale specializate pentru copii. Echipa noastră este formată din cardiologi pediatri cu certificare internațională și experiență vastă în tratarea afecțiunilor cardiovasculare la copii, de la nou-născuți până la adolescenți. Departamentul este dotat cu echipamente moderne de diagnostic: ecograf cardiac de ultimă generație, EKG pediatric, monitoring Holter și test de efort adaptat pentru copii. Serviciile includ: consultații cardiologice complete, diagnosticarea și tratarea malformațiilor cardiace congenitale, monitorizarea bolilor cardiace dobândite, evaluări pre și post-operatorii, precum și consiliere pentru familii. Programările se pot face online sau telefonic, de luni până vineri între 8:00-18:00.",
            ru: "С гордостью объявляем об открытии отделения детской кардиологии в MediCare. Этот новый сервис создан в ответ на растущий спрос на специализированную медицинскую помощь для детей. Наша команда состоит из детских кардиологов с международной сертификацией и обширным опытом лечения сердечно-сосудистых заболеваний у детей — от новорождённых до подростков. Отделение оснащено современным диагностическим оборудованием: передовым кардиоэхографом, детским ЭКГ, мониторированием Холтера и велоэргометрическим тестом, адаптированным для детей. Услуги включают: полные кардиологические консультации, диагностику и лечение врождённых пороков сердца, наблюдение за приобретёнными болезнями сердца, предоперационные и послеоперационные обследования, а также консультирование семей. Записаться можно онлайн или по телефону, с понедельника по пятницу с 8:00 до 18:00.",
            en: "We are proud to announce the opening of the pediatric cardiology department at MediCare. This new service was created in response to the growing demand for specialized medical services for children. Our team consists of pediatric cardiologists with international certification and extensive experience treating cardiovascular conditions in children — from newborns to adolescents. The department is equipped with modern diagnostic equipment: state-of-the-art cardiac ultrasound, pediatric ECG, Holter monitoring, and stress tests adapted for children. Services include: complete cardiological consultations, diagnosis and treatment of congenital heart malformations, monitoring of acquired heart diseases, pre and post-operative evaluations, as well as family counseling. Appointments can be made online or by phone, Monday to Friday between 8:00-18:00.",
        },
    },
    {
        id: 2,
        title: {
            ro: "Promoție: Pachete complete de analize la preț redus",
            ru: "Акция: Полные пакеты анализов по сниженной цене",
            en: "Promotion: Complete test packages at reduced prices",
        },
        date: "10 Februarie 2026",
        category: "Promoție",
        description: {
            ro: "În luna martie oferim reducere de 20% la pachetele complete de analize medicale. Profitați de oferta noastră pentru un bilanț complet de sănătate.",
            ru: "В марте мы предлагаем скидку 20% на полные пакеты медицинских анализов. Воспользуйтесь нашим предложением для полного медицинского обследования.",
            en: "In March, we offer a 20% discount on complete medical test packages. Take advantage of our offer for a complete health check-up.",
        },
        fullDescription: {
            ro: "În luna martie 2026, MediCare oferă o promoție specială pentru pachetele complete de analize medicale. Beneficiați de o reducere de 20% la toate pachetele de analize: Pachetul CHECK-UP COMPLET, Pachetul CARDIOVASCULAR (profil lipidic, troponine, D-dimeri, electroliți), Pachetul DIABET (glicemie, hemoglobină glicată, insulină, profil lipidic) și Pachetul TIROIDA. Toate analizele se efectuează cu echipamente de ultimă generație, iar rezultatele sunt disponibile în format digital în maxim 24 de ore. Promoția este valabilă pentru programări efectuate în luna martie, cu prelevare între 1-31 martie 2026. Oferta nu se cumulează cu alte reduceri.",
            ru: "В марте 2026 года MediCare предлагает специальную акцию на полные пакеты медицинских анализов. Получите скидку 20% на все пакеты анализов: Пакет ПОЛНОГО ОБСЛЕДОВАНИЯ, Пакет КАРДИОВАСКУЛЯРНЫЙ (липидный профиль, тропонины, Д-димеры, электролиты), Пакет ДИАБЕТ (гликемия, гликированный гемоглобин, инсулин, липидный профиль) и Пакет ЩИТОВИДНАЯ ЖЕЛЕЗА. Все анализы проводятся с использованием передового оборудования, а результаты доступны в электронном формате в течение 24 часов. Акция действительна для записей, сделанных в марте, с забором анализов с 1 по 31 марта 2026 года. Предложение не суммируется с другими скидками.",
            en: "In March 2026, MediCare offers a special promotion for complete medical test packages. Get a 20% discount on all test packages: The FULL CHECK-UP Package, The CARDIOVASCULAR Package (lipid profile, troponins, D-dimers, electrolytes), The DIABETES Package (blood glucose, glycated hemoglobin, insulin, lipid profile) and The THYROID Package. All tests are performed with state-of-the-art equipment, and results are available in digital format within 24 hours. The promotion is valid for appointments made in March, with sample collection between March 1-31, 2026. The offer does not combine with other discounts.",
        },
    },
    {
        id: 3,
        title: {
            ro: "Dra. Maria Popescu se alătură echipei noastre",
            ru: "Дра. Мария Попеску присоединяется к нашей команде",
            en: "Dr. Maria Popescu joins our team",
        },
        date: "5 Februarie 2026",
        category: "Medic nou",
        description: {
            ro: "Cu mare bucurie anunțăm că Dra. Maria Popescu, specialist în dermatologie cu 15 ani de experiență, s-a alăturat echipei MediCare.",
            ru: "С большой радостью сообщаем, что Дра. Мария Попеску, специалист по дерматологии с 15-летним опытом, присоединилась к команде MediCare.",
            en: "We are delighted to announce that Dr. Maria Popescu, a dermatology specialist with 15 years of experience, has joined the MediCare team.",
        },
        fullDescription: {
            ro: "Echipa MediCare se extinde cu un specialist de renume în domeniul dermatologiei. Dra. Maria Popescu are o experiență de 15 ani în tratarea afecțiunilor dermatologice și este absolventă a Universității de Medicină și Farmacie din București, cu specializare în dermato-venerologie. A urmat cursuri de perfecționare în dermatologie estetică și dermatoscopie digitală în Franța și Germania. Dra. Popescu tratează afecțiuni precum: acnee, psoriazis, dermatită atopică, vitiligo, infecții fungice, alergii cutanate, și oferă servicii de dermatologie estetică. Programările pentru consultații cu Dra. Popescu se pot face începând de astăzi, de luni până joi între 10:00-17:00.",
            ru: "Команда MediCare пополняется известным специалистом в области дерматологии. Дра. Мария Попеску имеет 15-летний опыт лечения дерматологических заболеваний и является выпускницей Университета медицины и фармации Бухареста со специализацией в дермато-венерологии. Она прошла курсы повышения квалификации по эстетической дерматологии и цифровой дерматоскопии во Франции и Германии. Дра. Попеску лечит заболевания: акне, псориаз, атопический дерматит, витилиго, грибковые инфекции, кожные аллергии, а также предоставляет услуги эстетической дерматологии. Записаться к Дра. Попеску можно уже сегодня, с понедельника по четверг с 10:00 до 17:00.",
            en: "The MediCare team is expanding with a renowned specialist in dermatology. Dr. Maria Popescu has 15 years of experience treating dermatological conditions and is a graduate of the University of Medicine and Pharmacy in Bucharest, specializing in dermato-venereology. She has completed advanced courses in aesthetic dermatology and digital dermoscopy in France and Germany. Dr. Popescu treats conditions such as: acne, psoriasis, atopic dermatitis, vitiligo, fungal infections, skin allergies, and provides aesthetic dermatology services. Appointments with Dr. Popescu can be made starting today, Monday to Thursday between 10:00-17:00.",
        },
    },
    {
        id: 4,
        title: {
            ro: "Actualizare prețuri servicii de radiologie",
            ru: "Обновление цен на услуги радиологии",
            en: "Radiology services price update",
        },
        date: "1 Februarie 2026",
        category: "Actualizare preț",
        description: {
            ro: "Din 1 martie 2026, prețurile serviciilor de radiologie digitală vor fi ajustate conform inflației și costurilor echipamentelor moderne.",
            ru: "С 1 марта 2026 года цены на услуги цифровой радиологии будут скорректированы с учётом инфляции и стоимости современного оборудования.",
            en: "From March 1, 2026, digital radiology service prices will be adjusted to reflect inflation and the costs of modern equipment.",
        },
        fullDescription: {
            ro: "Începând cu 1 martie 2026, tarifele pentru serviciile de radiologie digitală vor suferi ajustări minore pentru a reflecta creșterea costurilor operaționale și investițiile în echipamente de ultimă generație. Noile tarife: Radiografie digitală torace - 350 MDL (față de 320 MDL), Radiografie digitală coloană vertebrală - 400 MDL (față de 370 MDL), Radiografie digitală membre - 300 MDL (față de 280 MDL), Radiografie digitală abdomen - 380 MDL (față de 350 MDL). Pacienții cu abonamente medicale sau asigurări private vor beneficia în continuare de acoperire completă sau parțială conform contractelor. Apreciem înțelegerea dumneavoastră.",
            ru: "С 1 марта 2026 года тарифы на услуги цифровой радиологии претерпят незначительные изменения, отражающие рост операционных расходов и инвестиции в современное оборудование. Новые тарифы: Цифровая рентгенография грудной клетки — 350 MDL (вместо 320 MDL), Цифровая рентгенография позвоночника — 400 MDL (вместо 370 MDL), Цифровая рентгенография конечностей — 300 MDL (вместо 280 MDL), Цифровая рентгенография живота — 380 MDL (вместо 350 MDL). Пациенты с медицинскими абонементами или частными страховками продолжат получать полное или частичное покрытие согласно договорам. Благодарим за понимание.",
            en: "Starting March 1, 2026, digital radiology service rates will undergo minor adjustments to reflect the increase in operational costs and investments in state-of-the-art equipment. New rates: Digital chest X-ray - 350 MDL (from 320 MDL), Digital spine X-ray - 400 MDL (from 370 MDL), Digital limb X-ray - 300 MDL (from 280 MDL), Digital abdominal X-ray - 380 MDL (from 350 MDL). Patients with medical subscriptions or private insurance will continue to receive full or partial coverage according to their contracts. We appreciate your understanding.",
        },
    },
    {
        id: 5,
        title: {
            ro: "Serviciu nou: Terapie prin ultrasunete pentru recuperare",
            ru: "Новая услуга: Ультразвуковая терапия для восстановления",
            en: "New service: Ultrasound therapy for recovery",
        },
        date: "28 Ianuarie 2026",
        category: "Serviciu nou",
        description: {
            ro: "Introducem terapia prin ultrasunete pentru recuperare musculară și tratarea afecțiunilor osteoarticulare. Echipament de ultimă generație.",
            ru: "Представляем ультразвуковую терапию для мышечного восстановления и лечения остеоартикулярных заболеваний с использованием передового оборудования.",
            en: "We introduce ultrasound therapy for muscle recovery and treatment of osteoarticular conditions using state-of-the-art equipment.",
        },
        fullDescription: {
            ro: "MediCare investește în sănătatea pacienților și introduce un serviciu nou de fizioterapie: terapia prin ultrasunete medicale. Acest tratament non-invaziv este eficient în tratarea: dureri musculare cronice, tendinite, bursită, artroză, recuperare post-traumatică, contracturi musculare, cicatrici și aderențe. Am achiziționat un aparat profesional de ultrasonoterapie cu frecvență variabilă (1-3 MHz) și intensitate reglabilă, care permite tratamente personalizate. Beneficiile includ: reducerea inflamației și durerii, accelerarea vindecării țesuturilor, îmbunătățirea circulației sanguine, relaxarea musculară profundă. Ședințele durează 15-30 minute. Tarif per ședință: 250 MDL.",
            ru: "MediCare инвестирует в здоровье пациентов и вводит новый вид физиотерапии: медицинскую ультразвуковую терапию. Это неинвазивное лечение эффективно при: хронических мышечных болях, тендините, бурсите, артрозе, посттравматическом восстановлении, мышечных контрактурах, рубцах и спайках. Мы приобрели профессиональный аппарат ультразвуковой терапии с переменной частотой (1-3 МГц) и регулируемой интенсивностью, позволяющий проводить персонализированное лечение. Преимущества: уменьшение воспаления и боли, ускорение заживления тканей, улучшение кровообращения, глубокое мышечное расслабление. Сеанс длится 15-30 минут. Стоимость одного сеанса: 250 MDL.",
            en: "MediCare invests in patient health and introduces a new physiotherapy service: medical ultrasound therapy. This non-invasive treatment is effective in treating: chronic muscle pain, tendinitis, bursitis, arthrosis, post-traumatic recovery, muscle contractures, scars and adhesions. We have acquired a professional ultrasound therapy device with variable frequency (1-3 MHz) and adjustable intensity, allowing personalized treatments. Benefits include: reducing inflammation and pain, accelerating tissue healing, improving blood circulation, deep muscle relaxation. Sessions last 15-30 minutes. Fee per session: 250 MDL.",
        },
    },
    {
        id: 6,
        title: {
            ro: "Ofertă specială: Consultații ORL cu reducere 30%",
            ru: "Специальное предложение: Консультации ЛОР со скидкой 30%",
            en: "Special offer: ENT consultations with 30% discount",
        },
        date: "20 Ianuarie 2026",
        category: "Promoție",
        description: {
            ro: "Pe toată luna februarie, consultațiile ORL beneficiază de o reducere de 30%. Programați-vă acum pentru un consult specializat.",
            ru: "В течение всего февраля консультации ЛОР-врача предоставляются со скидкой 30%. Запишитесь сейчас на специализированную консультацию.",
            en: "Throughout February, ENT consultations receive a 30% discount. Book now for a specialized consultation.",
        },
        fullDescription: {
            ro: "În luna februarie 2026, MediCare oferă o campanie specială de prevenție ORL cu reducere de 30% la toate consultațiile de otorinolaringologie. Consultația standard ORL costă normal 500 MDL, în februarie doar 350 MDL. Dr. Ana Munteanu, medicul nostru ORL cu 12 ani de experiență, va efectua consultații în zilele de marți, joi și vineri între 10:00-16:00. Această promoție este ideală pentru: persoanele cu rinite alergice sau cronice, pacienți cu probleme de auz, copii cu infecții recurente ORL, adulți cu amigdalite cronice. Promoția este valabilă doar în luna februarie pentru programări noi.",
            ru: "В феврале 2026 года MediCare проводит специальную профилактическую акцию ЛОР со скидкой 30% на все консультации оториноларинголога. Стандартная консультация ЛОР обычно стоит 500 MDL, в феврале — только 350 MDL. Доктор Анна Мунтяну, наш ЛОР-врач с 12-летним стажем, будет проводить консультации во вторник, четверг и пятницу с 10:00 до 16:00. Акция идеально подходит для: людей с аллергическим или хроническим ринитом, пациентов с проблемами слуха, детей с рецидивирующими ЛОР-инфекциями, взрослых с хроническим тонзиллитом. Акция действительна только в феврале для новых записей.",
            en: "In February 2026, MediCare offers a special ENT prevention campaign with a 30% discount on all otorhinolaryngology consultations. The standard ENT consultation normally costs 500 MDL, in February only 350 MDL. Dr. Ana Munteanu, our ENT doctor with 12 years of experience, will conduct consultations on Tuesdays, Thursdays and Fridays between 10:00-16:00. This promotion is ideal for: people with allergic or chronic rhinitis, patients with hearing problems, children with recurring ENT infections, adults with chronic tonsillitis. The promotion is valid only in February for new appointments.",
        },
    },
    {
        id: 7,
        title: {
            ro: "Dr. Ion Enache, specialist în neurologie, în echipa noastră",
            ru: "Д-р Ион Еначе, специалист по неврологии, в нашей команде",
            en: "Dr. Ion Enache, neurology specialist, joins our team",
        },
        date: "15 Ianuarie 2026",
        category: "Medic nou",
        description: {
            ro: "Dr. Ion Enache, cu certificare internațională în neurologie și specializare în boli neurodegenerative, începe consultațiile la MediCare.",
            ru: "Д-р Ион Еначе с международной сертификацией по неврологии и специализацией в нейродегенеративных заболеваниях начинает приём в MediCare.",
            en: "Dr. Ion Enache, with international certification in neurology and specialization in neurodegenerative diseases, begins consultations at MediCare.",
        },
        fullDescription: {
            ro: "Cu deosebită plăcere anunțăm că Dr. Ion Enache s-a alăturat echipei MediCare. Dr. Enache este medic specialist neurolog cu certificare europeană și o experiență de 18 ani în domeniu. A absolvit Universitatea de Medicină și Farmacie Carol Davila București și a făcut fellowships în boli neurodegenerative la clinici de prestigiu din Austria și Elveția. Expertiza sa include: boli Parkinson și Alzheimer, scleroza multiplă, epilepsie, migrene și cefalee, neuropatii periferice, accidente vasculare cerebrale (prevenție și recuperare), tulburări de somn, vertij și tulburări de echilibru. Consultațiile se desfășoară luni, miercuri și vineri între 14:00-19:00.",
            ru: "С особым удовольствием сообщаем, что Д-р Ион Еначе присоединился к команде MediCare. Д-р Еначе является специалистом-неврологом с европейской сертификацией и 18-летним стажем в этой области. Он окончил Университет медицины и фармации Кирол Давила Бухарест и прошёл стажировку по нейродегенеративным заболеваниям в престижных клиниках Австрии и Швейцарии. Его специализация включает: болезни Паркинсона и Альцгеймера, рассеянный склероз, эпилепсию, мигрень и головную боль, периферические нейропатии, инсульты (профилактика и реабилитация), расстройства сна, головокружение и нарушения равновесия. Консультации проводятся в понедельник, среду и пятницу с 14:00 до 19:00.",
            en: "We are delighted to announce that Dr. Ion Enache has joined the MediCare team. Dr. Enache is a specialist neurologist with European certification and 18 years of experience in the field. He graduated from the Carol Davila University of Medicine and Pharmacy Bucharest and completed fellowships in neurodegenerative diseases at prestigious clinics in Austria and Switzerland. His expertise includes: Parkinson's and Alzheimer's diseases, multiple sclerosis, epilepsy, migraines and headaches, peripheral neuropathies, strokes (prevention and recovery), sleep disorders, vertigo and balance disorders. Consultations are held on Mondays, Wednesdays and Fridays between 14:00-19:00.",
        },
    },
    {
        id: 8,
        title: {
            ro: "Program extins pentru consultații de pediatrie",
            ru: "Расширенный график педиатрических консультаций",
            en: "Extended schedule for pediatric consultations",
        },
        date: "10 Ianuarie 2026",
        category: "Serviciu nou",
        description: {
            ro: "Răspundem nevoilor părinților: consultațiile de pediatrie sunt acum disponibile și sâmbăta între orele 9:00-14:00.",
            ru: "Отвечая потребностям родителей: педиатрические консультации теперь доступны и по субботам с 9:00 до 14:00.",
            en: "Responding to parents' needs: pediatric consultations are now available on Saturdays between 9:00-14:00.",
        },
        fullDescription: {
            ro: "Ascultând feedback-ul părinților, MediCare extinde programul de consultații pediatrice și în zilele de sâmbătă. Înțelegem că mulți părinți lucrează în timpul săptămânii și au dificultăți în a-și programa copiii pentru consultații. De aceea, începând cu 15 ianuarie 2026, Dr. Cristina Vasile, medicul nostru pediatru, va fi disponibilă și sâmbăta între 9:00-14:00. Servicii disponibile sâmbăta: consultații pediatrice generale, vaccinări conform schemei naționale și opționale, consulturi pentru afecțiuni acute (febră, tuse, dureri), evaluări de creștere și dezvoltare, consiliere nutrițională pentru copii. Locurile pentru sâmbătă sunt limitate la 15 consultații pe zi.",
            ru: "Прислушавшись к отзывам родителей, MediCare расширяет график педиатрических консультаций и на субботу. Мы понимаем, что многие родители работают в будние дни и испытывают трудности с записью детей на консультацию. Поэтому с 15 января 2026 года Доктор Кристина Василе, наш педиатр, будет доступна и по субботам с 9:00 до 14:00. Услуги, доступные в субботу: общие педиатрические консультации, вакцинация по национальной и дополнительной схемам, консультации при острых заболеваниях (жар, кашель, боли), оценки роста и развития, нутрициологическое консультирование для детей. Места на субботу ограничены — 15 консультаций в день.",
            en: "Listening to parents' feedback, MediCare extends the pediatric consultation schedule to Saturdays. We understand that many parents work during the week and have difficulty scheduling their children for consultations. Therefore, starting January 15, 2026, Dr. Cristina Vasile, our pediatrician, will also be available on Saturdays between 9:00-14:00. Services available on Saturdays: general pediatric consultations, vaccinations according to the national and optional schedules, consultations for acute conditions (fever, cough, pain), growth and development assessments, nutritional counseling for children. Saturday spots are limited to 15 consultations per day.",
        },
    },
    {
        id: 9,
        title: {
            ro: "Actualizare tarife consultații specializate",
            ru: "Обновление тарифов на специализированные консультации",
            en: "Specialized consultations tariff update",
        },
        date: "5 Ianuarie 2026",
        category: "Actualizare preț",
        description: {
            ro: "Începând cu 1 februarie 2026, tarifele consultațiilor specializate vor fi actualizate pentru a reflecta investițiile în echipamente moderne.",
            ru: "С 1 февраля 2026 года тарифы на специализированные консультации будут обновлены, чтобы отразить инвестиции в современное оборудование.",
            en: "Starting February 1, 2026, specialized consultation rates will be updated to reflect investments in modern equipment.",
        },
        fullDescription: {
            ro: "Începând cu 1 februarie 2026, MediCare actualizează tarifele pentru consultațiile specializate ca urmare a investițiilor semnificative în echipamente medicale de ultimă generație și în formarea continuă a echipei medicale. Noile tarife: Consultație cardiologie - 650 MDL (față de 600 MDL), Consultație gastroenterologie - 600 MDL (față de 550 MDL), Consultație endocrinologie - 600 MDL (față de 550 MDL), Consultație reumatologie - 550 MDL (față de 500 MDL), Consultație dermatologie - 500 MDL (față de 450 MDL). Consultațiile de medicină generală rămân la 350 MDL. Toți pacienții cu programări confirmate înainte de 1 februarie vor beneficia de tarifele vechi.",
            ru: "С 1 февраля 2026 года MediCare обновляет тарифы на специализированные консультации в связи со значительными инвестициями в современное медицинское оборудование и непрерывное обучение медицинского персонала. Новые тарифы: Консультация кардиолога — 650 MDL (вместо 600 MDL), гастроэнтеролога — 600 MDL (вместо 550 MDL), эндокринолога — 600 MDL (вместо 550 MDL), ревматолога — 550 MDL (вместо 500 MDL), дерматолога — 500 MDL (вместо 450 MDL). Консультации общей практики остаются на уровне 350 MDL. Все пациенты с подтверждёнными записями до 1 февраля воспользуются старыми тарифами.",
            en: "Starting February 1, 2026, MediCare updates the rates for specialized consultations as a result of significant investments in state-of-the-art medical equipment and continuing education for the medical team. New rates: Cardiology consultation - 650 MDL (from 600 MDL), Gastroenterology - 600 MDL (from 550 MDL), Endocrinology - 600 MDL (from 550 MDL), Rheumatology - 550 MDL (from 500 MDL), Dermatology - 500 MDL (from 450 MDL). General medicine consultations remain at 350 MDL. All patients with confirmed appointments before February 1 will benefit from the old rates.",
        },
    },
    {
        id: 10,
        title: {
            ro: "Pachet complet de analize prenatale la prețuri avantajoase",
            ru: "Полный пакет пренатальных анализов по выгодным ценам",
            en: "Complete prenatal test package at advantageous prices",
        },
        date: "28 Decembrie 2025",
        category: "Promoție",
        description: {
            ro: "Oferim un pachet complet de analize prenatale cu reducere de 25%, incluzând toate investigațiile esențiale pentru o sarcină sănătoasă.",
            ru: "Предлагаем полный пакет пренатальных анализов со скидкой 25%, включающий все необходимые исследования для здоровой беременности.",
            en: "We offer a complete prenatal test package with 25% discount, including all essential investigations for a healthy pregnancy.",
        },
        fullDescription: {
            ro: "MediCare lansează un pachet special pentru viitoarele mămici: Pachetul Prenatal Complet cu reducere de 25%. Acest pachet include toate analizele esențiale recomandate în timpul sarcinii. Trimestrul I: hemoleucogramă completă, grup sanguin și Rh, glicemie, TSH, TORCH, HIV, VDRL, AgHBs, anti-HCV, acid folic, vitamina D. Trimestrul II: hemoleucogramă, glicemie, test toleranță glucoză, urocultură. Trimestrul III: hemoleucogramă, glicemie, urocultură, VDRL, HIV, AgHBs. Preț pachet complet: 2800 MDL (față de 3700 MDL individual). Economie: 900 MDL. Valabil până la 31 martie 2026.",
            ru: "MediCare запускает специальный пакет для будущих мам: Полный Пренатальный Пакет со скидкой 25%. Пакет включает все необходимые анализы, рекомендованные во время беременности. I триместр: полный анализ крови, группа крови и резус-фактор, гликемия, ТТГ, TORCH, ВИЧ, VDRL, AgHBs, анти-HCV, фолиевая кислота, витамин D. II триместр: анализ крови, гликемия, тест толерантности к глюкозе, посев мочи. III триместр: анализ крови, гликемия, посев мочи, VDRL, ВИЧ, AgHBs. Цена полного пакета: 2800 MDL (вместо 3700 MDL по отдельности). Экономия: 900 MDL. Действительно до 31 марта 2026 года.",
            en: "MediCare launches a special package for expecting mothers: the Complete Prenatal Package with a 25% discount. This package includes all essential tests recommended during pregnancy. 1st Trimester: complete blood count, blood type and Rh, blood glucose, TSH, TORCH, HIV, VDRL, AgHBs, anti-HCV, folic acid, vitamin D. 2nd Trimester: blood count, glucose, glucose tolerance test, urine culture. 3rd Trimester: blood count, glucose, urine culture, VDRL, HIV, AgHBs. Full package price: 2800 MDL (vs 3700 MDL individually). Savings: 900 MDL. Valid until March 31, 2026.",
        },
    },
    {
        id: 11,
        title: {
            ro: "Laborator de analize extins cu tehnologie de ultimă generație",
            ru: "Лаборатория расширена новейшими технологиями",
            en: "Lab expanded with state-of-the-art technology",
        },
        date: "20 Decembrie 2025",
        category: "Serviciu nou",
        description: {
            ro: "Laboratorul nostru a fost extins cu aparatură modernă, reducând timpul de așteptare pentru rezultate la 24 de ore pentru majoritatea analizelor.",
            ru: "Наша лаборатория была расширена modern equipment, сокращая время ожидания результатов до 24 часов для большинства анализов.",
            en: "Our laboratory has been expanded with modern equipment, reducing waiting time for results to 24 hours for most tests.",
        },
        fullDescription: {
            ro: "MediCare a investit peste 500.000 EUR în extinderea și modernizarea laboratorului de analize medicale. Noua secție este dotată cu: analizor automat de hematologie, analizor biochimic Cobas 6000, analizor imunochimic pentru hormoni și markeri tumorali, sistem automatizat de microbiologie VITEK 2, echipament PCR în timp real pentru teste moleculare. Beneficii pentru pacienți: rezultate în 24 ore pentru 95% din analize, precizie crescută, gamă extinsă de analize (peste 500 parametri disponibili), rezultate electronice accesibile online, costuri optimizate datorită automatizării. Laboratorrul este acreditat conform ISO 15189.",
            ru: "MediCare инвестировала свыше 500 000 EUR в расширение и модернизацию лаборатории медицинских анализов. Новая секция оснащена: автоматическим гематологическим анализатором, биохимическим анализатором Cobas 6000, иммунохимическим анализатором для гормонов и опухолевых маркеров, автоматизированной системой микробиологии VITEK 2, ПЦР-оборудованием в реальном времени для молекулярных тестов. Преимущества для пациентов: результаты за 24 часа для 95% анализов, повышенная точность, расширенный перечень анализов (более 500 параметров), электронные результаты доступны онлайн, оптимизированные затраты благодаря автоматизации. Лаборатория аккредитована по ISO 15189.",
            en: "MediCare invested over 500,000 EUR in the expansion and modernization of the medical analysis laboratory. The new section is equipped with: automatic hematology analyzer, Cobas 6000 biochemical analyzer, immunochemical analyzer for hormones and tumor markers, VITEK 2 automated microbiology system, real-time PCR equipment for molecular tests. Benefits for patients: results in 24 hours for 95% of tests, increased accuracy, expanded range of analyses (over 500 parameters available), electronic results accessible online, optimized costs thanks to automation. The laboratory is accredited according to ISO 15189.",
        },
    },
    {
        id: 12,
        title: {
            ro: "Dra. Elena Ionescu, specialist în endocrinologie, în echipa MediCare",
            ru: "Д-р Елена Ионеску, специалист по эндокринологии, в команде MediCare",
            en: "Dr. Elena Ionescu, endocrinology specialist, joins the MediCare team",
        },
        date: "15 Decembrie 2025",
        category: "Medic nou",
        description: {
            ro: "Dra. Elena Ionescu, cu experiență vastă în tratamentul diabetului și bolilor tiroidiene, începe consultațiile în clinica noastră.",
            ru: "Д-р Елена Ионеску с обширным опытом лечения диабета и заболеваний щитовидной железы начинает приём в нашей клинике.",
            en: "Dr. Elena Ionescu, with extensive experience in treating diabetes and thyroid diseases, begins consultations at our clinic.",
        },
        fullDescription: {
            ro: "Cu mare bucurie anunțăm că Dra. Elena Ionescu, medic specialist endocrinolog cu 20 de ani de experiență, se alătură echipei MediCare. Dra. Ionescu este absolventă a Institutului de Medicină din Chișinău și a Universității Carol Davila București, cu specializare în diabet zaharat și boli metabolice. Expertiza Dra. Ionescu include: diabet zaharat tip 1 și 2, boli tiroidiene (hipotiroidism, hipertiroidism, tiroidită, noduli), tulburări hipofizare și suprarenaliene, obezitate și sindrom metabolic, osteoporoză, tulburări hormonale la femei. Programări: marți și joi 9:00-16:00. Tarif: 600 MDL.",
            ru: "С большой радостью сообщаем, что Д-р Елена Ионеску, врач-эндокринолог с 20-летним стажем, присоединяется к команде MediCare. Д-р Ионеску окончила Медицинский институт Кишинева и Университет Кирол Давила Бухарест со специализацией по сахарному диабету и метаболическим заболеваниям. Специализация Д-р Ионеску включает: сахарный диабет 1 и 2 типа, заболевания щитовидной железы (гипотиреоз, гипертиреоз, тиреоидит, узлы), гипофизарные и надпочечниковые расстройства, ожирение и метаболический синдром, остеопороз, гормональные расстройства у женщин. Записи: вторник и четверг 9:00-16:00. Стоимость: 600 MDL.",
            en: "We are delighted to announce that Dr. Elena Ionescu, specialist endocrinologist with 20 years of experience, joins the MediCare team. Dr. Ionescu graduated from the Medical Institute of Chisinau and the Carol Davila University of Bucharest, specializing in diabetes mellitus and metabolic diseases. Dr. Ionescu's expertise includes: type 1 and 2 diabetes mellitus, thyroid diseases (hypothyroidism, hyperthyroidism, thyroiditis, nodules), pituitary and adrenal disorders, obesity and metabolic syndrome, osteoporosis, hormonal disorders in women. Appointments: Tuesday and Thursday 9:00-16:00. Fee: 600 MDL.",
        },
    },
];
