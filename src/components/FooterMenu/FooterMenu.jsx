import {useTranslation} from "react-i18next";

const menu = [
  [
    {
      label: "Новостройки",
      value: "",
    },
    {
      label: "Земелные",
      value: "",
    },
    {
      label: "Выбор реалтора",
      value: "",
    },
    {
      label: "Звстройщики",
      value: "",
    },
    {
      label: "Реккомендуемые",
      value: "",
    },
    {
      label: "Квартиры",
      value: "",
    },
  ],
  [
    {
      label: "Новостройки",
      value: "",
    },
    {
      label: "Земелные",
      value: "",
    },
    {
      label: "Выбор реалтора",
      value: "",
    },
    {
      label: "Звстройщики",
      value: "",
    },
    {
      label: "Реккомендуемые",
      value: "",
    },
    {
      label: "Квартиры",
      value: "",
    },
  ],
  [
    {
      label: "Новостройки",
      value: "",
    },
    {
      label: "Земелные",
      value: "",
    },
    {
      label: "Выбор реалтора",
      value: "",
    },
    {
      label: "Звстройщики",
      value: "",
    },
    {
      label: "Реккомендуемые",
      value: "",
    },
    {
      label: "Квартиры",
      value: "",
    },
  ],
  [
    {
      label: "Новостройки",
      value: "",
    },
    {
      label: "Земелные",
      value: "",
    },
    {
      label: "Выбор реалтора",
      value: "",
    },
    {
      label: "Звстройщики",
      value: "",
    },
    {
      label: "Реккомендуемые",
      value: "",
    },
    {
      label: "Квартиры",
      value: "",
    },
  ],
  [
    {
      label: "Новостройки",
      value: "",
    },
    {
      label: "Земелные",
      value: "",
    },
    {
      label: "Выбор реалтора",
      value: "",
    },
    {
      label: "Звстройщики",
      value: "",
    },
    {
      label: "Реккомендуемые",
      value: "",
    },
    {
      label: "Квартиры",
      value: "",
    },
  ],
  [
    {
      label: "Новостройки",
      value: "",
    },
    {
      label: "Земелные",
      value: "",
    },
    {
      label: "Выбор реалтора",
      value: "",
    },
    {
      label: "Звстройщики",
      value: "",
    },
    {
      label: "Реккомендуемые",
      value: "",
    },
    {
      label: "Квартиры",
      value: "",
    },
  ],
];

const FooterMenu = () => {
  const { t } = useTranslation();

  return (
    <section className="additional-nav-s bg-white">
      <div className="container">
        <div className="additional-nav">
          <h4>{t("footer.auxiliary")}</h4>
          <div className="additional-nav-list">
            {menu.map((item, i) => (
              <ul key={i}>
                {item.map(({ label, value }, i) => (
                  <li key={i}>
                    <a href={value}>{label}</a>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterMenu;
