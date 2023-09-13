import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";

i18next
    .use(initReactI18next)
    .use(I18nextBrowserLanguageDetector)
    .init({
        debug: true,
        fallbackLng: 'ru',
        resources: {
            ru: {
                translation: {
                    navbar: {
                        main: "Главная",
                        favourite: "Избранное",
                        sign: "Войти",
                        profile: "Профиль",
                        placeanadd: "Разместить объявление",
                        product: "Продукт",
                        master: "Мастер",
                        industria: "Обустройства",
                        furniture: "Мебель",
                        cabinet: "Кабинет",
                        favorites: "Избранные",
                        create: "Создать"
                    },
                    houses: {
                        recommendation: "Рекомендованные Жилой Комплексы",
                        nothing: "Ничего нет",
                        notfound: "Предметы не найдены!",
                        showmore: "Показать ещё"
                    },
                    footer: {
                        auxiliary: "Вспомогательное меню",
                        downloadApp: "Загрузите наше приложение",
                        moreConvinient: "С нашим приложением MAKLERUZ это еще удобнее!",
                        download: "Скачать форму",
                        foradvertisers: "Для рекламодателей",
                        recommendation: "Для упрощения поиска у нас реализована система рекомендаций похожих объявлений.",
                        advertisers: "Рекламодателям",
                        postingInstructions: "Инструкции по публикации",
                        help: "Помощь",
                        support: "Тех поддержка",
                        termsofuse: "Условия использование",
                        privacypolicy: "Политика конфеденциалности"
                    },
                    cabinet: {
                        addToTheTop: "Продвигайте свое объявление в ТОП!",
                        addToTheTopText: "В скором времени вы сможете опубликовать объявления и поднять в ТОП!",
                        activateToTop: "Активировать в топ",
                        dateCreated: "Дата создание:",
                        confirmed: "Подтвержден",
                        waitForConfirm: "Ожидание подтверждения",
                        saveChanges: "Сохранить изменения",
                        myAnnouncements: "Мои объявления",
                        archive: "Архив",
                        draft: "Черновик",
                        setUpProfile: "Настроить профиль"
                    },
                    editPage: {
                        uploadAvatarImage: "Загрузите фото профиля или логотип компании",
                        empty: "пусто",
                        fio: "Имя Фамилия",
                        phoneNumberAndLogin: "Номер телефона | Ваш логин",
                        email: "Электронная почта",
                        password: "Пароль",
                        shortDescriptionAboutMe: "Краткое описание о себе",
                        selectSectionAndSpecialization: "Выберите раздел и специализацию *",
                        enterYourOcupation: "Введите род деятельности!",
                        experience: "Опыт работы",
                        location: "Расположение",
                        agreeWithTerms: "Я прочитал и согласен с условиями использования и публикации!",
                        saveAsDraft: "Сохранить как черновик",
                        postAnAdd: "Опубликовать объявление",
                        supportsImgExt: "Поддерживает: .jpg, .png, .jpeg",
                        registerAsMaster: "Регистрация как мастер",
                        price: "Цена",
                        phoneNumber: "Номер телефона ",
                        shortDescription: "Краткое описание ",
                        selectAdType: "Выберите тип объявления",
                        toRent: "Сдать в аренду",
                        propertyForSale: "Продажа недвижимости",
                        rentalType: "Тип аренды",
                        propertyType: "Тип недвижимости",
                        object: "Объект",
                        objectImages: "Изображения объекта",
                        allInfoObjects: "Вся информация об объекте",
                        area: "Площадь, м² *",
                        general: "Общая",
                        numberOfRooms: "Количество комнат *",
                        floor: "Этаж",
                        floorFrom: "Этаж из*",
                        typeOfBuilding: "Тип строения",
                        mortgage: "Ипотека",
                        yes: "Да",
                        no: "Нет",
                        allAmenities: "Все удобства",
                        announcementWillBeAvailable: "Объявление будет доступно на ",
                        andInOurMobileApp: " и в наших мобильных приложениях",
                        address: "Адрес",
                        views: "Просмотры",
                        additionalPhone: "Дополнительный номер телефона!*",
                        change: "Изменить",
                        monolith: "Монолит",
                        panel: "Панель",
                        blocky: "Блочный",
                        commercial: "Коммерческая",
                        residential: "Жилая",
                        room: "Комната",
                        countryHouse: "Дача",
                        house: "Дом",
                        partOfHouse: "Часть дома",
                        townHouse: "Таунхаус",
                        bedSpace: "Койко-место",
                        apartment: "Квартира",
                        brick: "Кирпич",
                        longTerm: "Длительно",
                        daily: "Посуточно",
                        forFewMonths: "На несколько месяцев",
                        sell: "Продать",
                        buy: "Купить"
                    },
                    filter: {
                        forHome: "для дома",
                        forKitchen: "для кухни"
                    },
                    singleProduct: {
                        description: "Описание",
                        allInfo: "Вся информация",
                        floorTheHouse: "Этажность дома",
                        numberOfRooms: "Кол-во комнат",
                        totalArea: "Общая плошадь",
                        furniture: "Мебелирование",
                        call: "Позвонить"
                    },
                    login: {
                        register: "Зарегистрироваться",
                        signIn: "Войти",
                        areYouRegistered: "Вы зарегистрированы?"
                    }
                }
            },
            uz: {
                translation: {
                    navbar: {
                        main: "Asosiy",
                        favourite: "Sevimlilar",
                        sign: "Kirish",
                        profile: "Profil",
                        placeanadd: "Reklama joylashtiring",
                        product: "Mahsulot",
                        master: "Usta",
                        industria: "Aranjirovkalar",
                        furniture: "Mebel",
                        cabinet: "Kabinet",
                        favorites: "Sevimlilar",
                        create: "Yaratish"
                    },
                    houses: {
                        recommendation: "Tanlangan turar-joy majmuasi",
                        nothing: "Hech narsa mavjud emas",
                        notfound: "Hech narsa mavjud emas",
                        showmore: "Ko'proq ko'rsatish",
                        setUpProfile: "Настроить профиль"
                    },
                    footer: {
                        auxiliary: "Yordamchi menyular",
                        downloadApp: "Ilovamizni yuklab oling",
                        moreConvinient: "M-makler ilovamiz bilan bu yanada qulayroq!",
                        download: "Hujjat shaklini yuklab oling",
                        foradvertisers: "Reklama beruvchilar uchun",
                        recommendation: "Qidiruvni soddalashtirish uchun biz tavsiyalar tizimini joriy qildik shunga o'xshash reklamalar.",
                        advertisers: "Reklama beruvchilar",
                        postingInstructions: "E'lon qilish bo'yicha ko'rsatmalar",
                        help: 'Yordam',
                        support: "Texnik yordam",
                        termsofuse: "Foydalanish shartlari",
                        privacypolicy: "Maxfiylik siyosati",
                    },
                    cabinet: {
                        addToTheTop: "E'loningizni TOP ga ko'taring!",
                        addToTheTopText: "Magistr sifatida ro'yxatdan o'tganingizdan so'ng, siz orqali kirgan yo'nalishlarga buyurtmalarni qabul qilish imkoniyatiga ega bo'ladi portal!",
                        activateToTop: "Yuqoriga faollashtirish",
                        dateCreated: "Yaratilgan vaqti:",
                        confirmed: "Tasdiqlangan",
                        waitForConfirm: "Tasdiqlash kutilmoqda",
                        saveChanges: "O'zgartirishlarni saqlash",
                        myAnnouncements: "Mening e'lonlarim",
                        archive: "Arxiv",
                        draft: "Qoralama"
                    },
                    editPage: {
                        uploadAvatarImage: "Profil rasmini yoki kompaniya logotipini yuklang",
                        empty: "bo'sh",
                        fio: "Ism Familiya",
                        phoneNumberAndLogin: "Telefon raqami | Sizning login",
                        email: "Elektron pochta",
                        password: "Parol",
                        shortDescriptionAboutMe: "O'zingiz haqingizda qisqacha tavsif",
                        selectSectionAndSpecialization: "Bo'limni va mutaxassislikni tanlang *",
                        enterYourOcupation: "Kasbingizni kiriting!",
                        experience: "Ish tajriba!",
                        location: "Joylashuv",
                        agreeWithTerms: "Men foydalanish va nashr qilish shartlarini o'qib chiqdim va roziman!",
                        saveAsDraft: "Qoralama sifatida saqlash",
                        postAnAdd: "E'lonni yuklash",
                        supportsImgExt: "Qo'llaydi: .jpg, .png, .jpeg",
                        registerAsMaster: "Usta sifatida ro'yxatdan o'ting",
                        price: "Narxi",
                        phoneNumber: "Telefon raqami ",
                        shortDescription: "Qisqacha tavsifi ",
                        selectAdType: "E'lon turini tanlang",
                        toRent: "Ijaraga berish",
                        propertyForSale: "Ko'chmas mulk sotish",
                        rentalType: "Ijara turi",
                        propertyType: "Ko'chmas mulk turi",
                        object: "Ob'ekt",
                        objectImages: "Ob'ekt rasmi",
                        allInfoObjects: "Ob'ekt haqida to'liq ma'lumot",
                        area: "Maydoni, м² *",
                        general: "Umumiy",
                        numberOfRooms: "Xonalar soni *",
                        floor: "Qavat",
                        floorFrom: "Qavatdan*",
                        typeOfBuilding: "Bino turi",
                        mortgage: "Ipoteka",
                        yes: "Ha",
                        no: "Yo'q",
                        allAmenities: "Barcha qulayliklar",
                        announcementWillBeAvailable: "E'lon e'lon qilinadi ",
                        andInOurMobileApp: " va bizning mobil ilovalarimizda",
                        address: "Manzil",
                        views: "Ko'rishlar:",
                        additionalPhone: "Qo'shimcha telefon raqami!*",
                        change: "O'zgartirish",
                        blocky: "Blokli",
                        commercial: "Tijorat",
                        residential: "Aholi yashash joyi",
                        room: "Xonalar",
                        countryHouse: "Dachalar",
                        house: "Uy",
                        partOfHouse: "Uy qismi",
                        townHouse: "Taunxus",
                        bedSpace: "Yotoq-joy",
                        apartment: "Kvartira",
                        brick: "G'isht",
                        monolith: "Monolit",
                        panel: "Panel",
                        longTerm: "Uzoq muddat",
                        daily: "Kunlik",
                        forFewMonths: "Bir necha oy",
                        sell: "Sotish",
                        buy: "Sotib olish"
                    },
                    filter: {
                        forHome: "uy uchun",
                        forKitchen: "oshxona uchun"
                    },
                    singleProduct: {
                        description: "Tavsif",
                        allInfo: "Barcha ma'lumot",
                        floorTheHouse: "Uyning qavatlar soni",
                        numberOfRooms: "Xonalar soni",
                        totalArea: "Umumiy maydoni",
                        furniture: "Mebel bilan jihozlangani",
                        call: "Qo'ng'iroq qilish"
                    },
                    login: {
                        register: "Ro'yxatdan o'tish",
                        signIn: "Kirish",
                        areYouRegistered: "Siz ro'yxatdan o'tganmisiz?"
                    }
                }
            }
        }
    });


export const lngs = {
    ru: { nativeName: "Russian" },
    uz: { nativeName: "Uzbek" }
};
