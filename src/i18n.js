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
                        placeanadd: "Разместить объявление"
                    },
                    houses: {
                        recommendation: "Рекомендованные Жилой Комплекс",
                        nothing: "Ничего нет",
                        notfound: "Предметы не найдены!",
                        showmore: "Показать ещё"
                    },
                    footer: {
                        auxiliary: "Вспомогательные меню",
                        downloadApp: "Загрузите наше приложение",
                        moreConvinient: "С нашим приложением M-makler это еще удобнее!",
                        download: "Скачать форма док",
                        foradvertisers: "Для рекламодателей",
                        recommendation: "Для упрощения поиска у нас реализована система рекомендаций похожих объявлений.",
                        advertisers: "Рекламадателям",
                        postingInstructions: "Инструкции по публикации",
                        help: "Помощь",
                        support: "Тех поддержка",
                        termsofuse: "Условия использование",
                        privacypolicy: "Политика конфеденциалности"
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
                        placeanadd: "Reklama joylashtiring"
                    },
                    houses: {
                        recommendation: "Tanlangan turar-joy majmuasi",
                        nothing: "Hech narsa mavjud emas",
                        notfound: "Hech narsa mavjud emas",
                        showmore: "Ko'proq ko'rsatish",
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
                        privacypolicy: "Maxfiylik siyosati"
                    }
                }
            }
        }
    });


export const lngs = {
    ru: { nativeName: "Russian" },
    uz: { nativeName: "Uzbek" }
};