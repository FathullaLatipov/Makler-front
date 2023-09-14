import {useTranslation} from "react-i18next";

const menu = [
  [
    {
      label: "footer.buildings",
      value: "",
    },
    {
      label: "footer.land",
      value: "",
    },
    {
      label: "footer.choosingRealtor",
      value: "",
    },
    {
      label: "footer.developers",
      value: "",
    },
    {
      label: "footer.recommend",
      value: "",
    },
    {
      label: "footer.appartments",
      value: "",
    },
  ],
  [
    {
      label: "footer.buildings",
      value: "",
    },
    {
      label: "footer.land",
      value: "",
    },
    {
      label: "footer.choosingRealtor",
      value: "",
    },
    {
      label: "footer.developers",
      value: "",
    },
    {
      label: "footer.recommend",
      value: "",
    },
    {
      label: "footer.appartments",
      value: "",
    },
  ],
  [
    {
      label: "footer.buildings",
      value: "",
    },
    {
      label: "footer.land",
      value: "",
    },
    {
      label: "footer.choosingRealtor",
      value: "",
    },
    {
      label: "footer.developers",
      value: "",
    },
    {
      label: "footer.recommend",
      value: "",
    },
    {
      label: "footer.appartments",
      value: "",
    },
  ],
  [
    {
      label: "footer.buildings",
      value: "",
    },
    {
      label: "footer.land",
      value: "",
    },
    {
      label: "footer.choosingRealtor",
      value: "",
    },
    {
      label: "footer.developers",
      value: "",
    },
    {
      label: "footer.recommend",
      value: "",
    },
    {
      label: "footer.appartments",
      value: "",
    },
  ],
  [
    {
      label: "footer.buildings",
      value: "",
    },
    {
      label: "footer.land",
      value: "",
    },
    {
      label: "footer.choosingRealtor",
      value: "",
    },
    {
      label: "footer.developers",
      value: "",
    },
    {
      label: "footer.recommend",
      value: "",
    },
    {
      label: "footer.appartments",
      value: "",
    },
  ],
  [
    {
      label: "footer.buildings",
      value: "",
    },
    {
      label: "footer.land",
      value: "",
    },
    {
      label: "footer.choosingRealtor",
      value: "",
    },
    {
      label: "footer.developers",
      value: "",
    },
    {
      label: "footer.recommend",
      value: "",
    },
    {
      label: "footer.appartments",
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
                    <a href={value}>{t(label)}</a>
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
