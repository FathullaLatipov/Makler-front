import { useState } from "react";

const useNav = (values) => {
  const [nav, setNav] = useState(values);

  const clickHandler = (e) => {
    setNav((prev) => ({
      ...prev,
      [e.currentTarget?.getAttribute("data-value")]: e.currentTarget?.id,
    }));
  };

  return {
    nav,
    clickHandler,
  };
};

export default useNav;
