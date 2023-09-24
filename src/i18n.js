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
                        create: "Создать",
                        aboutMe: "О нас"
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
                        privacypolicy: "Политика конфеденциалности",
                        buildings: "Новостройки",
                        land: "Земельные",
                        choosingRealtor: "Выбор риелтора",
                        developers: "Застройщики",
                        recommend: "Рекомендуемые",
                        appartments: "Квартиры",
                        footerText: "Поиск все что угодно для вашего дома и комфорта",
                        allRightReserved: "Все права защищены",
                        privacyPolicy: "Политика конфиденциальности"
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
                        setUpProfile: "Настроить профиль",
                        yearExperience: " года опыта",
                        showInMap: "Показать на карте",
                        chanceToWin: "Получите шанс выиграть ценные призы, просто поделившись ссылкой!",
                        myPoints: "Мои балы",
                        refferalLink: "Реферальная ссылка",
                        getRefferalLink: "Получить реферальную ссылку",
                        activateToTop: "Активировать в топ",
                        moreDetails: "Подробнее",
                        name: "Имя",
                        logout: "Выйти из профиля",
                        hereEmpty: "Тут ничего нету",
                        linkCopied: "Ссылка скопирована",
                        managaArchive: "В этом разделе вы можете хранить и управлять архивом ваших товаров или объявлений."
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
                        buy: "Купить",
                        how: "Как",
                        livingSpace: "Жилая площадь",
                        recommendSimilar: "Рекомендуем похожие",
                        type: "Тип",
                        success: "Успешно"
                    },
                    filter: {
                        forHome: "для дома",
                        forKitchen: "для кухни",
                        activitiesMaster: "Деятельности мастера",
                        rent: "аpенда",
                        clear: "Очистить",
                        sort: "Сортировка",
                        houses: "Дома",
                        plot: "Участка",
                        cheapest: "Дешевые",
                        expensive: "Дорогие",
                        newest: "Новые",
                        repair: "Ремонт",
                        euroRepair: "Евро",
                        muhandis: "Инженер",
                        for: "Для",
                        brand: "Бренд",
                        category: "Категория"
                    },
                    singleProduct: {
                        description: "Описание",
                        allInfo: "Вся информация",
                        floorTheHouse: "Этажность дома",
                        numberOfRooms: "Кол-во комнат",
                        totalArea: "Общая плошадь",
                        furniture: "Мебелирование",
                        call: "Позвонить",
                        callTheSeller: "Позвонить продавцу",
                        share: "Поделиться",
                        addToFavorites: "В избранные",
                        removeFromFavorites: "Удалить с избранного",
                        callForNumber: "Позвонить по номеру",
                        noProducts: "В списке желаний пока нет товаров!"
                    },
                    login: {
                        register: "Зарегистрироваться",
                        signIn: "Войти",
                        areYouRegistered: "Вы зарегистрированы?"
                    },
                    aboutUs: {
                        title: "Добро пожаловать на наш сайт Makleruz.uz!",
                        text: `Мы рады приветствовать вас на платформе, где ваши домашние мечты становятся реальностью. Наш сайт предлагает широкий спектр услуг для тех, кто ищет идеальный дом, искусственное украшение или профессионального мастера для ремонта. 
                        <br/>Мы предоставляем следующие услуги:
                        <br/>
                        <b>1</b>. Продажа недвижимости: Ищете новый дом или квартиру? Наши агенты помогут вам найти идеальное жилье, отвечающее вашим потребностям и бюджету.
                        <br/>
                        <b>2</b>. Мастера и ремонтные услуги: Независимо от того, нужен вам мастер для ремонта или обслуживания, у нас есть опытные специалисты для каждой задачи.
                        <br/>
                        <b>3</b>. Домашнее оборудование и мебель: Мы предлагаем широкий выбор домашнего оборудования и мебели от лучших производителей. Выбирайте из нашего ассортимента и создавайте уют и комфорт в своем доме.
                        <br/>
                        На нашем сайте мы уделяем внимание каждой детали, чтобы обеспечить вас лучшими предложениями и качественными услугами. Мы также предоставляем возможность просматривать изображения и видеоматериалы в высоком качестве, чтобы вы могли получить полное представление о товарах и услугах, которые мы предлагаем.
                        <br/><br/>
                        Не упустите шанс сделать ваш дом идеальным местом для жизни. Обратитесь к нам сегодня и дайте нам помочь вам воплотить ваши мечты в жизнь!`
                    },
                    create: {
                        title: "Добавить новое объявление",
                        adTitle: "Заголовка объявления",
                        uploadVideo: "Загрузите видео",
                        dragImageText: "Перетащите сюда свои изображения или нажмите сюда",
                        supportsVideoExt: "Поддерживает: video/mp4,video/x-m4v,video/*",
                        price: "Стоимость",
                        fewMonths: "Несколько месяцев",
                        whereIs: "Где находится?",
                        buildings: "Новостройка",
                        furnished: "Меблирована",
                        agreeWithTerms: "Я прочитал и согласен с условиями использования и публикации!",
                        registerAsMaster: "Зарегистрируйтесь как мастер, получите работы",
                        changeAvatarImg: "Изменить фото профиля",
                        register: "Зарегистрироватся",
                        createFurniture: "Создайте и продавайте мебели",
                        furnitureNames: "Мебельные названия"
                    },
                    condition: {
                        title: "Условия использования",
                        text: `
                            Последнее обновление: 23 мая 2023 г.
                            <br/><br/>
                            Настоящие Условия обслуживания (' <b>Условия</b> ') применяется к нашему (нам) мобильному приложению, чтобы вы могли получить к нему доступ и использовать его. , ' <b>Пожалуйста, внимательно прочитайте эти условия</b>
                            <br/><br/>
                            Время от времени мы можем вносить изменения в эти условия. Если мы внесем изменения, мы уведомим вас об изменениях, таких как отправка уведомления через наши службы или обновление даты в верхней части этих условий. Если вы продолжите пользоваться нашими услугами после того, как мы предоставим такое уведомление, это подтвердит, что вы приняли изменения. Если вы не согласны с измененными условиями, вы должны прекратить использование наших услуг.
                            <br/><br/>
                            Время от времени Makleruz представляет новые функции, доступные только для некоторых пользователей. Правила настоящих Условий использования, касающиеся новых функций, могут применяться не ко всем пользователям.
                            <br/><br/>
                            <b>1. Конфиденциальность</b>
                            <br/><br/>
                            Чтобы узнать, как мы собираем, используем, делимся информацией о вас наша политика конфиденциальности qarang . 
                            <br/><br/>
                            <b>2. Соответствие</b>
                            <br/><br/>
                            Вам должно быть не менее 16 лет, чтобы пользоваться нашими услугами. Если вы являетесь родителем или законным опекуном пользователя в возрасте до 18 лет (или несовершеннолетнего), вы несете полную ответственность за действия или бездействие такого Пользователя в отношении наших услуг.
                            <br/><br/>
                            <b>3. Услуги Makleruz</b>
                            <br/><br/>
                            <b>A. Размещение элементов</b>
                            <br/><br/>
                            Услуги Makleruz позволяют выставлять продукты на продажу, загружая изображения и предоставляя описания продуктов. Вы можете рекламировать свой продукт за плату. Если вы платите за продвижение своего продукта, Makleruz постарается разместить ваш продукт в самом верху основного раздела. Makleruz предлагает различные ценовые пакеты для размещения и рекламы продуктов. Детали цен доступны через Makleruz Services.
                            <br/><br/>
                            <b>B. Покупка и продажа</b>
                            <br/><br/>
                            Когда покупатель и продавец договариваются о цене продукта, размещенного для продажи в сервисах, у них есть разные варианты для завершения сделки.
                            <br/><br/>
                            Если покупатель и продавец согласны, такие платежи производятся между покупателем и продавцом в соответствии с установленными ими условиями после завершения их сделок. Makleruz никак не может помочь вернуть деньги, связанные с такими сделками.
                            <br/><br/>
                            <b>C. Платежные счета</b>
                            <br/><br/>
                            Makleruz оставляет за собой право периодически менять плату за обслуживание. 
                            <br/><br/>
                            <b>D. Доставка</b>
                            <br/><br/>
                            Makleruz сделки между покупателями и продавцами или отгрузка товаров от продавцов покупателям yдоставка, не несет ответственности за любой ущерб или задержку.
                            <br/><br/>
                            <b>4. Запрещенное поведение</b>
                            <br/><br/>
                            Вы не нарушаете и не нарушаете применимый закон, договор, права интеллектуальной собственности или другие права третьих лиц при использовании наших услуг и несете ответственность за свое поведение при использовании наших услуг.
                            <br/><br/>
                            • Любое преследование, угрозы, запугивание;              
                            <br/><br/>
                            • Продажа, коммерческое использование услуг Makleruz;             
                            <br/><br/>
                            • Попытка продать запрещенные предметы;                
                            <br/><br/>
                            • Предоставление ложной, неточной или вводящей в заблуждение информации нашим поставщикам услуг или службам;
                            <br/><br/>
                            • Копирование, дублирование, распространение, публичное воспроизведение или публичное показ всех или части наших услуг, включая основной контент и исходный код;              
                            <br/><br/>
                            • Использование сервисов Makleruz или использование любых автоматизированных инструментов для сбора или извлечения данных Makleruz, таких как бот-сборщик, робот, паук, скрипт, сканер или скребок;             
                            <br/><br/>
                            • Использование услуг Makleruz для нарушения или нарушения прав интеллектуальной собственности или других прав другого лица (включая Makleruz).                                    
                            <br/><br/>
                            • попытка получить пароль, учетные данные или другую информацию о безопасности другого пользователя запрещена.         
                            <br/><br/>
                            Если вы выполните действия, описанные выше, Makleruz может прекратить доступ к вашим услугам.
                            <br/><br/>
                            <b>5. Обратная связь</b>
                            <br/><br/>
                            Вы можете добровольно разместить или отправить любые вопросы, комментарии, предложения, идеи, оригинальные или креативные материалы или другую информацию о наших услугах.
                            <br/><br/>
                            <b>6. Принятие риска</b>
                            <br/><br/>
                            Узнайте и примите, что вы рискуете взаимодействовать с другими людьми, используя интернет-рынок. Вы несете ответственность за принятие всех необходимых мер предосторожности при общении с другими пользователями, особенно при первой встрече с незнакомцем.
                            <br/><br/>
                            <b>7. Изменение и прекращение наших услуг</b>
                            <br/><br/>
                            Мы имеем право изменять наши услуги или приостанавливать или приостанавливать некоторые из наших услуг в любое время. Вы имеете право прекратить использование наших услуг в любое время. Мы не несем ответственности за то, что вы не можете получить доступ или повредить наши услуги.
                        `
                    },
                    privacy: {
                        text: `
                            Политика конфиденциальности
                            <br/>
                            <br/>
                            Эта политика конфиденциальности объясняет, как информация о вас собирается и используется.
                            <br/>
                            Политика конфиденциальности распространяется на данные, которые мы собираем при использовании нашего приложения.
                            <br/>
                            Мы можем время от времени изменять эту политику конфиденциальности.
                            <br/>
                            В случае изменений мы сообщим вам, пересмотрев дату в верхней части нашей политики конфиденциальности.
                            <br/>
                            <br/>
                            Сбор данных
                            <br/>
                            <br/>
                            1. Информация, которую вы нам предоставляете.
                            <br/>
                            <br/>
                            Makleruz собирает информацию, которую вы предоставляете нам напрямую.
                            <br/>
                            Например, мы собираем информацию, когда вы регистрируетесь или обновляете свои данные;
                            <br/>
                            Когда вы публикуете данные для продажи любого товара через Makleruz;
                            <br/>
                            Makleruz, когда вы обращаетесь в службу поддержки или иным образом связываетесь с нами;
                            <br/>
                            Тип информации, которую мы можем собрать, может включать ваше имя, номер телефона, фотографии, письменное описание размещенного товара, любые предложения или комментарии, которые вы можете сделать.
                            <br/>
                            Использование информации.
                            <br/>
                            <br/>
                            2. Общее использование.
                            <br/>
                            <br/>
                            Makleruz использует информацию о вас для различных целей. Например:
                            <br/>
                            Обслуживание, поддержка и административные сообщения, напоминания,
                            <br/>
                            для отправки необходимых технических сообщений, обновлений, безопасности, предупреждений
                            <br/>
                            Обмен информацией.
                            <br/>
                            <br/>
                            3. Общее.
                            <br/>
                            <br/>
                            Политика конфиденциальности может предоставить информацию о вас в случае:
                            <br/>
                            Если мы считаем, что ваши действия противоречат установленным правилам.
                            <br/>
                            Рекламные и аналитические услуги, предоставляемые другими
                            <br/>
                            <br/>
                            4. Рекламные и аналитические услуги.
                            <br/>
                            <br/>
                            Мы можем разрешить другим организациям показывать рекламу от нашего имени, и эти организации могут использовать файлы cookie;
                            <br/>
                            <br/>
                            5. Учетные данные.
                            <br/>
                            <br/>
                            Вы можете обновить, исправить или удалить информацию об учетной записи в любое время
                            <br/>
                            Но помните, что мы можем сохранить некоторые из ваших данных.
                            <br/>
                            Makleruz может хранить кеш даже после отмены вашей учетной записи.То есть
                            <br/>
                            он может хранить архивные копии информации о вас в течение определенного периода времени.
                            <br/>
                            <br/>
                            6. Информация о местоположении.
                            <br/>
                            <br/>
                            В некоторых функциях Makleruz использует сервисы Google Maps/Google Maps Map.
                        `
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
                        create: "Yaratish",
                        aboutMe: "Biz haqimizda"
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
                        moreConvinient: "MAKLERUZ ilovamiz bilan bu yanada qulayroq!",
                        download: "Hujjat shaklini yuklab oling",
                        foradvertisers: "Reklama beruvchilar uchun",
                        recommendation: "Qidiruvni soddalashtirish uchun biz tavsiyalar tizimini joriy qildik shunga o'xshash reklamalar.",
                        advertisers: "Reklama beruvchilar",
                        postingInstructions: "E'lon qilish bo'yicha ko'rsatmalar",
                        help: 'Yordam',
                        support: "Texnik yordam",
                        termsofuse: "Foydalanish shartlari",
                        privacypolicy: "Maxfiylik siyosati",
                        buildings: "Yangi binolar",
                        land: "Yer",
                        choosingRealtor: "Rieltor tanlash",
                        developers: "Dasturchilar",
                        recommend: "Tavsiya etilgan",
                        appartments: "Kvartiralar",
                        footerText: "Uyingiz va barcha qulayligingiz uchun",
                        allRightReserved: "Barcha huquqlar himoyalangan",
                        privacyPolicy: "Maxfiylik siyosati"
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
                        setUpProfile: "Profilni sozlash",
                        archive: "Arxiv",
                        draft: "Qoralama",
                        yearExperience: " yil tajriba ga ega",
                        showInMap: "Xaritada ko'rsatish",
                        chanceToWin: "Havolani baham ko'rish orqali qimmatbaho sovg'alarni yutib olish imkoniyatiga ega bo'ling!",
                        myPoints: "Mening ballim",
                        refferalLink: "Yo'naltiruvchi havola",
                        getRefferalLink: "Yo'naltiruvchi havolani oling",
                        activateToTop: "TOP ga chiqarish",
                        moreDetails: "Batafsil",
                        name: "Ism",
                        logout: "Profildan chiqish",
                        hereEmpty: "Bu yerda hech narsa yo‘q",
                        linkCopied: "Havola nusxalandi",
                        managaArchive: "In this section you can store and manage an archive of your products or advertisements."
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
                        buy: "Sotib olish",
                        how: "Turi",
                        livingSpace: "Yashash maydoni",
                        recommendSimilar: "Oʻxshash mahsulotlar",
                        type: "Turi",
                        success: "Muvaffaqiyatli"
                    },
                    filter: {
                        forHome: "uy uchun",
                        forKitchen: "oshxona uchun",
                        activitiesMaster: "Quruvchilar faoliyati",
                        rent: "Ijara",
                        clear: "Tozalash",
                        sort: "Tartiblash",
                        houses: "Uylar",
                        plot: "Uchastka",
                        cheapest: "Arzon",
                        expensive: "Qimmat",
                        newest: "Yangi",
                        repair: "Ta'mirlash",
                        euroRepair: "Evro",
                        muhandis: "Muhandis",
                        for: "Uchun",
                        brand: "Brend",
                        category: "Toifasi"
                    },
                    singleProduct: {
                        description: "Tavsif",
                        allInfo: "Barcha ma'lumot",
                        floorTheHouse: "Uyning qavatlar soni",
                        numberOfRooms: "Xonalar soni",
                        totalArea: "Umumiy maydoni",
                        furniture: "Mebel bilan jihozlangani",
                        call: "Qo'ng'iroq qilish",
                        callTheSeller: "Sotuvchiga qo'ng'iroq qilish",
                        share: "Ulashish",
                        addToFavorites: "Sevimlilarga qo'shish",
                        removeFromFavorites: "Sevimlilardan olib tashlash",
                        callForNumber: "Raqamga qo'ng'iroq qiling",
                        noProducts: "Sevimlilar ro'yxatida hali biror narsa yo'q!"
                    },
                    login: {
                        register: "Ro'yxatdan o'tish",
                        signIn: "Kirish",
                        areYouRegistered: "Siz ro'yxatdan o'tganmisiz?"
                    },
                    aboutUs: {
                        title: "Makleruz.uz saytimizga xush kelibsiz!",
                        text: `Sizni uy orzularingiz ro'yobga chiqadigan platformaga xush kelibsiz. Bizning sayt mukammal uy, sun'iy bezak yoki ta'mirlash uchun professional usta izlayotganlar uchun keng turdagi xizmatlarni taklif etadi.
                        <br/>Biz quyidagi xizmatlarni taqdim etamiz:
                        <br/>
                        <b>1</b>. Ko'chmas mulkni sotish: Yangi uy yoki kvartira qidiryapsizmi? Bizning agentlarimiz sizning ehtiyojlaringiz va byudjetingizga mos keladigan mukammal uyni topishga yordam beradi.
                        <br/>
                        <b>2</b>. Hunarmandlar va ta'mirlash xizmatlari: Sizga ta'mirlash yoki texnik xizmat ko'rsatish uchun savdogar kerak bo'ladimi, bizda har bir vazifa uchun tajribali texniklar mavjud.
                        <br/>
                        <b>3</b>. Uy jihozlari va mebellari: Biz eng yaxshi ishlab chiqaruvchilarning uy jihozlari va mebellarining keng tanlovini taklif qilamiz. Bizning assortimentimizdan tanlang va uyingizda qulaylik va qulaylik yarating.
                        <br/>
                        Bizning veb-saytimizda sizga eng yaxshi takliflar va sifatli xizmatlarni taqdim etish uchun har bir tafsilotga e'tibor qaratamiz. Shuningdek, biz yuqori sifatli tasvirlar va videolarni ko'rish imkoniyatini taqdim etamiz, shunda siz biz taklif qilayotgan mahsulot va xizmatlar haqida to'liq tushunchaga ega bo'lishingiz mumkin.
                        <br/><br/>
                        Uyingizni yashash uchun eng zo'r joyga aylantirish imkoniyatini qo'ldan boy bermang. Bugun biz bilan bog'laning va orzularingizni ro'yobga chiqarishingizga yordam beramiz!`
                    },
                    create: {
                        title: "Yangi e'lon qo'shish",
                        adTitle: "Reklama sarlavhasi",
                        uploadVideo: "Video yuklash",
                        dragImageText: "Rasmlaringizni shu yerga torting yoki shu yerni bosing",
                        supportsVideoExt: "Qo'llaydi: video/mp4, video/x-m4v, video/*",
                        price: "Narxi",
                        fewMonths: "Bir necha oy",
                        whereIs: "Qayerda?",
                        buildings: "Yangi bino",
                        furnished: "Mebel bilan jihozlangan",
                        agreeWithTerms: "Men foydalanish shartlarini o'qib chiqdim va roziman va nashrlar!",
                        registerAsMaster: "Usta sifatida ro'yxatdan o'ting, ish toping",
                        changeAvatarImg: "Profil rasmini o'zgartirish",
                        register: "Ro'yxatdan o'tish",
                        createFurniture: "Mebel yaratish va sotish",
                        furnitureNames: "Mebel nomlari"
                    },
                    condition: {
                        title: "Xizmat ko’rsatish shartlari",
                        text: `
                            Oxirgi yangilanish: 2023 yil 23 -may
                            <br><br>
                            Ushbu Xizmat shartlari (» <b>Shartlar</b> «) bizning ( biz ) mobil ilovamizga  kirishingiz va undan foydalanishingiz uchun qo’llaniladi. , » <b>Iltimos, ushbu shartlarni diqqat bilan o’qing</b>
                            <br><br>
                            Vaqti - vaqti bilan ushbu Shartlarga o’zgartirishlar kiritishimiz mumkin. Agar biz o’zgartirishlar kiritadigan bo’lsak, sizga Xizmatlarimiz orqali bildirishnoma yuborish yoki ushbu Shartlarning yuqori qismidagi sanani yangilash kabi o’zgarishlar to’g’risida xabar beramiz. Biz bunday xabarni berganimizdan so’ng siz bizning Xizmatlarimizdan foydalanishni davom ettirsangiz, bu o’zgarishlarni qabul qilganligingizni tasdiqlaydi. Agar siz o’zgartirilgan shartlarga rozi bo’lmasangiz, siz bizning xizmatlarimizdan foydalanishni to’xtatishingiz kerak.
                            <br><br>
                            Vaqti -vaqti bilan Makleruz faqat ba’zi foydalanuvchilar uchun mavjud bo’lgan yangi xususiyatlarni taqdim etadi. Ushbu Foydalanish shartlarining yangi xususiyatlarga oid qoidalari hamma foydalanuvchilarga tegishli bo’lmasligi mumkin.
                            <br><br>
                            <b>1. Maxfiylik</b>
                            <br><br>
                            Siz haqingizdagi ma’lumotlarni qanday yig’ishimiz, ishlatishimiz, bo’lishishimiz haqida ma’lumot olish uchun maxfiylik siyosatimizga qarang . 
                            <br><br>
                            <b>2. Muvofiqlik</b>
                            <br><br>
                            Bizning xizmatlardan foydalanish uchun siz kamida 16 yoshda bo’lishingiz kerak.  Agar siz 18 yoshga to’lmagan (yoki qonuniy voyaga yetmagan) foydalanuvchining ota -onasi yoki qonuniy qo’riqchisi bo’lsangiz, siz bizning Xizmatlarimizga nisbatan bunday foydalanuvchining xatti -harakatlari yoki harakatsizligi uchun to’liq javobgar bo’lsiz.
                            <br><br>
                            <b>3. Makleruz xizmatlari</b>
                            <br><br>
                            <b>A. Elementlarni joylashtirish</b>
                            <br><br>
                            Makleruz xizmatlari sizga rasmlarni yuklash va mahsulot tavsiflarini taqdim etish orqali mahsulotlarni sotuvga qo’yishga imkon beradi.  Siz haq evaziga mahsulotingizni reklama qilishingiz mumkin. Agar siz mahsulotingizni reklama qilish uchun pul to’lasangiz, Makleruz sizning mahsulotingizni Asosiy bo’limda eng tepada joylashtirishga harakat qiladi. Makleruz mahsulotlarni joylashtirish va reklama qilish uchun har xil narxlar paketlarini taklif qiladi. Narxlar tafsilotlari Makleruz Services orqali taqdim etiladi.
                            <br><br>
                            <b>B. Sotib olish va sotish</b>
                            <br><br>
                            Qachonki xaridor va sotuvchi Xizmatlarda sotish uchun joylashtirilgan mahsulot narxiga kelishib olsalar, ular bitimni bajarish uchun har xil variantlarga ega.
                            <br><br>
                            Agar xaridor va sotuvchi rozi bo’lsa, bunday to’lovlar xaridor va sotuvchi o’rtasida, ular belgilagan shartlarga muvofiq, o’z bitimlarini tugatgandan so’ng amalga oshiriladi. Makleruz bunday bitimlar bilan bog’liq pulni qaytarishga hech qanday yordam bera olmaydi.
                            <br><br>
                            <b>C. To’lov hisoblari</b>
                            <br><br>
                            Makleruz xizmat haqini vaqti -vaqti bilan o’zgartirish huquqini o’zida saqlab qoladi. 
                            <br><br>
                            <b>D. Yetkazib berish</b>
                            <br><br>
                            Makleruz xaridorlar va sotuvchilar o’rtasida tuzilgan bitimlar yoki sotuvchilardan xaridorlarga yuklarni yetkazib berish, har qanday zarar yoki kechikish uchun javobgar emas.
                            <br><br>
                            <b>4. Taqiqlangan xatti -harakatlar</b>
                            <br><br>
                            Siz bizning Xizmatlarimizdan foydalanganda amaldagi qonun, shartnoma, intellektual mulk huquqi yoki boshqa uchinchi tomon huquqlarini buzmaysiz yoki buzg’unchilik qilmaysiz va bizning Xizmatlarimizdan foydalanganingizda xatti-harakatlaringiz uchun javobgar bo’lasiz.
                            <br><br>
                            •    Har qanday ta’qib qilish, tahdid qilish, qo’rqitish;              
                            <br><br>
                            • Makleruz xizmatlarini sotish, tijorat maqsadlarida ishlatish;             
                            <br><br>
                            • Taqiqlangan narsalarni sotishga harakat qilish;                
                            <br><br>
                            • Makleruz yoki xizmat ko’rsatuvchi provayderlarimizga yolg’on, noaniq yoki chalg’ituvchi ma’lumotlarni taqdim etish;
                            <br><br>
                            • Xizmatlarimizning barcha yoki bir qismini, jumladan, asosiy tarkib va ​​manba kodini nusxa ko’chirish, ko’paytirish, tarqatish, ommaviy ijro etish yoki hammaga ko’rsatish;              
                            <br><br>
                            • Makleruz xizmatlaridan foydalanish yoki Makleruz ma’lumotlarini yig’ish yoki olish uchun har qanday avtomatlashtirilgan vositalardan foydalanish, masalan, yig’ish boti, robot, o’rgimchak, skript, skaner yoki qirg’ichlardan foydalanish;             
                            <br><br>
                            • Makleruz xizmatlaridan intellektual mulk huquqlarini yoki boshqa birovning (shu jumladan, Makleruz) boshqa huquqlarini buzish yoki buzish uchun foydalanish.                                    
                            <br><br>
                            • boshqa foydalanuvchining parolini, hisob ma’lumotlarini yoki boshqa xavfsizlik ma’lumotlarini olishga urinish taqiqlanadi.         
                            <br><br>
                            Agar siz yuqorida tavsiflangan xatti -harakatlar bilan shug’ullansangiz, Makleruz sizning Xizmatlarga kirish huquqingizni  to’xtatishi mumkin
                            <br><br>
                            <b>5. Qayta aloqa</b>
                            <br><br>
                            Siz ixtiyoriy ravishda Makleruz yoki bizning Xizmatlarimiz haqidagi har qanday savollar, sharhlar, takliflar, g’oyalar, original yoki ijodiy materiallar yoki boshqa ma’lumotlarni joylashtirishingiz, yuborishingiz mumkin.
                            <br><br>
                            <b>6. Xavfni qabul qilish</b>
                            <br><br>
                            Bilib oling va qabul qiling, Internetga asoslangan bozorni ishlatib, boshqa shaxslar bilan o’zaro aloqada bo’lish xavfi bor. Boshqa foydalanuvchilar bilan muloqotda bo’lganingizda, ayniqsa, begona odam bilan birinchi marta uchrashganda, barcha kerakli ehtiyot choralarini ko’rishingiz uchun siz javobgarsiz.
                            <br><br>
                            <b>7. Xizmatlarimizni o’zgartirish va to’xtatish</b>
                            <br><br>
                            Biz Xizmatlarimizni o’zgartirish huquqiga egamiz yoki istalgan vaqtda Xizmatlarimizning bir qismini to’xtatib qo’yish yoki to’xtatish huquqiga egamiz. Siz istalgan vaqtda bizning xizmatlarimizdan foydalanishni to’xtatishga haqlisiz. Biz sizning Xizmatlarimizga kira olmasligingiz yoki zarar etkazishingiz uchun javobgar emasmiz.
                        `
                    },
                    privacy: {
                        text: `
                            Maxfiylik siyosati
                            <br/>
                            <br/>
                            Bu Maxfiylik siyosati siz haqingizda ma’lumot qanday to’planishi va ishlatilishini tushuntiradi .
                            <br/>
                            Maxfiylik siyosati bizning ilovamizdan foydalanganingizda biz to’playdigan ma’lumotlarga nisbatan qo’llaniladi.
                            <br/>
                            Vaqti -vaqti bilan ushbu Maxfiylik siyosatini o’zgartirishimiz mumkin.
                            <br/>
                            O’zgarishlar bo’lsa, biz Maxfiylik siyosatining yuqori qismidagi sanani qayta ko’rib chiqish orqali sizga xabar beramiz.
                            <br/>
                            Maxfiylik siyosatini har safar kirganingizda ko’rib chiqishingizni tavsiya qilamiz.
                            <br/>
                            <br/>
                            Ma’lumot yig’ish
                            <br/>
                            <br/>
                            1. Siz bizga taqdim etayotgan ma’lumotlar.
                            <br/>
                            <br/>
                            Makleruz siz bizga to’g’ridan -to’g’ri taqdim etadigan ma’lumotlarni to’playdi.
                            <br/>
                            Masalan, biz ro’yxatdan o’tganingizda yoki ma’lumotlaringizni yangilaganingizda ma’lumot to’playmiz;
                            <br/>
                            Har qanday tovarni Makleruz orqali sotish uchun ma’lumotlarni joylashtirganingizda;
                            <br/>
                            Makleruz, mijozlarni qo’llab -quvvatlash xizmatini so’rganingizda yoki biz bilan boshqa yo’l bilan bog’langaningizda;
                            <br/>
                            Biz to’plashimiz mumkin bo’lgan ma’lumotlar turiga sizning ismingiz, telefon raqamingiz, fotosuratlar, joylashtirilgan tovarlarning yozma tavsifi, siz taklif qilgan har qanday takliflar yoki sharhlar kirishi mumkin.
                            <br/>
                            Axborotdan foydalanish.
                            <br/>
                            <br/>
                            2. Umumiy foydalanish.
                            <br/>
                            <br/>
                            Makleruz siz haqingizdagi ma’lumotlarni turli maqsadlarda ishlatadi. Masalan:
                            <br/>
                            Sizga xizmat ko’rsatish, qo’llab -quvvatlash va ma’muriy xabarlar, eslatmalar,
                            <br/>
                            talab qilingan texnik xabarlar, yangilanishlar, xavfsizlik, ogohlantirishlar jo’natish uchun
                            <br/>
                            Ma’lumot almashish.
                            <br/>
                            <br/>
                            3. Umumiy.
                            <br/>
                            <br/>
                            Maxfiylik siyosatida siz haqingizda ma’lumotlarni quyidagi holatda taqdim qilishi mumkin:
                            <br/>
                            Agar biz sizning harakatlaringiz belgilangan qonun-qoidalarga  zid deb hisoblasak.
                            <br/>
                            Boshqalar tomonidan taqdim etiladigan reklama va tahlil xizmatlari
                            <br/>
                            <br/>
                            4. Reklama va tahlil xizmatlari.
                            <br/>
                            <br/>
                            Biz boshqa tashkilotlarga o’z nomimizdan reklama ko’rsatishga ruxsat berishimiz mumkin va bu tashkilotlar cookie fayllaridan foydalanishi mumkin;
                            <br/>
                            <br/>
                            5. Hisob ma’lumotlari.
                            <br/>
                            <br/>
                            Siz istalgan vaqtda hisob qaydnomasi ma’lumotlarini yangilashingiz, to’g’rilashingiz yoki o’chirishingiz mumkin
                            <br/>
                            Lekin shuni esda tutingki, biz ba’zi ma’lumotlaringizni saqlashimiz mumkin.
                            <br/>
                            Makleruz sizning hisobingiz bekor qilingandan keyin ham keshni saqlashi mumkin.Ya’ni
                            <br/>
                            ma’lum vaqt davomida siz haqingizda ma’lumotlarning arxivlangan nusxalarini saqlashi mumkin.
                            <br/>
                            <br/>
                            6. Joylashuv haqida ma’lumot.
                            <br/>
                            <br/>
                            Ba’zi funktsiyalarda Makleruz Google Maps/Google xaritalarini tuzish xizmatlaridan foydalanadi.`
                    }
                }
            }
        }
    });


export const lngs = {
    ru: { nativeName: "Russian" },
    uz: { nativeName: "Uzbek" }
};
